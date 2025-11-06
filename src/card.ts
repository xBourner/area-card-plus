import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { cache } from "lit/directives/cache.js";
import { styleMap } from "lit/directives/style-map.js";
import { repeat } from "lit/directives/repeat.js";
import memoizeOne from "memoize-one";
import type { HassEntity } from "home-assistant-js-websocket";
import {
  SENSOR_DOMAINS,
  CLIMATE_DOMAINS,
  TOGGLE_DOMAINS,
  OTHER_DOMAINS,
  COVER_DOMAINS,
  ALERT_DOMAINS,
  DEVICE_CLASSES,
  DOMAIN_ICONS,
} from "./helpers";
import "./popup-dialog";
import {
  actionHandler,
  applyThemesOnElement,
  LovelaceCardConfig,
  LovelaceCard,
  HomeAssistant,
  hasAction,
  handleAction,
  ActionHandlerEvent,
  computeDomain,
  formatNumber,
  STATES_OFF,
  UNAVAILABLE_STATES,
  isNumericState,
  blankBeforeUnit,
  LovelaceGridOptions,
} from "./ha";

export const DEFAULT_ASPECT_RATIO = "16:9";

type DomainType =
  | "light"
  | "switch"
  | "fan"
  | "climate"
  | "media_player"
  | "lock"
  | "vacuum"
  | "cover"
  | "binary_sensor";

@customElement("area-card-plus")
export class AreaCardPlus extends LitElement implements LovelaceCard {
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<LovelaceCardConfig> {
    const areas = Object.values(hass.areas);
    return { type: "custom:area-card-plus", area: areas[0]?.area_id || "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public layout?: string;
  @state() public _config!: LovelaceCardConfig;
  @state() public selectedDomain: string | null = null;
  @state() public selectedDeviceClass: string | null = null;
  @state() public selectedGroup: string | null = null;

  private _iconCache: Map<string, string> = new Map();
  private _styleCache: Map<string, Record<string, string>> = new Map();
  private _deviceClasses: { [key: string]: string[] } = DEVICE_CLASSES;
  private _customizationDomainMap: Map<string, any> = new Map();
  private _customizationCoverMap: Map<string, any> = new Map();
  private _customizationAlertMap: Map<string, any> = new Map();
  private _customizationSensorMap: Map<string, any> = new Map();
  private _actionHandlerCache: Map<string, (ev: CustomEvent) => void> =
    new Map();
  private _hiddenEntitiesSet: Set<string> = new Set();
  private _excludedEntitiesSet: Set<string> = new Set();

  public getCardSize(): number {
    return 3;
  }

  getGridOptions(): LovelaceGridOptions {
    return {
      columns: 12,
      rows: 3,
      min_columns: 1,
      min_rows: 1,
    };
  }

  public setConfig(config: LovelaceCardConfig): void {
    if (!config.area) {
      throw new Error("Area Required");
    }

    this._config = config;

    this._deviceClasses = { ...DEVICE_CLASSES };
    if (config.sensor_classes) {
      this._deviceClasses.sensor = config.sensor_classes;
    }
    if (config.alert_classes) {
      this._deviceClasses.binary_sensor = config.alert_classes;
    }
    if (config.cover_classes) {
      this._deviceClasses.cover = config.cover_classes;
    }
    this._iconCache.clear();
    this._styleCache.clear();
    this._customizationDomainMap.clear();
    (this._config?.customization_domain || []).forEach((c: any) => {
      if (c.css) c._parsedCss = this._parseCss(c.css);
      if (c.icon_css) c._parsedIconCss = this._parseCss(c.icon_css);
      this._customizationDomainMap.set(c.type, c);
    });
    this._customizationCoverMap.clear();
    (this._config?.customization_cover || []).forEach((c: any) => {
      if (c.css) c._parsedCss = this._parseCss(c.css);
      if (c.icon_css) c._parsedIconCss = this._parseCss(c.icon_css);
      this._customizationCoverMap.set(c.type, c);
    });
    this._customizationAlertMap.clear();
    (this._config?.customization_alert || []).forEach((c: any) => {
      if (c.css) c._parsedCss = this._parseCss(c.css);
      if (c.icon_css) c._parsedIconCss = this._parseCss(c.icon_css);
      this._customizationAlertMap.set(c.type, c);
    });
    this._customizationSensorMap.clear();
    (this._config?.customization_sensor || []).forEach((c: any) => {
      if (c.css) c._parsedCss = this._parseCss(c.css);
      if (c.icon_css) c._parsedIconCss = this._parseCss(c.icon_css);
      this._customizationSensorMap.set(c.type, c);
    });
    this._hiddenEntitiesSet = new Set(this._config?.hidden_entities || []);
    this._excludedEntitiesSet = new Set(this._config?.excluded_entities || []);
    this._actionHandlerCache.clear();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) {
      return;
    }

    if (changedProps.has("selectedDomain") && this.selectedDomain) {
      const domain = this.selectedDomain;

      this._openDomainPopup(domain);

      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | LovelaceCardConfig
      | undefined;

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config") || !this._config) {
      return true;
    }

    if (changedProps.has("_devicesInArea") || changedProps.has("_entities")) {
      return true;
    }

    if (!changedProps.has("hass")) {
      return false;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.locale !== this.hass!.locale
    ) {
      return true;
    }

    if (
      !this.hass?.devices ||
      !this._devicesInArea(
        this._config.area,
        Object.values(this.hass.devices)
      ) ||
      !this.hass?.entities
    ) {
      return false;
    }

    const entities = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    );

    for (const domainEntities of Object.values(entities)) {
      for (const stateObj of domainEntities) {
        if (oldHass!.states[stateObj.entity_id] !== stateObj) {
          return true;
        }
      }
    }

    return false;
  }

