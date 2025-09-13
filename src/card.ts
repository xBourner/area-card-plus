import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import memoizeOne from "memoize-one";
import {
  HomeAssistant,
  LovelaceCard,
  computeDomain,
  formatNumber,
  hasAction,
  handleAction,
  ActionHandlerEvent,
} from "custom-card-helpers";
import type {
  HassEntity,
  UnsubscribeFunc,
  Connection,
} from "home-assistant-js-websocket";
import {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  subscribeAreaRegistry,
  subscribeDeviceRegistry,
  subscribeEntityRegistry,
  subscribeOne,
  SubscribeMixin,
  isNumericState,
  blankBeforeUnit,
  actionHandler,
  LovelaceGridOptions,
  applyThemesOnElement,
  CardConfig,
  SENSOR_DOMAINS,
  CLIMATE_DOMAINS,
  TOGGLE_DOMAINS,
  OTHER_DOMAINS,
  COVER_DOMAINS,
  ALERT_DOMAINS,
  UNAVAILABLE_STATES,
  STATES_OFF,
  DEVICE_CLASSES,
  DOMAIN_ICONS,
  DEFAULT_ASPECT_RATIO,
  DomainType,
} from "./helpers";
import "./popup-dialog";
import parseAspectRatio from "./helpers";

@customElement("area-card-plus")
export class AreaCardPlus
  extends SubscribeMixin(LitElement)
  implements LovelaceCard
{
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }

  public static async getStubConfig(hass: HomeAssistant): Promise<CardConfig> {
    const conn = hass.connection as unknown as Connection;
    const areas = await subscribeOne(conn, subscribeAreaRegistry);
    return { type: "custom:area-card-plus", area: areas[0]?.area_id || "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public layout?: string;
  @state() public _config!: CardConfig;
  @state() public _areas?: AreaRegistryEntry[];
  @state() public _devices?: DeviceRegistryEntry[];
  @state() public _entities?: EntityRegistryEntry[];
  @state() public _showPopup: boolean = false;
  @state() public selectedDomain: string | null = null;
  @state() public selectedDeviceClass: string | null = null;

  private _ratio: {
    w: number;
    h: number;
  } | null = null;

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

  private _openDomainPopup(domain: string) {
    const area = this._area(this._config?.area, this._areas || []);
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const dialogTag = "area-card-plus-popup-dialog";
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
    const area = this._area(this._config?.area, this._areas || []);
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const entitiesByDomain = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
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

    const dialogTag = "area-card-plus-popup-dialog";
    this.showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      entities,
      card: this,
      content: entities.length ? undefined : `Keine Entitäten`,
    });
  }

  private _deviceClasses: { [key: string]: string[] } = DEVICE_CLASSES;

  private _entitiesByDomain = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      deviceClasses: { [key: string]: string[] },
      states: HomeAssistant["states"]
    ) => {
      const hiddenEntities = this._config?.hidden_entities || [];
      const entitiesInArea = registryEntities.reduce<string[]>((acc, entry) => {
        if (
          !entry.hidden_by &&
          (entry.area_id
            ? entry.area_id === areaId
            : entry.device_id && devicesInArea.has(entry.device_id)) &&
          (!this._config?.label ||
            (entry.labels &&
              entry.labels.some((l) => this._config?.label.includes(l)))) &&
          !hiddenEntities.includes(entry.entity_id)
        ) {
          acc.push(entry.entity_id);
        }
        return acc;
      }, []);

      const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
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
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
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

  private _average(domain: string, deviceClass?: string): string | undefined {
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this._deviceClasses,
      this.hass.states
    )[domain].filter((entity) =>
      deviceClass ? entity.attributes.device_class === deviceClass : true
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

    // Bei "power" wird die Summe ausgegeben, ansonsten der Durchschnitt.
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
    (areaId: string | undefined, areas: AreaRegistryEntry[]) =>
      areas.find((area) => area.area_id === areaId) || null
  );

  public _devicesInArea = memoizeOne(
    (areaId: string | undefined, devices: DeviceRegistryEntry[]) =>
      new Set(
        areaId
          ? devices.reduce<string[]>((acc, device) => {
              if (device.area_id === areaId) acc.push(device.id);
              return acc;
            }, [])
          : []
      )
  );

  public hassSubscribe(): UnsubscribeFunc[] {
    const conn = this.hass!.connection as unknown as Connection;

    return [
      subscribeAreaRegistry(conn, (areas) => {
        this._areas = areas;
      }),
      subscribeDeviceRegistry(conn, (devices) => {
        this._devices = devices;
      }),
      subscribeEntityRegistry(conn, (entries) => {
        this._entities = entries;
      }),
    ];
  }
  public getCardSize(): number {
    return 3;
  }

  public willUpdate(changedProps: PropertyValues) {
    if (changedProps.has("_config") || this._ratio === null) {
      this._ratio = this._config?.aspect_ratio
        ? parseAspectRatio(this._config?.aspect_ratio)
        : null;

      if (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) {
        this._ratio = parseAspectRatio(DEFAULT_ASPECT_RATIO);
      }
    }
  }

  getGridOptions(): LovelaceGridOptions {
    return {
      columns: 12,
      rows: 3,
      min_columns: 1,
      min_rows: 1,
    };
  }

  public setConfig(config: CardConfig): void {
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
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config") || !this._config) {
      return true;
    }

    if (
      changedProps.has("_devicesInArea") ||
      changedProps.has("_areas") ||
      changedProps.has("_entities")
    ) {
      return true;
    }

    if (changedProps.has("_showPopup")) {
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
      !this._devices ||
      !this._devicesInArea(this._config.area, this._devices) ||
      !this._entities
    ) {
      return false;
    }

    const entities = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
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
      (typeof actionConfig === "string" && actionConfig === "more-info") ||
      (typeof actionConfig === "object" &&
        actionConfig?.action === "more-info");

    if (isMoreInfo || actionConfig === undefined) {
      this._openGeneralPopup();
      return;
    }

    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }

  private _handleDomainAction(domain: string): (ev: CustomEvent) => void {
    return (ev: CustomEvent) => {
      ev.stopPropagation();

      const customization = this._config?.customization_domain?.find(
        (item: { type: string }) => item.type === domain
      );

      const actionConfig =
        ev.detail.action === "tap"
          ? customization?.tap_action
          : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
          ? customization?.double_tap_action
          : null;

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
    };
  }

  private _handleAlertAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    return (ev: CustomEvent) => {
      ev.stopPropagation();

      const customization = this._config?.customization_alert?.find(
        (item: { type: string }) => item.type === deviceClass
      );

      const actionConfig =
        ev.detail.action === "tap"
          ? customization?.tap_action
          : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
          ? customization?.double_tap_action
          : null;

      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (isMoreInfo || actionConfig === undefined) {
        if (domain === "binary_sensor") {
          this._showPopupForDomain(domain, deviceClass);
        }
        return;
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(this, this.hass!, config, ev.detail.action!);
    };
  }

  private _handleCoverAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    return (ev: CustomEvent) => {
      ev.stopPropagation();

      const customization = this._config?.customization_cover?.find(
        (item: { type: string }) => item.type === deviceClass
      );

      const actionConfig =
        ev.detail.action === "tap"
          ? customization?.tap_action
          : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
          ? customization?.double_tap_action
          : null;

      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (isMoreInfo || actionConfig === undefined) {
        if (domain === "cover") {
          this._showPopupForDomain(domain, deviceClass);
        }
        return;
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(this, this.hass!, config, ev.detail.action!);
    };
  }

  private _handleSensorAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    return (ev: CustomEvent) => {
      ev.stopPropagation();

      const customization = this._config?.customization_sensor?.find(
        (item: { type: string }) => item.type === deviceClass
      );

      const actionConfig =
        ev.detail.action === "tap"
          ? customization?.tap_action
          : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
          ? customization?.double_tap_action
          : null;

      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (isMoreInfo) {
        if (domain === "sensor") {
          this._showPopupForDomain(domain, deviceClass);
        }
        return;
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(this, this.hass!, config, ev.detail.action!);
    };
  }

  protected render() {
    if (
      !this._config ||
      !this.hass ||
      !this._areas ||
      !this._devices ||
      !this._entities
    ) {
      return nothing;
    }

    const isV2Design = this._config?.design === "V2";
    const v2Color =
      isV2Design && this._config?.v2_color
        ? this._calculateV2Color(this._config.v2_color)
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
      const val = getComputedStyle(root).getPropertyValue('--row-size');
      if (val) rowSize = Number(val.trim()) || 3;
    } catch (e) {}

    const designStyles = isV2Design ? { background: v2Color } : {};
    const iconContainerStyles = (isV2Design && rowSize === 1)
      ? {}
      : isV2Design
        ? { background: v2Color }
        : {};

    const ignoreAspectRatio = this.layout === "grid";

    const entitiesByDomain = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );
    const area = this._area(this._config.area, this._areas);

    let cameraEntityId: string | undefined;
    if (this._config.show_camera && "camera" in entitiesByDomain) {
      cameraEntityId = entitiesByDomain.camera[0].entity_id;
    }

    const showIcon = this._config?.show_camera
      ? this._config?.show_icon === "icon" ||
        this._config?.show_icon === "icon + image"
      : this._config?.show_icon === "icon" ||
        this._config?.show_icon === "icon + image" ||
        this._config?.show_icon === undefined;

    if (area === null) {
      return html`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    }

    const iconStyles = {
  ...(isV2Design && rowSize === 1 ? { "--mdc-icon-size": "20px" } : {}),
      color: this._config?.area_icon_color
        ? `var(--${this._config.area_icon_color}-color)`
        : "",
      ...(this._config?.icon_css
        ? this._config.icon_css
            .split("\n")
            .reduce((acc: Record<string, string>, line: string) => {
              const trimmed = line.trim();
              if (trimmed && trimmed.includes(":")) {
                const [key, value] = trimmed.split(":");
                acc[key.trim()] = value.trim().replace(";", "");
              }
              return acc;
            }, {})
        : {}),
    };

    return html`
      <ha-card class="${classMap(classes)}" style=${styleMap({
      paddingBottom: ignoreAspectRatio ? "0" : "12em",
    })}>
        ${
          (this._config.show_camera && cameraEntityId) ||
          ((this._config.show_icon === "image" ||
            this._config.show_icon === "icon + image") &&
            area.picture)
            ? html`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  .image=${this._config.show_camera ? undefined : area.picture}
                  .cameraImage=${this._config.show_camera
                    ? cameraEntityId
                    : undefined}
                  .cameraView=${this._config.camera_view}
                  fitMode="cover"
                ></hui-image>
              `
            : nothing
        }
          <div class="${classMap({
            "icon-container": true,
            ...designClasses,
          })}"
          style=${styleMap(iconContainerStyles)}>
          ${
            showIcon
              ? html`
                  <ha-icon
                    style=${styleMap(iconStyles)}
                    icon=${this._config.area_icon || area.icon}
                  ></ha-icon>
                `
              : nothing
          }
          </div>
          <div class="${classMap({
            content: true,
            ...designClasses,
          })}"            @action=${this._handleAction}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this._config.hold_action),
              hasDoubleClick: hasAction(this._config.double_tap_action),
            })}>

        <div
          class="${classMap({
            right: true,
            ...designClasses,
          })}"
          style=${styleMap(designStyles)}
        >


                              <div class="${classMap({
                                covers: true,
                                ...designClasses,
                              })}">
            ${COVER_DOMAINS.map((domain) => {
              if (!(domain in entitiesByDomain)) {
                return nothing;
              }

              return this._deviceClasses[domain].map((deviceClass) => {
                const customization = this._config?.customization_cover?.find(
                  (item: { type: string }) => item.type === deviceClass
                );

                const invert = customization?.invert === true;
                const activeEntities = entitiesByDomain[domain].filter(
                  (entity) => {
                    const entityDeviceClass =
                      entity.attributes.device_class || "default";
                    const isActive = !STATES_OFF.includes(entity.state);
                    return (
                      entityDeviceClass === deviceClass &&
                      (invert ? STATES_OFF.includes(entity.state) : isActive)
                    );
                  }
                );

                const coverColor =
                  customization?.color || this._config?.cover_color;
                const coverIcon = customization?.icon;

                const activeCount = activeEntities.length;

                return activeCount > 0
                  ? html`
                      <div
                        class="icon-with-count"
                        style=${customization?.css || this._config?.cover_css
                          ? (customization?.css || this._config?.cover_css)
                              .split("\n")
                              .reduce((acc: string, line: string) => {
                                const trimmed = line.trim();
                                if (trimmed && trimmed.includes(":")) {
                                  acc += trimmed.endsWith(";")
                                    ? trimmed
                                    : `${trimmed};`;
                                  acc += " ";
                                }
                                return acc;
                              }, "")
                          : ""}
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
                          style="${(coverColor
                            ? `color: var(--${coverColor}-color);`
                            : "") +
                          " " +
                          (customization?.icon_css
                            ? customization.icon_css
                                .split("\n")
                                .reduce((acc: string, line: string) => {
                                  const trimmed = line.trim();
                                  if (trimmed && trimmed.includes(":")) {
                                    acc += trimmed.endsWith(";")
                                      ? trimmed
                                      : `${trimmed};`;
                                    acc += " ";
                                  }
                                  return acc;
                                }, "")
                            : "")}"
                          .icon="${coverIcon
                            ? coverIcon
                            : this._getIcon(
                                domain as DomainType,
                                invert ? false : true,
                                deviceClass
                              )}"
                        ></ha-state-icon>

                        <span
                          class="active-count  text-small${activeCount > 0
                            ? "on"
                            : "off"}"
                          >${activeCount}</span
                        >
                      </div>
                    `
                  : nothing;
              });
            })}
          </div>        

          <div class="${classMap({
            alerts: true,
            ...designClasses,
          })}">
            ${ALERT_DOMAINS.map((domain) => {
              if (!(domain in entitiesByDomain)) {
                return nothing;
              }

              return this._deviceClasses[domain].map((deviceClass) => {
                const customization = this._config?.customization_alert?.find(
                  (item: { type: string }) => item.type === deviceClass
                );
                const invert = customization?.invert === true;

                const activeEntities = entitiesByDomain[domain].filter(
                  (entity) => {
                    const entityDeviceClass =
                      entity.attributes.device_class || "default";
                    const isOn = entity.state === "on";
                    return (
                      entityDeviceClass === deviceClass &&
                      (invert ? STATES_OFF.includes(entity.state) : isOn)
                    );
                  }
                );

                const alertColor =
                  customization?.color || this._config?.alert_color;
                const alertIcon = customization?.icon;

                const activeCount = activeEntities.length;

                return activeCount > 0
                  ? html`
                      <div
                        class="icon-with-count"
                        style=${customization?.css || this._config?.alert_css
                          ? (customization?.css || this._config?.alert_css)
                              .split("\n")
                              .reduce((acc: string, line: string) => {
                                const trimmed = line.trim();
                                if (trimmed && trimmed.includes(":")) {
                                  acc += trimmed.endsWith(";")
                                    ? trimmed
                                    : `${trimmed};`;
                                  acc += " ";
                                }
                                return acc;
                              }, "")
                          : ""}
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
                          style="${(alertColor
                            ? `color: var(--${alertColor}-color);`
                            : "") +
                          " " +
                          (customization?.icon_css
                            ? customization.icon_css
                                .split("\n")
                                .reduce((acc: string, line: string) => {
                                  const trimmed = line.trim();
                                  if (trimmed && trimmed.includes(":")) {
                                    acc += trimmed.endsWith(";")
                                      ? trimmed
                                      : `${trimmed};`;
                                    acc += " ";
                                  }
                                  return acc;
                                }, "")
                            : "")}"
                          .icon="${alertIcon
                            ? alertIcon
                            : this._getIcon(
                                domain as DomainType,
                                invert ? false : true,
                                deviceClass
                              )}"
                        ></ha-state-icon>

                        <span
                          class="active-count  text-small${activeCount > 0
                            ? "on"
                            : "off"}"
                          >${activeCount}</span
                        >
                      </div>
                    `
                  : nothing;
              });
            })}
          </div>          



  

          <div class="${classMap({
            buttons: true,
            ...designClasses,
          })}">
            ${
              this._config.show_active
                ? this._config.toggle_domains?.map((domain: string) => {
                    if (!(domain in entitiesByDomain)) {
                      return nothing;
                    }

                    if (domain === "climate") {
                      const climateCustomization =
                        this._config?.customization_domain?.find(
                          (item: { type: string }) => item.type === "climate"
                        );
                      const displayMode = (climateCustomization as any)
                        ?.display_mode;
                      if (
                        displayMode !== "icon" &&
                        displayMode !== "text_icon"
                      ) {
                        return nothing;
                      }
                    }

                    const customization =
                      this._config?.customization_domain?.find(
                        (item: { type: string }) => item.type === domain
                      );
                    const domainColor =
                      customization?.color || this._config?.domain_color;
                    const domainIcon = customization?.icon;

                    const activeEntities = entitiesByDomain[domain].filter(
                      (entity) =>
                        !UNAVAILABLE_STATES.includes(entity.state) &&
                        !STATES_OFF.includes(entity.state)
                    );
                    const activeCount = activeEntities.length;

                    if (activeCount > 0) {
                      return html`
                        <div
                          class="icon-with-count hover"
                          style=${customization?.css || this._config?.domain_css
                            ? (customization?.css || this._config?.domain_css)
                                .split("\n")
                                .reduce((acc: string, line: string) => {
                                  const trimmed = line.trim();
                                  if (trimmed && trimmed.includes(":")) {
                                    acc += trimmed.endsWith(";")
                                      ? trimmed
                                      : `${trimmed};`;
                                    acc += " ";
                                  }
                                  return acc;
                                }, "")
                            : ""}
                          @action=${this._handleDomainAction(domain)}
                          .actionHandler=${actionHandler({
                            hasHold: hasAction(customization?.hold_action),
                            hasDoubleClick: hasAction(
                              customization?.double_tap_action
                            ),
                          })}
                        >
                          <ha-state-icon
                            style=${domainColor
                              ? `color: var(--${domainColor}-color);`
                              : nothing}
                            class=${activeCount > 0
                              ? "toggle-on"
                              : "toggle-off"}
                            .domain=${domain}
                            .icon=${domainIcon
                              ? domainIcon
                              : this._getIcon(
                                  domain as DomainType,
                                  activeCount > 0
                                )}
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
                    } else {
                      return nothing;
                    }
                  })
                : this._config.toggle_domains?.map((domain: string) => {
                    if (!(domain in entitiesByDomain)) {
                      return nothing;
                    }

                    if (domain === "climate") {
                      const climateCustomization =
                        this._config?.customization_domain?.find(
                          (item: { type: string }) => item.type === "climate"
                        );
                      const displayMode = (climateCustomization as any)
                        ?.display_mode;
                      if (
                        displayMode !== "icon" &&
                        displayMode !== "text_icon"
                      ) {
                        return nothing;
                      }
                    }

                    const customization =
                      this._config?.customization_domain?.find(
                        (item: { type: string }) => item.type === domain
                      );
                    const domainColor = customization?.color;
                    const domainIcon = customization?.icon;

                    const activeEntities = entitiesByDomain[domain].filter(
                      (entity) =>
                        !UNAVAILABLE_STATES.includes(entity.state) &&
                        !STATES_OFF.includes(entity.state)
                    );
                    const activeCount = activeEntities.length;

                    return html`
                      <div
                        class="icon-with-count hover"
                        style=${customization?.css || this._config?.domain_css
                          ? (customization?.css || this._config?.domain_css)
                              .split("\n")
                              .reduce((acc: string, line: string) => {
                                const trimmed = line.trim();
                                if (trimmed && trimmed.includes(":")) {
                                  acc += trimmed.endsWith(";")
                                    ? trimmed
                                    : `${trimmed};`;
                                  acc += " ";
                                }
                                return acc;
                              }, "")
                          : ""}
                        @action=${this._handleDomainAction(domain)}
                        .actionHandler=${actionHandler({
                          hasHold: hasAction(customization?.hold_action),
                          hasDoubleClick: hasAction(
                            customization?.double_tap_action
                          ),
                        })}
                      >
                        <ha-state-icon
                          style=${(domainColor
                            ? `color: var(--${domainColor}-color);`
                            : this._config?.domain_color
                            ? `color: ${this._config.domain_color};`
                            : "") +
                          " " +
                          (customization?.icon_css
                            ? customization.icon_css
                                .split("\n")
                                .reduce((acc: string, line: string) => {
                                  const trimmed = line.trim();
                                  if (trimmed && trimmed.includes(":")) {
                                    acc += trimmed.endsWith(";")
                                      ? trimmed
                                      : `${trimmed};`;
                                    acc += " ";
                                  }
                                  return acc;
                                }, "")
                            : "")}
                          class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                          .domain=${domain}
                          .icon=${domainIcon
                            ? domainIcon
                            : this._getIcon(
                                domain as DomainType,
                                activeCount > 0
                              )}
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
                  })
            }
          </div>
          

          </div>
          <div class="${classMap({
            bottom: true,
            ...designClasses,
          })}">
              <div style=${`${
                this._config?.area_name_color
                  ? `color: var(--${this._config.area_name_color}-color);`
                  : ""
              } ${
                this._config?.name_css
                  ? this._config.name_css
                      .split("\n")
                      .reduce((acc: string, line: string) => {
                        const trimmed = line.trim();
                        if (trimmed && trimmed.includes(":")) {
                          acc += trimmed.endsWith(";")
                            ? trimmed
                            : `${trimmed};`;
                          acc += " ";
                        }
                        return acc;
                      }, "")
                  : ""
              }`}"
              <div class="${classMap({
                name: true,
                ...designClasses,
                "text-large": true,
                on: true,
              })}"
                @action=${this._handleAction}
                .actionHandler=${actionHandler({
                  hasHold: hasAction(this._config.hold_action),
                  hasDoubleClick: hasAction(this._config.double_tap_action),
                })}
              >
                ${this._config.area_name || area.name}
              </div>
              

              <div class="sensors">
                ${SENSOR_DOMAINS.map((domain) => {
                  if (!(domain in entitiesByDomain)) {
                    return nothing;
                  }

                  const sensorElements = this._deviceClasses[domain]
                    .map((deviceClass, index, array) => {
                      const matchingEntities = entitiesByDomain[domain].filter(
                        (entity) =>
                          entity.attributes.device_class === deviceClass
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

                      const customization =
                        this._config?.customization_sensor?.find(
                          (item: { type: string }) => item.type === deviceClass
                        );
                      const sensorColor =
                        customization?.color || this._config?.sensor_color;
                      const invert = customization?.invert === true;
                      const hasOnEntity = matchingEntities.some(
                        (e) =>
                          !UNAVAILABLE_STATES.includes(e.state) &&
                          !STATES_OFF.includes(e.state)
                      );
                      if (invert && hasOnEntity) {
                        return nothing;
                      }

                      const icon = this._config?.show_sensor_icons
                        ? html`
                            <ha-domain-icon
                              style=${sensorColor
                                ? `color: var(--${sensorColor}-color);`
                                : ""}
                              .hass=${this.hass}
                              .domain=${domain}
                              .deviceClass=${deviceClass}
                            ></ha-domain-icon>
                          `
                        : null;

                      const value = html`
                        <span
                          class="sensor-value"
                          @action=${this._handleSensorAction(
                            domain,
                            deviceClass
                          )}
                          .actionHandler=${actionHandler({
                            hasHold: hasAction(customization?.hold_action),
                            hasDoubleClick: hasAction(
                              customization?.double_tap_action
                            ),
                          })}
                          style=${`
              ${sensorColor ? `color: var(--${sensorColor}-color);` : ""}
              ${
                customization?.css
                  ? customization.css
                      .split("\n")
                      .reduce((acc: string, line: string) => {
                        const trimmed = line.trim();
                        if (trimmed && trimmed.includes(":")) {
                          acc += trimmed.endsWith(";")
                            ? trimmed
                            : `${trimmed};`;
                          acc += " ";
                        }
                        return acc;
                      }, "")
                  : ""
              }
            `}
                        >
                          ${!this._config?.show_sensor_icons &&
                          !this._config?.wrap_sensor_icons &&
                          index > 0
                            ? " - "
                            : ""}
                          ${areaEntity
                            ? this.hass.formatEntityState(areaEntity)
                            : this._average(domain, deviceClass)}
                        </span>
                      `;

                      // NUR wenn wrap_sensor_icons aktiv ist, pro Zeile ein div
                      if (this._config?.wrap_sensor_icons) {
                        return html`<div class="sensor-row">
                          ${icon}${value}
                        </div>`;
                      }
                      // Sonst nur Icon und Value zurückgeben (werden dann nebeneinander gerendert)
                      return html`${icon}${value}`;
                    })
                    .filter((element) => element !== nothing);

                  if (sensorElements.length === 0) {
                    return nothing;
                  }

                  // Wenn wrap_sensor_icons NICHT aktiv ist, alles in eine Zeile
                  if (!this._config?.wrap_sensor_icons) {
                    return html`<div class="sensor text-medium off">
                      ${sensorElements}
                    </div>`;
                  }
                  // Sonst: sensorElements enthalten schon die Zeilen
                  return html`<div class="sensor text-medium off">
                    ${sensorElements}
                  </div>`;
                })}
</div>
            <div class="climate text-small off" >
            ${
              this._config?.toggle_domains?.includes("climate")
                ? CLIMATE_DOMAINS.map((domain) => {
                    if (!(domain in entitiesByDomain)) {
                      return "";
                    }

                    const entities = entitiesByDomain[domain];
                    const activeTemperatures = entities
                      .filter((entity) => {
                        const hvacAction = entity.attributes.hvac_action;
                        const state = entity.state;

                        const isActive =
                          !UNAVAILABLE_STATES.includes(state) &&
                          !STATES_OFF.includes(state);

                        if (hvacAction !== undefined) {
                          const isHeatingCooling =
                            hvacAction !== "idle" && hvacAction !== "off";

                          const isHeatButIdle =
                            state === "heat" &&
                            (hvacAction === "idle" || hvacAction === "off");

                          return isActive && isHeatingCooling && !isHeatButIdle;
                        }

                        return isActive;
                      })
                      .map((entity) => {
                        const temperature =
                          entity.attributes.temperature || "N/A";
                        return `${temperature} ${
                          this.hass?.config?.unit_system?.temperature || ""
                        }`;
                      });

                    if (activeTemperatures.length === 0) {
                      return "";
                    }

                    const customization =
                      this._config?.customization_domain?.find(
                        (item: { type: string }) => item.type === domain
                      );
                    const displayMode = (customization as any)?.display_mode;
                    if (displayMode === "icon") {
                      return "";
                    }

                    const domainColor = customization?.color;
                    const textStyle = `${
                      domainColor
                        ? `color: var(--${domainColor}-color);`
                        : this._config?.domain_color
                        ? `color: ${this._config.domain_color};`
                        : ""
                    }${
                      customization?.css
                        ? " " +
                          customization.css
                            .split("\n")
                            .reduce((acc: string, line: string) => {
                              const trimmed = line.trim();
                              if (trimmed && trimmed.includes(":")) {
                                acc += trimmed.endsWith(";")
                                  ? trimmed
                                  : `${trimmed};`;
                                acc += " ";
                              }
                              return acc;
                            }, "")
                        : ""
                    }`;

                    return html`
                      <div
                        class="climate"
                        style=${textStyle}
                        @action=${this._handleDomainAction(domain)}
                        .actionHandler=${actionHandler({
                          hasHold: hasAction(customization?.hold_action),
                          hasDoubleClick: hasAction(
                            customization?.double_tap_action
                          ),
                        })}
                      >
                        (${activeTemperatures.join(", ")})
                      </div>
                    `;
                  })
                : ""
            }
            </div>
          </div>
        </div>

        
        </div>
      </ha-card>
    `;
  }

  private _calculateV2Color(colorArray: number[]): string {
    return `rgba(${colorArray.join(", ")})`;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) {
      return;
    }

    const dialog = this.renderRoot?.querySelector("ha-dialog");
    const container = document.querySelector("home-assistant")?.shadowRoot;

    if (dialog && dialog.parentElement !== container) {
      container?.appendChild(dialog);
    }

    if (changedProps.has("selectedDomain") && this.selectedDomain) {
      const domain = this.selectedDomain;
      if (domain.includes(".")) {
        const entityId = domain;
        const stateObj = this.hass.states[entityId];
        if (stateObj) {
          this.showMoreInfo(stateObj);
        }
      } else {
        this._openDomainPopup(domain);
      }
      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as CardConfig | undefined;

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  private _showPopupForDomain(domain: string, deviceClass?: string): void {
    this.selectedDeviceClass = deviceClass || null;
    this._openDomainPopup(domain);
  }

  private _getIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    if (domain in DOMAIN_ICONS) {
      const icons = DOMAIN_ICONS[domain] as any;

      // Prefer device-class specific icon when available (string or {on,off})
      if (deviceClass && typeof icons === "object") {
        const dc = (icons as Record<string, any>)[deviceClass];
        if (dc) {
          if (typeof dc === "string") return dc;
          if (typeof dc === "object" && "on" in dc && "off" in dc)
            return on ? dc.on : dc.off;
        }
      }

      // Domain-level on/off icons (Default)
      if (typeof icons === "object" && "on" in icons && "off" in icons) {
        return on ? icons.on : icons.off;
      }

      // If icons is a direct string fallback
      if (typeof icons === "string") return icons;
    }

    return "";
  }


  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      hui-image {
        position: absolute;
        z-index: 0;
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
      .covers {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -3px;
        gap: 2px;
      }
      .alerts.row,
      .covers.row {
        flex-direction: row-reverse;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px;
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
        align-items: end;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
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
      .right  * {
        pointer-events: auto;
      }
      .v2 .covers {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .covers {
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