  private _entitiesByDomain = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      deviceClasses: { [key: string]: string[] },
      states: HomeAssistant["states"]
    ) => {
      const entityIdsWithFilter = Object.values(this.hass.entities)
        .filter((e: any) => {
          if (!e.area_id && !e.device_id) return false;
          if (e.hidden || this._hiddenEntitiesSet.has(e.entity_id))
            return false;
          if (e.area_id) {
            if (e.area_id !== areaId) return false;
          } else {
            if (!devicesInArea.has(e.device_id)) return false;
          }
          if (this._config?.label) {
            return (
              e.labels &&
              e.labels.some((l: string) => this._config!.label!.includes(l))
            );
          }
          return true;
        })
        .map((e: any) => e.entity_id);
      const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

      for (const entity of entityIdsWithFilter) {
        const domain = computeDomain(entity);

        if (
          !TOGGLE_DOMAINS.includes(domain) &&
          !SENSOR_DOMAINS.includes(domain) &&
          !ALERT_DOMAINS.includes(domain) &&
          !COVER_DOMAINS.includes(domain) &&
          !OTHER_DOMAINS.includes(domain) &&
          !CLIMATE_DOMAINS.includes(domain)
        ) {
          continue;
        }

        const stateObj: HassEntity | undefined = states[entity];
        if (!stateObj) {
          continue;
        }

        if (
          (ALERT_DOMAINS.includes(domain) ||
            SENSOR_DOMAINS.includes(domain) ||
            COVER_DOMAINS.includes(domain)) &&
          !deviceClasses[domain].includes(
            stateObj.attributes.device_class || ""
          )
        ) {
          continue;
        }

        if (!(domain in entitiesByDomain)) {
          entitiesByDomain[domain] = [];
        }
        entitiesByDomain[domain].push(stateObj);
      }

      return entitiesByDomain;
    }
  );

  private _isOn(domain: string, deviceClass?: string): HassEntity | undefined {
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    )[domain];
    if (!entities) {
      return undefined;
    }
    return (
      deviceClass
        ? entities.filter(
            (entity) => entity.attributes.device_class === deviceClass
          )
        : entities
    ).find(
      (entity) =>
        !UNAVAILABLE_STATES.includes(entity.state) &&
        !STATES_OFF.includes(entity.state)
    );
  }

  private _filterByCategory(entityId: string): boolean {
    const categoryFilter: string | undefined = this._config?.category_filter;
    if (!categoryFilter) return true;

    const entry: any = (this.hass.entities as any)?.[entityId];
    if (!entry) return true;

    const cat: string | null =
      typeof entry.entity_category === "string" ? entry.entity_category : null;

    if (!cat) return true;

    switch (categoryFilter) {
      case "config":
        return cat !== "config";
      case "diagnostic":
        return cat !== "diagnostic";
      case "config+diagnostic":
        return cat !== "config" && cat !== "diagnostic";
      default:
        return true;
    }
  }

  private _average(domain: string, deviceClass?: string): string | undefined {
    const excludedEntities = this._config?.excluded_entities || [];
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    )[domain].filter(
      (entity) =>
        (deviceClass ? entity.attributes.device_class === deviceClass : true) &&
        !this._excludedEntitiesSet.has(entity.entity_id)
    );
    if (!entities || entities.length === 0) {
      return undefined;
    }

    let uom: any;
    const values = entities.filter((entity) => {
      if (!isNumericState(entity) || isNaN(Number(entity.state))) {
        return false;
      }
      if (!uom) {
        uom = entity.attributes.unit_of_measurement;
        return true;
      }
      return entity.attributes.unit_of_measurement === uom;
    });

    if (!values.length) {
      return undefined;
    }

    const sum = values.reduce(
      (total, entity) => total + Number(entity.state),
      0
    );

    if (deviceClass === "power") {
      return `${formatNumber(sum, this.hass!.locale as any, {
        maximumFractionDigits: 1,
      })}${uom ? blankBeforeUnit(uom, this.hass!.locale as any) : ""}${
        uom || ""
      }`;
    } else {
      return `${formatNumber(sum / values.length, this.hass!.locale as any, {
        maximumFractionDigits: 1,
      })}${uom ? blankBeforeUnit(uom, this.hass!.locale as any) : ""}${
        uom || ""
      }`;
    }
  }

  public _area = memoizeOne(
    (
      areaId: string | undefined,
      areas: any[] | Record<string, any> | undefined
    ) => {
      const areaList: any[] = Array.isArray(areas)
        ? areas
        : areas
        ? Object.values(areas)
        : [];
      return areaList.find((area) => area.area_id === areaId) || null;
    }
  );

  public _devicesInArea = memoizeOne(
    (areaId: string | undefined, devices: any[]) =>
      new Set(
        areaId
          ? devices.reduce<string[]>((acc, device) => {
              if (device.area_id === areaId) acc.push(device.id);
              return acc;
            }, [])
          : []
      )
  );

  private _parseCss(css?: string): Record<string, string> {
    if (!css) return {};
    const key = css.trim();
    if (this._styleCache.has(key)) return this._styleCache.get(key)!;

    const normalized = css.split("\n").reduce((acc: string, line: string) => {
      const trimmed = line.trim();
      if (trimmed && trimmed.includes(":")) {
        acc += trimmed.endsWith(";") ? trimmed : `${trimmed};`;
        acc += " ";
      }
      return acc;
    }, "");

    const obj = normalized
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .reduce((acc: Record<string, string>, rule: string) => {
        const [keyPart, ...rest] = rule.split(":");
        const valuePart = rest.join(":");
        if (keyPart && valuePart !== undefined) {
          const trimmed = keyPart.trim();
          const finalKey = trimmed.startsWith("--")
            ? trimmed
            : trimmed.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          acc[finalKey] = valuePart.trim();
        }
        return acc;
      }, {} as Record<string, string>);

    this._styleCache.set(key, obj);
    return obj;
  }

  private _computeCovers = memoizeOne(
    (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
      COVER_DOMAINS.flatMap((domain) => {
        if (!(domain in entitiesByDomain)) return [] as any[];
        return deviceClasses[domain].map((deviceClass: string) => ({
          domain,
          deviceClass,
        }));
      })
  );

  private _computeAlerts = memoizeOne(
    (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
      ALERT_DOMAINS.flatMap((domain) => {
        if (!(domain in entitiesByDomain)) return [] as any[];
        return deviceClasses[domain].map((deviceClass: string) => ({
          domain,
          deviceClass,
        }));
      })
  );

  private _computeSensors = memoizeOne(
    (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
      SENSOR_DOMAINS.flatMap((domain) => {
        if (!(domain in entitiesByDomain)) return [] as any[];
        return deviceClasses[domain].map(
          (deviceClass: string, index: number) => ({
            domain,
            deviceClass,
            index,
          })
        );
      })
  );

  private _computeButtons = memoizeOne(
    (
      toggle_domains: string[] | undefined,
      entitiesByDomain: { [k: string]: HassEntity[] }
    ) =>
      (toggle_domains || []).filter(
        (domain: string) => domain in entitiesByDomain
      )
  );

  private _computeCameraEntity = memoizeOne(
    (
      show_camera: boolean | undefined,
      entitiesByDomain: { [k: string]: HassEntity[] }
    ) => {
      if (show_camera && "camera" in entitiesByDomain)
        return entitiesByDomain.camera[0]?.entity_id;
      return undefined;
    }
  );

  private _computeIconStyles = memoizeOne(
    (
      isV2Design: boolean,
      rowSize: number,
      icon_css: string | undefined,
      area_icon_color: string | undefined
    ) => {
      const base = {
        ...(isV2Design && rowSize === 1 ? { "--mdc-icon-size": "20px" } : {}),
        ...(area_icon_color
          ? { color: `var(--${area_icon_color}-color)` }
          : {}),
      };

      if (!icon_css) return base;

      const cssRules = this._parseCss(icon_css);

      return { ...base, ...cssRules };
    }
  );

  private _getParsedCss(
    source?: string,
    customization?: any
  ): Record<string, string> {
    if (customization && customization._parsedCss)
      return customization._parsedCss;
    if (!source) return {};
    return this._parseCss(source);
  }

  private _handleAction(ev: ActionHandlerEvent) {
    const actionConfig =
      ev.detail.action === "tap"
        ? this._config?.tap_action
        : ev.detail.action === "hold"
        ? this._config?.hold_action
        : ev.detail.action === "double_tap"
        ? this._config?.double_tap_action
        : null;

    const isMoreInfo =
      actionConfig === "more-info" || actionConfig?.action === "more-info";

    if (isMoreInfo || actionConfig === undefined) {
      this._openGeneralPopup();
      return;
    }

    const config = {
      tap_action: this._config?.tap_action,
      hold_action: this._config?.hold_action,
      double_tap_action: this._config?.double_tap_action,
    };

    handleAction(this, this.hass!, config, ev.detail.action!);
  }

  private _handleDomainAction(domain: string): (ev: CustomEvent) => void {
    const key = `domain|${domain}`;
    if (!this._actionHandlerCache.has(key)) {
      this._actionHandlerCache.set(
        key,
        this._makeActionHandler("domain", domain)
      );
    }
    return this._actionHandlerCache.get(key)!;
  }

  private _handleAlertAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    const key = `alert|${domain}|${deviceClass}`;
    if (!this._actionHandlerCache.has(key)) {
      this._actionHandlerCache.set(
        key,
        this._makeActionHandler("alert", domain, deviceClass)
      );
    }
    return this._actionHandlerCache.get(key)!;
  }

  private _handleCoverAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    const key = `cover|${domain}|${deviceClass}`;
    if (!this._actionHandlerCache.has(key)) {
      this._actionHandlerCache.set(
        key,
        this._makeActionHandler("cover", domain, deviceClass)
      );
    }
    return this._actionHandlerCache.get(key)!;
  }

  private _handleSensorAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    const key = `sensor|${domain}|${deviceClass}`;
    if (!this._actionHandlerCache.has(key)) {
      this._actionHandlerCache.set(
        key,
        this._makeActionHandler("sensor", domain, deviceClass)
      );
    }
    return this._actionHandlerCache.get(key)!;
  }

  private _makeActionHandler(
    kind: "domain" | "alert" | "cover" | "sensor" | "custom_button",
    domain: string,
    deviceClass?: string,
    customButton?: any
  ): (ev: CustomEvent) => void {
    return (ev: CustomEvent) => {
      ev.stopPropagation();

      let customization: any;
      if (kind === "domain") {
        customization = this._customizationDomainMap.get(domain);
      } else if (kind === "alert") {
        customization = this._customizationAlertMap.get(deviceClass || "");
      } else if (kind === "cover") {
        customization = this._customizationCoverMap.get(deviceClass || "");
      } else if (kind === "sensor") {
        customization = this._customizationSensorMap.get(deviceClass || "");
      } else if (kind === "custom_button") {
        customization = customButton;
      }

      const actionConfig =
        ev.detail.action === "tap"
          ? customization?.tap_action
          : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
          ? customization?.double_tap_action
          : null;

      if (kind === "domain") {
        const isToggle =
          actionConfig === "toggle" || actionConfig?.action === "toggle";
        const isMoreInfo =
          actionConfig === "more-info" || actionConfig?.action === "more-info";

        if (isToggle) {
          if (domain === "media_player") {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "media_pause" : "media_play",
              undefined,
              { area_id: this._config!.area }
            );
          } else if (domain === "lock") {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "lock" : "unlock",
              undefined,
              { area_id: this._config!.area }
            );
          } else if (domain === "vacuum") {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "stop" : "start",
              undefined,
              { area_id: this._config!.area }
            );
          } else if (TOGGLE_DOMAINS.includes(domain)) {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "turn_off" : "turn_on",
              undefined,
              { area_id: this._config!.area }
            );
          }
          return;
        } else if (isMoreInfo || actionConfig === undefined) {
          if (domain !== "binary_sensor" && domain !== "sensor") {
            if (domain === "climate") {
              const climateCustomization =
                this._config?.customization_domain?.find(
                  (item: { type: string }) => item.type === "climate"
                );
              const displayMode = (climateCustomization as any)?.display_mode;
              if (displayMode === "icon" || displayMode === "text_icon") {
                this._showPopupForDomain(domain);
              }
            } else {
              this._showPopupForDomain(domain);
            }
          }
          return;
        }

        const config = {
          tap_action: customization?.tap_action,
          hold_action: customization?.hold_action,
          double_tap_action: customization?.double_tap_action,
        };

        handleAction(this, this.hass!, config, ev.detail.action!);
        return;
      }

      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (kind === "alert") {
        if (isMoreInfo || actionConfig === undefined) {
          if (domain === "binary_sensor") {
            this._showPopupForDomain(domain, deviceClass);
          }
          return;
        }
      } else if (kind === "cover") {
        if (isMoreInfo || actionConfig === undefined) {
          if (domain === "cover") {
            this._showPopupForDomain(domain, deviceClass);
          }
          return;
        }
      } else if (kind === "sensor") {
        if (isMoreInfo) {
          if (domain === "sensor") {
            this._showPopupForDomain(domain, deviceClass);
          }
          return;
        }
        if (ev.detail.action === "tap" && !customization?.tap_action) {
          return;
        }
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(this, this.hass!, config, ev.detail.action!);
    };
  }

  private _getIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    if (domain in DOMAIN_ICONS) {
      const icons = DOMAIN_ICONS[domain] as any;

      if (deviceClass && typeof icons === "object") {
        const dc = (icons as Record<string, any>)[deviceClass];
        if (dc) {
          if (typeof dc === "string") return dc;
          if (typeof dc === "object" && "on" in dc && "off" in dc)
            return on ? dc.on : dc.off;
        }
      }

      if (typeof icons === "object" && "on" in icons && "off" in icons) {
        return on ? icons.on : icons.off;
      }

      if (typeof icons === "string") return icons;
    }

    return "";
  }

  private _cachedIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    const key = `${domain}|${deviceClass || ""}|${on ? "1" : "0"}`;
    if (this._iconCache.has(key)) return this._iconCache.get(key)!;
    const icon = this._getIcon(domain, on, deviceClass);
    this._iconCache.set(key, icon);
    return icon;
  }

  private _renderCovers(
    covers: Array<{ domain: string; deviceClass: string }>,
    entitiesByDomain: { [domain: string]: HassEntity[] },
    customizationCoverMap: Map<string, any>
  ) {
    const excludedEntities = this._config?.excluded_entities || [];
    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };
    return html`
      <div
        class="${classMap({
          covers: true,
          ...designClasses,
        })}"
      >
        ${repeat(
          covers,
          (item) => item.domain + "-" + item.deviceClass,
          ({ domain, deviceClass }) => {
            const customization = customizationCoverMap.get(deviceClass);
            const invert = customization?.invert === true;
            const activeEntities = entitiesByDomain[domain].filter((entity) => {
              const entityDeviceClass =
                entity.attributes.device_class || "default";
              const isOn = entity.state === "open";
              return (
                entityDeviceClass === deviceClass &&
                (invert ? STATES_OFF.includes(entity.state) : isOn) &&
                !this._excludedEntitiesSet.has(entity.entity_id) &&
                this._filterByCategory(entity.entity_id)
              );
            });
            const coverColor =
              customization?.color || this._config?.cover_color;
            const coverIcon = customization?.icon;
            const activeCount = activeEntities.length;
            return activeCount > 0
              ? html`
                  <div
                    class="icon-with-count hover"
                    style=${styleMap(
                      this._parseCss(
                        customization?.css || this._config?.cover_css
                      )
                    )}
                    @action=${this._handleCoverAction(domain, deviceClass)}
                    .actionHandler=${actionHandler({
                      hasHold: hasAction(customization?.hold_action),
                      hasDoubleClick: hasAction(
                        customization?.double_tap_action
                      ),
                    })}
                  >
                    <ha-state-icon
                      class="cover"
                      style=${styleMap({
                        ...(coverColor
                          ? { color: `var(--${coverColor}-color)` }
                          : {}),
                        ...this._getParsedCss(
                          customization?.icon_css,
                          customization
                        ),
                      })}
                      .icon=${coverIcon
                        ? coverIcon
                        : this._cachedIcon(
                            domain as DomainType,
                            invert ? false : true,
                            deviceClass
                          )}
                    ></ha-state-icon>
                    <span
                      class="active-count text-small ${activeCount > 0
                        ? "on"
                        : "off"}"
                      >${activeCount}</span
                    >
                  </div>
                `
              : nothing;
          }
        )}
      </div>
    `;
  }

  private _renderAlerts(
    alerts: Array<{ domain: string; deviceClass: string }>,
    entitiesByDomain: { [domain: string]: HassEntity[] },
    customizationAlertMap: Map<string, any>
  ) {
    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };
    const excludedEntities = this._config?.excluded_entities || [];
    return html`
      <div
        class="${classMap({
          alerts: true,
          ...designClasses,
        })}"
      >
        ${repeat(
          alerts,
          (item) => item.domain + "-" + item.deviceClass,
          ({ domain, deviceClass }) => {
            const customization = customizationAlertMap.get(deviceClass);
            const invert = customization?.invert === true;
            const activeEntities = entitiesByDomain[domain].filter((entity) => {
              const entityDeviceClass =
                entity.attributes.device_class || "default";
              const isOn = entity.state === "on";
              return (
                entityDeviceClass === deviceClass &&
                (invert ? STATES_OFF.includes(entity.state) : isOn) &&
                !this._excludedEntitiesSet.has(entity.entity_id) &&
                this._filterByCategory(entity.entity_id)
              );
            });
            const alertColor =
              customization?.color || this._config?.alert_color;
            const alertIcon = customization?.icon;
            const activeCount = activeEntities.length;
            return activeCount > 0
              ? html`
                  <div
                    class="icon-with-count hover"
                    style=${styleMap(
                      this._parseCss(
                        customization?.css || this._config?.alert_css
                      )
                    )}
                    @action=${this._handleAlertAction(domain, deviceClass)}
                    .actionHandler=${actionHandler({
                      hasHold: hasAction(customization?.hold_action),
                      hasDoubleClick: hasAction(
                        customization?.double_tap_action
                      ),
                    })}
                  >
                    <ha-state-icon
                      class="alert"
                      style=${styleMap({
                        ...(alertColor
                          ? { color: `var(--${alertColor}-color)` }
                          : {}),
                        ...this._getParsedCss(
                          customization?.icon_css,
                          customization
                        ),
                      })}
                      .icon=${alertIcon
                        ? alertIcon
                        : this._cachedIcon(
                            domain as DomainType,
                            invert ? false : true,
                            deviceClass
                          )}
                    ></ha-state-icon>
                    <span
                      class="active-count text-small ${activeCount > 0
                        ? "on"
                        : "off"}"
                      >${activeCount}</span
                    >
                  </div>
                `
              : nothing;
          }
        )}
      </div>
    `;
  }

  private renderCustomButtons() {
    if (
      !this._config?.custom_buttons ||
      this._config.custom_buttons.length === 0
    ) {
      return nothing;
    }

    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };

    return html`
      <div
        class="${classMap({
          custom_buttons: true,
          ...designClasses,
        })}"
      >
        ${this._config.custom_buttons.map((btn: any) => {
          const colorStyle = btn.color
            ? `color: var(--${btn.color}-color, ${btn.color});`
            : "";
          return html`
            <div
              class="icon-with-count hover"
              @action=${this._makeActionHandler(
                "custom_button",
                "",
                undefined,
                btn
              )}
              .actionHandler=${actionHandler({
                hasHold: hasAction(btn.hold_action),
                hasDoubleClick: hasAction(btn.double_tap_action),
              })}
            >
              <ha-icon .icon=${btn.icon} style="${colorStyle}"></ha-icon>
              ${btn.name
                ? html`<span class="custom-button-label" style="${colorStyle}"
                    >${btn.name}</span
                  >`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderButtons(
    buttons: string[],
    entitiesByDomain: { [domain: string]: HassEntity[] },
    customizationDomainMap: Map<string, any>
  ) {
    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };
    const excludedEntities = this._config?.excluded_entities || [];

    return html`
      <div
        class="${classMap({
          buttons: true,
          ...designClasses,
        })}"
      >
        ${repeat(
          buttons,
          (domain: string) => domain,
          (domain: string) => {
            if (domain === "climate") {
              const climateCustomization =
                this._config?.customization_domain?.find(
                  (item: { type: string }) => item.type === "climate"
                );
              const displayMode = (climateCustomization as any)?.display_mode;
              if (displayMode !== "icon" && displayMode !== "text_icon") {
                return nothing;
              }
            }
            const customization = customizationDomainMap.get(domain);
            const domainColor =
              customization?.color || this._config?.domain_color;
            const domainIcon = customization?.icon;

            const climateCustomization =
              domain === "climate"
                ? this._config?.customization_domain?.find(
                    (item: { type: string }) => item.type === "climate"
                  )
                : undefined;
            const displayMode = (climateCustomization as any)?.display_mode;
            const climateShowSetTemp = (climateCustomization as any)
              ?.show_set_temperature;
            const climateSpecial =
              domain === "climate" &&
              (displayMode === "icon" || displayMode === "text_icon") &&
              climateShowSetTemp === true;
            const baselineEntities = (
              entitiesByDomain[domain as string] as HassEntity[]
            ).filter((entity: HassEntity) => {
              if (UNAVAILABLE_STATES.includes(entity.state)) return false;
              if (this._excludedEntitiesSet.has(entity.entity_id)) return false;
              if (!this._filterByCategory(entity.entity_id)) return false;
              return true;
            });

            let activeEntities: HassEntity[] = [];
            let climateIconColor: string | undefined = undefined;

            if (climateSpecial) {
              activeEntities = baselineEntities;
              let heating = false;
              let cooling = false;
              for (const entity of baselineEntities) {
                const hvacAction = entity.attributes?.hvac_action ?? null;
                const state = (entity.state ?? "").toString().toLowerCase();
                if (hvacAction !== null && hvacAction !== undefined) {
                  const hvacLower = hvacAction.toString().toLowerCase();
                  heating =
                    heating ||
                    hvacLower.includes("heat") ||
                    hvacLower.includes("heating");
                  cooling =
                    cooling ||
                    hvacLower.includes("cool") ||
                    hvacLower.includes("cooling");
                } else {
                  heating =
                    heating ||
                    state.includes("heat") ||
                    state.includes("heating");
                  cooling =
                    cooling ||
                    state.includes("cool") ||
                    state.includes("cooling");
                }
                if (heating && cooling) break;
              }
              if (heating) climateIconColor = "red";
              else if (cooling) climateIconColor = "cornflowerblue";
            } else {
              activeEntities = baselineEntities.filter((entity: HassEntity) => {
                if (domain === "climate") {
                  const hvacAction = entity.attributes?.hvac_action;
                  if (hvacAction !== undefined && hvacAction !== null) {
                    const hvacLower = hvacAction.toString().toLowerCase();
                    if (hvacLower === "off" || hvacLower === "idle")
                      return false;
                    return true;
                  }
                  const stateLower = (entity.state ?? "")
                    .toString()
                    .toLowerCase();
                  if (stateLower === "off" || stateLower === "idle")
                    return false;
                  return true;
                }
                if (STATES_OFF.includes(entity.state)) return false;
                return true;
              });
            }
            const activeCount = activeEntities.length;
            if (this._config.show_active && activeCount === 0) {
              return nothing;
            }
            return html`
              <div
                class="icon-with-count hover"
                style=${styleMap(
                  this._getParsedCss(
                    customization?.css || this._config?.domain_css,
                    customization
                  )
                )}
                @action=${this._handleDomainAction(domain as string)}
                .actionHandler=${actionHandler({
                  hasHold: hasAction(customization?.hold_action),
                  hasDoubleClick: hasAction(customization?.double_tap_action),
                })}
              >
                <ha-state-icon
                  style=${styleMap({
                    ...(climateIconColor ? { color: climateIconColor } : {}),
                    ...(!climateIconColor && domainColor
                      ? { color: `var(--${domainColor}-color)` }
                      : {}),
                    ...(!climateIconColor &&
                    !domainColor &&
                    this._config?.domain_color
                      ? { color: this._config.domain_color }
                      : {}),
                    ...this._getParsedCss(
                      customization?.icon_css,
                      customization
                    ),
                  })}
                  class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                  .domain=${domain}
                  .icon=${domainIcon
                    ? domainIcon
                    : this._cachedIcon(domain as DomainType, activeCount > 0)}
                ></ha-state-icon>
                <span
                  class="active-count text-small ${activeCount > 0
                    ? "on"
                    : "off"}"
                >
                  ${activeCount}
                </span>
              </div>
            `;
          }
        )}
      </div>
    `;
  }

  private _renderSensors(
    sensors: Array<{ domain: string; deviceClass: string; index: number }>,
    entitiesByDomain: { [domain: string]: HassEntity[] },
    area: any,
    customizationSensorMap: Map<string, any>
  ) {
    const excludedEntities = this._config?.excluded_entities || [];

    return html`
      <div class="sensors">
        ${this._config?.wrap_sensor_icons
          ? repeat(
              sensors,
              (item) => item.domain + "-" + item.deviceClass,
              ({ domain, deviceClass, index }) => {
                const matchingEntities = entitiesByDomain[domain].filter(
                  (entity) =>
                    entity.attributes.device_class === deviceClass &&
                    !this._excludedEntitiesSet.has(entity.entity_id)
                );
                if (matchingEntities.length === 0) {
                  return nothing;
                }
                const areaSensorEntityId = (() => {
                  switch (deviceClass) {
                    case "temperature":
                      return area.temperature_entity_id;
                    case "humidity":
                      return area.humidity_entity_id;
                    default:
                      return null;
                  }
                })();
                const areaEntity = areaSensorEntityId
                  ? this.hass.states[areaSensorEntityId]
                  : undefined;
                const customization = customizationSensorMap.get(deviceClass);
                const sensorColor =
                  customization?.color || this._config?.sensor_color;
                const invert = customization?.invert === true;
                const hasOnEntity = matchingEntities.some(
                  (e) =>
                    !UNAVAILABLE_STATES.includes(e.state) &&
                    !STATES_OFF.includes(e.state) &&
                    !this._excludedEntitiesSet.has(e.entity_id) &&
                    this._filterByCategory(e.entity_id)
                );
                if (invert && hasOnEntity) {
                  return nothing;
                }
                const icon = this._config?.show_sensor_icons
                  ? html`<ha-domain-icon
                      style=${styleMap({
                        ...(sensorColor
                          ? { color: `var(--${sensorColor}-color)` }
                          : {}),
                        ...this._getParsedCss(
                          customization?.css,
                          customization
                        ),
                      })}
                      .hass=${this.hass}
                      .domain=${domain}
                      .deviceClass=${deviceClass}
                    ></ha-domain-icon>`
                  : null;
                const value = html`<span
                  class="sensor-value"
                  @action=${this._handleSensorAction(domain, deviceClass)}
                  .actionHandler=${actionHandler({
                    hasHold: hasAction(customization?.hold_action),
                    hasDoubleClick: hasAction(customization?.double_tap_action),
                  })}
                  style=${styleMap({
                    ...(sensorColor
                      ? { color: `var(--${sensorColor}-color)` }
                      : {}),
                    ...this._parseCss(customization?.css),
                  })}
                >
                  ${!this._config?.show_sensor_icons &&
                  !this._config?.wrap_sensor_icons &&
                  index > 0
                    ? " - "
                    : ""}
                  ${areaEntity
                    ? this.hass.formatEntityState(areaEntity)
                    : this._average(domain, deviceClass)}
                </span>`;
                return html`<div class="sensor-row off">${icon}${value}</div>`;
              }
            )
          : html`<div class="sensor text-medium off">
              ${repeat(
                sensors,
                (item) => item.domain + "-" + item.deviceClass,
                ({ domain, deviceClass, index }) => {
                  const matchingEntities = entitiesByDomain[domain].filter(
                    (entity) =>
                      entity.attributes.device_class === deviceClass &&
                      !this._excludedEntitiesSet.has(entity.entity_id)
                  );
                  if (matchingEntities.length === 0) {
                    return nothing;
                  }
                  const areaSensorEntityId = (() => {
                    switch (deviceClass) {
                      case "temperature":
                        return area.temperature_entity_id;
                      case "humidity":
                        return area.humidity_entity_id;
                      default:
                        return null;
                    }
                  })();
                  const areaEntity = areaSensorEntityId
                    ? this.hass.states[areaSensorEntityId]
                    : undefined;
                  const customization = customizationSensorMap.get(deviceClass);
                  const sensorColor =
                    customization?.color || this._config?.sensor_color;
                  const invert = customization?.invert === true;
                  const hasOnEntity = matchingEntities.some(
                    (e) =>
                      !UNAVAILABLE_STATES.includes(e.state) &&
                      !STATES_OFF.includes(e.state) &&
                      !this._excludedEntitiesSet.has(e.entity_id)
                  );
                  if (invert && hasOnEntity) {
                    return nothing;
                  }
                  const icon = this._config?.show_sensor_icons
                    ? html`<ha-domain-icon
                        style=${styleMap({
                          ...(sensorColor
                            ? { color: `var(--${sensorColor}-color)` }
                            : {}),
                          ...this._parseCss(customization?.css),
                        })}
                        .hass=${this.hass}
                        .domain=${domain}
                        .deviceClass=${deviceClass}
                      ></ha-domain-icon>`
                    : null;
                  const value = html`<span
                    class="sensor-value"
                    @action=${this._handleSensorAction(domain, deviceClass)}
                    .actionHandler=${actionHandler({
                      hasHold: hasAction(customization?.hold_action),
                      hasDoubleClick: hasAction(
                        customization?.double_tap_action
                      ),
                    })}
                    style=${styleMap({
                      ...(sensorColor
                        ? { color: `var(--${sensorColor}-color)` }
                        : {}),
                      ...this._getParsedCss(customization?.css, customization),
                    })}
                  >
                    ${!this._config?.show_sensor_icons &&
                    !this._config?.wrap_sensor_icons &&
                    index > 0
                      ? " - "
                      : ""}
                    ${areaEntity
                      ? this.hass.formatEntityState(areaEntity)
                      : this._average(domain, deviceClass)}
                  </span>`;
                  return html`${icon}${value}`;
                }
              )}
            </div>`}
      </div>
    `;
  }

  private _renderClimates(
    climates: Array<{ domain: string }>,
    entitiesByDomain: { [domain: string]: HassEntity[] },
    customizationDomainMap: Map<string, any>
  ) {
    const excludedEntities = this._config?.excluded_entities || [];
    return html`
      <div class="climate text-small off">
        ${repeat(
          climates,
          (item) => item.domain,
          ({ domain }) => {
            const entities = entitiesByDomain[domain] || [];
            const customization = customizationDomainMap.get(domain) || {};
            const displayMode = (customization as any)?.display_mode;
            if (displayMode === "icon") {
              return nothing;
            }

            if ((customization as any)?.show_set_temperature === true) {
              const tempsTemplates = entities
                .filter((entity) => {
                  if (this._excludedEntitiesSet.has(entity.entity_id))
                    return false;
                  if (!this._filterByCategory(entity.entity_id)) return false;
                  return true;
                })
                .map((entity) => {
                  const rawTemp =
                    entity.attributes?.temperature ??
                    entity.attributes?.target_temperature ??
                    null;
                  if (rawTemp === null || rawTemp === undefined) return null;
                  const num = Number(rawTemp);
                  if (Number.isNaN(num)) return null;

                  const unit =
                    this.hass?.config?.unit_system?.temperature || "";
                  const hvacAction = entity.attributes?.hvac_action ?? null;
                  const state = (entity.state ?? "").toString().toLowerCase();

                  const hvacLower = (hvacAction ?? state)
                    .toString()
                    .toLowerCase();
                  const heating =
                    hvacLower.includes("heat") || hvacLower.includes("heating");
                  const cooling =
                    hvacLower.includes("cool") || hvacLower.includes("cooling");

                  const color = heating
                    ? "red"
                    : cooling
                    ? "cornflowerblue"
                    : "var(--secondary-text-color)";

                  return html`<span style="color:${color};"
                    >${num}${unit ? ` ${unit}` : ""}</span
                  >`;
                })
                .filter((t) => t !== null) as Array<unknown>;

              if (tempsTemplates.length === 0) return nothing;

              const joinedTemplates = tempsTemplates.reduce(
                (acc: any[], cur, i) => {
                  if (i === 0) {
                    acc.push(cur);
                  } else {
                    acc.push(
                      html`<span style="color: var(--secondary-text-color)"
                        >,
                      </span>`
                    );
                    acc.push(cur);
                  }
                  return acc;
                },
                []
              );

              const parentStyleObj = {
                ...(customization?.color
                  ? { color: `var(--${customization.color}-color)` }
                  : {}),
                ...this._parseCss(customization?.css),
              };

              return html`<div
                class="climate"
                style=${styleMap(parentStyleObj)}
                @action=${this._handleDomainAction(domain)}
                .actionHandler=${actionHandler({
                  hasHold: hasAction(customization?.hold_action),
                  hasDoubleClick: hasAction(customization?.double_tap_action),
                })}
              >
                <span style="color: var(--secondary-text-color)">(</span
                >${joinedTemplates}<span
                  style="color: var(--secondary-text-color)"
                  >)</span
                >
              </div>`;
            }

            const activeTemperatures = (entities || [])
              .filter((entity) => {
                const hvacAction = entity.attributes?.hvac_action;
                const state = entity.state;
                const isActive =
                  !UNAVAILABLE_STATES.includes(state) &&
                  !STATES_OFF.includes(state) &&
                  !excludedEntities.includes(entity.entity_id) &&
                  this._filterByCategory(entity.entity_id);

                if (hvacAction !== undefined && hvacAction !== null) {
                  const hvacLower = hvacAction.toString().toLowerCase();
                  const isHeatingCooling =
                    hvacLower !== "idle" && hvacLower !== "off";
                  return isActive && isHeatingCooling;
                }

                const stateLower = (state ?? "").toString().toLowerCase();
                const isHeatingCoolingByState =
                  stateLower.includes("heat") ||
                  stateLower.includes("cool") ||
                  (stateLower !== "idle" && stateLower !== "off");
                return isActive && isHeatingCoolingByState;
              })
              .map((entity) => {
                const temperature = entity.attributes?.temperature ?? "N/A";
                return `${temperature} ${
                  this.hass?.config?.unit_system?.temperature || ""
                }`;
              });

            if (activeTemperatures.length === 0) {
              return nothing;
            }

            const domainColor = customization?.color;
            const textStyleObj = {
              ...(domainColor ? { color: `var(--${domainColor}-color)` } : {}),
              ...(!domainColor && this._config?.domain_color
                ? { color: this._config.domain_color }
                : {}),
              ...this._parseCss(customization?.css),
            };

            return html`<div
              class="climate"
              style=${styleMap(textStyleObj)}
              @action=${this._handleDomainAction(domain)}
              .actionHandler=${actionHandler({
                hasHold: hasAction(customization?.hold_action),
                hasDoubleClick: hasAction(customization?.double_tap_action),
              })}
            >
              (${activeTemperatures.join(", ")})
            </div>`;
          }
        )}
      </div>
    `;
  }

  private _renderBottom(
    area: any,
    designClasses: Record<string, boolean>,
    sensors: Array<{ domain: string; deviceClass: string; index: number }>,
    entitiesByDomain: { [domain: string]: HassEntity[] },
    customizationSensorMap: Map<string, any>,
    climates: Array<{ domain: string }>,
    customizationDomainMap: Map<string, any>
  ) {
    return html`
      <div
        class="${classMap({
          bottom: true,
          ...designClasses,
        })}"
      >
        <div
          class="${classMap({
            name: true,
            ...designClasses,
            "text-large": true,
            on: true,
          })}"
          style=${styleMap({
            ...(this._config?.area_name_color
              ? { color: `var(--${this._config.area_name_color}-color)` }
              : {}),
            ...this._parseCss(this._config?.name_css),
          })}
          @action=${this._handleAction}
          .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
          })}
        >
          ${this._config.area_name || area.name}
        </div>
        ${this._renderSensors(
          sensors,
          entitiesByDomain,
          area,
          customizationSensorMap
        )}
        ${this._renderClimates(
          climates,
          entitiesByDomain,
          customizationDomainMap
        )}
      </div>
    `;
  }

  protected render() {
    if (
      !this._config ||
      !this.hass ||
      !this.hass.areas ||
      !this.hass.devices ||
      !this.hass.entities
    ) {
      return nothing;
    }

    const isV2Design = this._config?.design === "V2";
    const v2Color =
      isV2Design && this._config?.v2_color
        ? `rgba(${this._config.v2_color.join(", ")})`
        : "var(--primary-color)";

    const classes = {
      mirrored: this._config.mirrored === true,
    };

    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };
    let rowSize = 3;
    try {
      const root = (this.shadowRoot as any)?.host || document.documentElement;
      const val = getComputedStyle(root).getPropertyValue("--row-size");
      if (val) rowSize = Number(val.trim()) || 3;
    } catch (e) {}

    const designStyles = isV2Design ? { background: v2Color } : {};
    const iconContainerStyles =
      isV2Design && rowSize === 1
        ? {}
        : isV2Design
        ? { background: v2Color }
        : {};

    const entitiesByDomainRaw = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    );

    const entitiesByDomain: { [domain: string]: HassEntity[] } = {};
    Object.entries(entitiesByDomainRaw).forEach(([domain, entities]) => {
      entitiesByDomain[domain] = entities.filter((entity) =>
        this._filterByCategory(entity.entity_id)
      );
    });
    const area = this._area(this._config.area, this.hass?.areas || {});

    const customizationDomainMap = this._customizationDomainMap;
    const customizationCoverMap = this._customizationCoverMap;
    const customizationAlertMap = this._customizationAlertMap;
    const customizationSensorMap = this._customizationSensorMap;

    const covers = this._computeCovers(entitiesByDomain, this._deviceClasses);

    const alerts = this._computeAlerts(entitiesByDomain, this._deviceClasses);

    const buttons = this._computeButtons(
      this._config.toggle_domains,
      entitiesByDomain
    );

    const sensors = this._computeSensors(entitiesByDomain, this._deviceClasses);

    const climates = (
      this._config?.toggle_domains?.includes("climate") ? CLIMATE_DOMAINS : []
    )
      .filter((domain) => domain in entitiesByDomain)
      .map((domain) => ({ domain }));
    const display = (this._config?.display_type || "").toString().toLowerCase();
    const showCamera = display.includes("camera");
    const showPicture =
      display.includes("picture") || display.includes("image");
    const showIcon = display === "" ? true : display.includes("icon");

    const cameraEntityId = this._computeCameraEntity(
      showCamera,
      entitiesByDomain
    );

    if (area === null) {
      return html`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    }

    const iconStyles = this._computeIconStyles(
      isV2Design,
      rowSize,
      this._config?.icon_css,
      this._config?.area_icon_color
    );

    const ignoreAspectRatio = this.layout === "grid" || this.layout === "panel";

    return html`
      <ha-card class="${classMap(classes)}">
        <div
          class="header"
          style=${(showPicture || showCamera) &&
          (cameraEntityId || area.picture)
            ? "padding-bottom:0em"
            : "padding-bottom:12em"}
          @action=${this._handleAction}
          .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
          })}
        >
          <div
            class="picture"
            style=${ignoreAspectRatio ? nothing : "max-height:12em;"}
          >
            ${(() => {
              if (
                (showPicture || showCamera) &&
                (cameraEntityId || area.picture)
              ) {
                return html`
                  <hui-image
                    .config=${this._config}
                    .hass=${this.hass}
                    .image=${showCamera ? undefined : area.picture}
                    .cameraImage=${showCamera ? cameraEntityId : undefined}
                    .cameraView=${this._config.camera_view}
                    fit-mode="cover"
                  ></hui-image>
                `;
              }
            })()}
          </div>
        </div>

        <div
          class="${classMap({
            "icon-container": true,
            ...designClasses,
          })}"
          style=${styleMap(iconContainerStyles)}
        >
          ${showIcon
            ? html`
                <ha-icon
                  style=${styleMap(iconStyles)}
                  icon=${this._config.area_icon || area.icon}
                ></ha-icon>
              `
            : nothing}
        </div>

        <div
          class="${classMap({
            content: true,
            ...designClasses,
          })}"
          @action=${this._handleAction}
          .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
          })}
        >
          ${cache(html`<div
            class="${classMap({
              right: true,
              ...designClasses,
            })}"
            style=${styleMap(designStyles)}
          >
            ${this._renderCovers(
              covers,
              entitiesByDomain,
              customizationCoverMap
            )}
            ${this._renderAlerts(
              alerts,
              entitiesByDomain,
              customizationAlertMap
            )}
            ${this.renderCustomButtons()}
            ${this._renderButtons(
              buttons,
              entitiesByDomain,
              customizationDomainMap
            )}
          </div>`)}
          ${cache(
            this._renderBottom(
              area,
              designClasses,
              sensors,
              entitiesByDomain,
              customizationSensorMap,
              climates,
              customizationDomainMap
            )
          )}
        </div>
      </ha-card>
    `;
  }

  private showPopup(
    element: HTMLElement,
    dialogTag: string,
    dialogParams: any
  ): void {
    element.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag,
          dialogImport: () => customElements.whenDefined(dialogTag),
          dialogParams,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _showPopupForDomain(domain: string, deviceClass?: string): void {
    this.selectedDeviceClass = deviceClass || null;
    this._openDomainPopup(domain);
  }

  private _openDomainPopup(domain: string) {
    const area = this._area(this._config?.area, this.hass?.areas || {});
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const dialogTag = "area-card-plus-popup";
    this.showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      selectedDomain: domain,
      selectedDeviceClass: this.selectedDeviceClass || undefined,
      selectedGroup: this.selectedGroup || undefined,
      card: this,
    });
  }

  private _openGeneralPopup() {
    const area = this._area(this._config?.area, this.hass?.areas || {});
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const entitiesByDomain = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, Object.values(this.hass.devices)),
      this._deviceClasses,
      this.hass.states
    );

    const entities: HassEntity[] = [];
    Object.values(entitiesByDomain || {}).forEach((list) => {
      list.forEach((entity) => {
        if (
          !UNAVAILABLE_STATES.includes(entity.state) &&
          !STATES_OFF.includes(entity.state)
        ) {
          entities.push(entity);
        }
      });
    });

    const dialogTag = "area-card-plus-popup";
    this.showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      entities,
      card: this,
      content: entities.length ? undefined : `Keine Entitäten`,
    });
  }

  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      .header {
        position: relative;
        height: 100%;
        width: 100%;
      }
      .picture {
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;
        position: relative;
      }
      hui-image {
        height: 100%;
        width: 100%;
      }
      .sensors {
        --mdc-icon-size: 20px;
      }
      .sensor-value {
        vertical-align: middle;
      }
      .sensor-row {
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        color: var(--primary-color);
        z-index: 1;
        pointer-events: none;
      }
      .icon-container.row {
        top: 25%;
      }
      .icon-container.v2 {
        top: 8px;
        left: 8px;
        border-radius: 50%;
      }
      .mirrored .icon-container {
        left: unset;
        right: 16px;
      }
      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .content.row {
        flex-direction: column;
        justify-content: center;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        position: absolute;
        top: 8px;
        right: 8px;
        gap: 7px;
      }
      .right.row {
        top: unset;
      }
      .mirrored .right {
        right: unset;
        left: 8px;
        flex-direction: row-reverse;
      }
      .alerts,
      .covers,
      .custom_buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -3px;
        gap: 2px;
      }
      .alerts.row,
      .covers.row,
      .custom_buttons.row {
        flex-direction: row-reverse;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-right: -3px;
      }
      .buttons.row {
        flex-direction: row-reverse;
      }
      .bottom {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 8px;
        left: 16px;
      }
      .bottom.row {
        flex-direction: row;
        left: calc(var(--row-size, 3) * 20px + 25px);
        bottom: unset;
        align-items: baseline;
        gap: 5px;
      }
      .mirrored .bottom.row {
        flex-direction: row-reverse;
        right: calc(var(--row-size, 3) * 20px + 25px) !important;
      }
      .mirrored .bottom {
        left: unset;
        right: 16px;
        text-align: end;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
        z-index: 1;
      }
      .name.row {
        margin-bottom: 0;
      }
      .icon-with-count {
        display: flex;
        align-items: center;
        gap: 5px;
        background: none;
        border: solid 0.025rem rgba(var(--rgb-primary-text-color), 0.15);
        padding: 1px;
        border-radius: 5px;
        --mdc-icon-size: 20px;
      }
      .icon-with-count > ha-state-icon,
      .icon-with-count > span {
        pointer-events: none;
      }

      .toggle-on {
        color: var(--primary-text-color);
      }
      .toggle-off {
        color: var(--secondary-text-color) !important;
      }
      .off {
        color: var(--secondary-text-color);
      }
      .navigate {
        cursor: pointer;
      }
      .hover:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
      }
      .text-small {
        font-size: 0.9em;
      }
      .text-medium {
        font-size: 1em;
      }
      .text-large {
        font-size: 1.3em;
      }
      .right * {
        pointer-events: auto;
      }
      .v2 .covers {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .covers {
        flex-direction: row;
      }
      .v2 .custom_buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .custom_buttons {
        flex-direction: row;
      }
      .v2 .alerts {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .areas {
        flex-direction: row;
      }
      .v2 .buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .buttons {
        flex-direction: row;
      }
      .mirrored .v2 .bottom {
        right: 105px !important;
        left: unset;
      }
      .v2 .right {
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: calc(var(--row-size, 3) * 3px) 8px;
        top: unset;
        min-height: 24px;
        pointer-events: none;
      }
      .v2 .bottom {
        left: calc(var(--row-size, 3) * 15px + 55px);
        top: calc(var(--row-size, 3) * 5px + 4px);
        bottom: unset;
      }
      .v2 .bottom.row {
        top: calc(var(--row-size, 3) * 8px + 12px);
        left: calc(var(--row-size, 3) * 15px + 55px);
      }

      .v2 .name {
        margin-bottom: calc(var(--row-size, 3) * 1.5px + 1px);
      }
      .v2 .name.row {
        margin-bottom: 0px;
      }

      @supports (--row-size: 1) {
        .icon-container ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 20px);
        }
        .icon-container.v2 ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 15px);
          border-radius: 50%;
          display: flex;
          padding: 16px;
          color: var(--card-background-color);
        }
      }

      @media (max-width: 768px) {
        .name {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
    `;
  }
}
