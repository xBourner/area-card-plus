import { LitElement, html, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { cache } from "lit/directives/cache.js";
import { styleMap } from "lit/directives/style-map.js";
import { repeat } from "lit/directives/repeat.js";
import memoizeOne from "memoize-one";
import type { HassEntity } from "home-assistant-js-websocket";
import {
  CLIMATE_DOMAINS,
  DEVICE_CLASSES,
  DomainType,
  CustomizationConfig,
  TOGGLE_DOMAINS,
  SENSOR_DOMAINS,
  ALERT_DOMAINS,
  COVER_DOMAINS,
  OTHER_DOMAINS,
} from "./const";
import {
  computeCovers,
  computeAlerts,
  computeSensors,
  computeButtons,
  computeCameraEntity,
} from "./card-items";
import {
  computeIconStyles,
  getParsedCss,
  parseCss,
  cardStyles,
} from "./card-styles";
import {
  handleDomainAction,
  handleAlertAction,
  handleCoverAction,
  handleSensorAction,
  makeActionHandler,
  renderActionHandler,
} from "./card-actions";
import "./popup-dialog";
import {
  applyThemesOnElement,
  LovelaceCardConfig,
  LovelaceCard,
  HomeAssistant,
  handleAction,
  ActionHandlerEvent,
  computeDomain,
  STATES_OFF,
  UNAVAILABLE_STATES,
  LovelaceGridOptions,
} from "./ha";
import {
  getAreaEntityIds,
  getDevicesInArea,
  findArea,
  filterByCategory,
  calculateAverage,
  getIcon,
  getEntitiesIndex,
} from "./helpers";

const EMPTY_SET = new Set<string>();

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
  private _customizationDomainMap: Map<string, CustomizationConfig> = new Map();
  private _customizationCoverMap: Map<string, CustomizationConfig> = new Map();
  private _customizationAlertMap: Map<string, CustomizationConfig> = new Map();
  private _customizationSensorMap: Map<string, CustomizationConfig> = new Map();
  private _actionHandlerCache: Map<string, (ev: CustomEvent) => void> =
    new Map();
  private _hiddenEntitiesSet = new Set<string>();
  private _lastEntityIds: string[] | undefined;
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
      const copy = { ...(c || {}) } as CustomizationConfig;
      if (c.styles) {
        if (!copy.styles) copy.styles = {};
        if (typeof c.styles === "string") {
        } else {
          copy.styles = { ...c.styles };
        }
      } else {
        copy.styles = {};
      }

      if (c.css) copy.styles!.card = c.css;
      if (c.icon_css) copy.styles!.icon = c.icon_css;

      if (copy.styles?.card) copy._parsedCss = this._parseCss(copy.styles.card);
      if (copy.styles?.icon)
        copy._parsedIconCss = this._parseCss(copy.styles.icon);
      this._customizationDomainMap.set(copy.type, copy);
    });
    this._customizationCoverMap.clear();
    (this._config?.customization_cover || []).forEach((c: any) => {
      const copy = { ...(c || {}) } as CustomizationConfig;
      if (c.styles) {
        copy.styles = { ...c.styles };
      } else {
        copy.styles = {};
      }
      if (c.css) copy.styles!.card = c.css;
      if (c.icon_css) copy.styles!.icon = c.icon_css;

      if (copy.styles?.card) copy._parsedCss = this._parseCss(copy.styles.card);
      if (copy.styles?.icon)
        copy._parsedIconCss = this._parseCss(copy.styles.icon);
      this._customizationCoverMap.set(copy.type, copy);
    });
    this._customizationAlertMap.clear();
    (this._config?.customization_alert || []).forEach((c: any) => {
      const copy = { ...(c || {}) } as CustomizationConfig;
      if (c.styles) {
        copy.styles = { ...c.styles };
      } else {
        copy.styles = {};
      }
      if (c.css) copy.styles!.card = c.css;
      if (c.icon_css) copy.styles!.icon = c.icon_css;

      if (copy.styles?.card) copy._parsedCss = this._parseCss(copy.styles.card);
      if (copy.styles?.icon)
        copy._parsedIconCss = this._parseCss(copy.styles.icon);
      this._customizationAlertMap.set(copy.type, copy);
    });
    this._customizationSensorMap.clear();
    (this._config?.customization_sensor || []).forEach((c: any) => {
      const copy = { ...(c || {}) } as CustomizationConfig;
      if (c.styles) {
        copy.styles = { ...c.styles };
      } else {
        copy.styles = {};
      }
      if (c.css) copy.styles!.card = c.css;
      if (c.icon_css) copy.styles!.icon = c.icon_css;

      if (copy.styles?.card) copy._parsedCss = this._parseCss(copy.styles.card);
      if (copy.styles?.icon)
        copy._parsedIconCss = this._parseCss(copy.styles.icon);
      this._customizationSensorMap.set(copy.type, copy);
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

  private _getAreaEntityIds = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      entities: HomeAssistant["entities"],
      hiddenEntitiesSet: Set<string>,
      labelConfig: string[] | undefined,
      index?: Map<string, Set<string>>
    ): string[] => {
      return getAreaEntityIds(
        areaId,
        devicesInArea,
        entities,
        hiddenEntitiesSet,
        labelConfig,
        index
      );
    }
  );

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

    if (!this.hass?.devices || !this.hass?.entities) {
      return false;
    }

    const entitiesIndex =
      this.hass.entities && this.hass.devices
        ? getEntitiesIndex(this.hass.entities, this.hass.devices)
        : undefined;

    const entityIds = this._getAreaEntityIds(
      this._config.area,
      entitiesIndex
        ? EMPTY_SET
        : this._devicesInArea(this._config.area, this.hass.devices),
      this.hass.entities,
      this._hiddenEntitiesSet,
      this._config.label,
      entitiesIndex
    );

    if (this._lastEntityIds !== entityIds) {
      this._lastEntityIds = entityIds;
      return true;
    }

    for (const entityId of entityIds) {
      if (
        !oldHass.states[entityId] ||
        oldHass.states[entityId] !== this.hass.states[entityId]
      ) {
        return true;
      }
    }

    return false;
  }

  private _getOrganizedEntities = memoizeOne(
    (
      entityIds: string[],
      states: HomeAssistant["states"],
      deviceClasses: { [key: string]: string[] }
    ) => {
      const grouped = new Map<string, Map<string, HassEntity[]>>();
      const byDomain: { [domain: string]: HassEntity[] } = {};

      for (const entityId of entityIds) {
        const stateObj = states[entityId];
        if (!stateObj) continue;

        const domain = computeDomain(entityId);

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

        if (!byDomain[domain]) byDomain[domain] = [];
        byDomain[domain].push(stateObj);

        if (!grouped.has(domain)) grouped.set(domain, new Map());
        const domainMap = grouped.get(domain)!;

        const dc = stateObj.attributes.device_class || "default";
        if (!domainMap.has(dc)) domainMap.set(dc, []);
        domainMap.get(dc)!.push(stateObj);
      }
      return { grouped, byDomain };
    }
  );

  private _isOn(
    domain: string,
    deviceClass: string | undefined,
    entitiesByDomain: { [domain: string]: HassEntity[] }
  ): HassEntity | undefined {
    const entities = entitiesByDomain[domain];
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

  public _area = memoizeOne(
    (
      areaId: string | undefined,
      areas: any[] | Record<string, any> | undefined
    ) => findArea(areaId, areas)
  );

  public _devicesInArea = memoizeOne(
    (areaId: string | undefined, devices: Record<string, any> | undefined) =>
      getDevicesInArea(areaId, devices)
  );

  private _parseCss(css?: string): Record<string, string> {
    return parseCss(css, this._styleCache);
  }

  private _computeCovers = computeCovers;
  private _computeAlerts = computeAlerts;
  private _computeSensors = computeSensors;
  private _computeButtons = computeButtons;
  private _computeCameraEntity = computeCameraEntity;

  private _computeIconStyles = memoizeOne(
    (
      isV2Design: boolean,
      rowSize: number,
      icon_css: string | undefined,
      area_icon_color: string | undefined
    ) =>
      computeIconStyles(
        isV2Design,
        rowSize,
        icon_css,
        area_icon_color,
        this._styleCache
      )
  );

  private _getParsedCss(
    source?: string,
    customization?: any
  ): Record<string, string> {
    return getParsedCss(source, customization, this._styleCache);
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

  private _cachedIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    const key = `${domain}|${deviceClass || ""}|${on ? "1" : "0"}`;
    if (this._iconCache.has(key)) return this._iconCache.get(key)!;
    const icon = getIcon(domain, on, deviceClass);
    this._iconCache.set(key, icon);
    return icon;
  }

  private _renderCovers(
    covers: Array<{ domain: string; deviceClass: string }>,
    groupedEntities: Map<string, Map<string, HassEntity[]>>,
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
            const candidates =
              groupedEntities.get(domain)?.get(deviceClass) || [];
            const activeEntities = candidates.filter((entity) => {
              const isOn = entity.state === "open";
              return (
                (invert ? STATES_OFF.includes(entity.state) : isOn) &&
                !this._excludedEntitiesSet.has(entity.entity_id) &&
                filterByCategory(
                  entity.entity_id,
                  this.hass.entities,
                  this._config?.category_filter
                )
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
                      this._getParsedCss(
                        customization?.styles?.button ||
                          customization?.styles?.card ||
                          this._config?.cover_css ||
                          (this._config?.styles as any)?.cover,
                        customization
                      )
                    )}
                    @action=${handleCoverAction(this, domain, deviceClass)}
                    .actionHandler=${renderActionHandler(customization)}
                  >
                    ${(() => {
                      const icon = coverIcon
                        ? coverIcon
                        : this._cachedIcon(
                            domain as DomainType,
                            invert ? false : true,
                            deviceClass
                          );
                      const styles = styleMap({
                        ...(coverColor
                          ? { color: `var(--${coverColor}-color)` }
                          : {}),
                        ...this._getParsedCss(
                          customization?.styles?.icon,
                          customization
                        ),
                      });
                      if (icon && !icon.startsWith("mdi:")) {
                        return html`<ha-icon
                          class="cover"
                          style=${styles}
                          .path=${icon}
                        ></ha-icon>`;
                      }
                      return html`<ha-state-icon
                        class="cover"
                        style=${styles}
                        .icon=${icon}
                      ></ha-state-icon>`;
                    })()}
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
    groupedEntities: Map<string, Map<string, HassEntity[]>>,
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
            const candidates =
              groupedEntities.get(domain)?.get(deviceClass) || [];
            const activeEntities = candidates.filter((entity) => {
              const isOn = entity.state === "on";
              return (
                (invert ? STATES_OFF.includes(entity.state) : isOn) &&
                !this._excludedEntitiesSet.has(entity.entity_id) &&
                filterByCategory(
                  entity.entity_id,
                  this.hass.entities,
                  this._config?.category_filter
                )
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
                      this._getParsedCss(
                        customization?.styles?.button ||
                          customization?.styles?.card ||
                          this._config?.alert_css ||
                          (this._config?.styles as any)?.alert,
                        customization
                      )
                    )}
                    @action=${handleAlertAction(this, domain, deviceClass)}
                    .actionHandler=${renderActionHandler(customization)}
                  >
                    ${(() => {
                      const icon = alertIcon
                        ? alertIcon
                        : this._cachedIcon(
                            domain as DomainType,
                            invert ? false : true,
                            deviceClass
                          );
                      const styles = styleMap({
                        ...(alertColor
                          ? { color: `var(--${alertColor}-color)` }
                          : {}),
                        ...this._getParsedCss(
                          customization?.styles?.icon,
                          customization
                        ),
                      });
                      if (icon && !icon.startsWith("mdi:")) {
                        if (icon.startsWith("M")) {
                          return html`<ha-svg-icon
                            class="alert"
                            style=${styles}
                            .path=${icon}
                          ></ha-svg-icon>`;
                        }
                        return html`<ha-icon
                          class="alert"
                          style=${styles}
                          .icon=${icon}
                        ></ha-icon>`;
                      }
                      return html`<ha-state-icon
                        class="alert"
                        style=${styles}
                        .icon=${icon}
                      ></ha-state-icon>`;
                    })()}
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

  private renderCustomButtons(entitiesByDomain: {
    [domain: string]: HassEntity[];
  }) {
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
          if (btn.conditional) {
            const domain = btn.entity ? computeDomain(btn.entity) : null;
            if (domain && domain in entitiesByDomain) {
              const entity = entitiesByDomain[domain].find(
                (e) => e.entity_id === btn.entity
              );
              if (
                !entity ||
                UNAVAILABLE_STATES.includes(entity.state) ||
                STATES_OFF.includes(entity.state)
              ) {
                return nothing;
              }
            }
          }
          const colorStyle = btn.color
            ? { color: `var(--${btn.color}-color, ${btn.color})` }
            : {};
          return html`
            <div
              class="icon-with-count hover"
              style=${styleMap(
                this._getParsedCss(
                  btn.styles?.button || btn.styles?.card || btn.css,
                  btn
                )
              )}
              @action=${makeActionHandler(
                this,
                "custom_button",
                "",
                undefined,
                btn
              )}
              .actionHandler=${renderActionHandler(btn)}
            >
              ${btn.icon.startsWith("M")
                ? html`<ha-svg-icon
                    .path=${btn.icon}
                    style=${styleMap({
                      ...colorStyle,
                      ...this._getParsedCss(
                        btn.styles?.icon || btn.icon_css,
                        btn
                      ),
                    })}
                  ></ha-svg-icon>`
                : html`<ha-icon
                    .icon=${btn.icon}
                    style=${styleMap({
                      ...colorStyle,
                      ...this._getParsedCss(
                        btn.styles?.icon || btn.icon_css,
                        btn
                      ),
                    })}
                  ></ha-icon>`}
              ${btn.name
                ? html`<span class="custom-button-label" style=${styleMap({
                    ...colorStyle,
                    ...this._getParsedCss(btn.styles?.name, btn),
                  })}"
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
                customizationDomainMap.get("climate");

              if (climateCustomization && climateCustomization.hide === true) {
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
                    customization?.styles?.button ||
                      customization?.styles?.card ||
                      customization?.css ||
                      this._config?.domain_css ||
                      (this._config?.styles as any)?.domain,
                    customization
                  )
                )}
                @action=${handleDomainAction(this, domain as string)}
                .actionHandler=${renderActionHandler(customization)}
              >
                ${(() => {
                  const icon = domainIcon
                    ? domainIcon
                    : this._cachedIcon(domain as DomainType, activeCount > 0);
                  const styles = styleMap({
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
                      customization?.styles?.icon || customization?.icon_css,
                      customization
                    ),
                  });
                  if (icon && !icon.startsWith("mdi:")) {
                    if (icon.startsWith("M")) {
                      return html`<ha-svg-icon
                        class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                        style=${styles}
                        .path=${icon}
                      ></ha-svg-icon>`;
                    }
                    return html`<ha-icon
                      class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                      style=${styles}
                      .icon=${icon}
                    ></ha-icon>`;
                  }
                  return html`<ha-state-icon
                    style=${styles}
                    class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                    .domain=${domain}
                    .icon=${icon}
                  ></ha-state-icon>`;
                })()}
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
    groupedEntities: Map<string, Map<string, HassEntity[]>>,
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
                const candidates =
                  groupedEntities.get(domain)?.get(deviceClass) || [];
                const matchingEntities = candidates.filter(
                  (entity) =>
                    !this._excludedEntitiesSet.has(entity.entity_id) &&
                    filterByCategory(
                      entity.entity_id,
                      this.hass.entities,
                      this._config?.category_filter
                    )
                );
                if (matchingEntities.length === 0) {
                  return nothing;
                }
                let areaSensorEntityId: string | null = null;
                switch (deviceClass) {
                  case "temperature":
                    areaSensorEntityId = area.temperature_entity_id;
                    break;
                  case "humidity":
                    areaSensorEntityId = area.humidity_entity_id;
                    break;
                }
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
                    !STATES_OFF.includes(e.state)
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
                          customization?.styles?.icon || customization?.css,
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
                  @action=${handleSensorAction(this, domain, deviceClass)}
                  .actionHandler=${renderActionHandler(customization)}
                  style=${styleMap({
                    ...(sensorColor
                      ? { color: `var(--${sensorColor}-color)` }
                      : {}),
                    ...this._getParsedCss(
                      this._config?.styles?.sensor,
                      this._config
                    ),
                    ...this._getParsedCss(
                      customization?.styles?.sensor ||
                        customization?.styles?.button ||
                        customization?.styles?.card ||
                        customization?.css,
                      customization
                    ),
                  })}
                >
                  ${!this._config?.show_sensor_icons &&
                  !this._config?.wrap_sensor_icons &&
                  index > 0
                    ? " - "
                    : ""}
                  ${areaEntity
                    ? this.hass.formatEntityState(areaEntity)
                    : calculateAverage(
                        domain,
                        deviceClass,
                        matchingEntities,
                        this.hass.locale
                      )}
                </span>`;
                return html`<div class="sensor-row off">${icon}${value}</div>`;
              }
            )
          : html`<div class="sensor text-medium off">
              ${repeat(
                sensors,
                (item) => item.domain + "-" + item.deviceClass,
                ({ domain, deviceClass, index }) => {
                  const candidates =
                    groupedEntities.get(domain)?.get(deviceClass) || [];
                  const matchingEntities = candidates.filter(
                    (entity) =>
                      !this._excludedEntitiesSet.has(entity.entity_id) &&
                      filterByCategory(
                        entity.entity_id,
                        this.hass.entities,
                        this._config?.category_filter
                      )
                  );
                  if (matchingEntities.length === 0) {
                    return nothing;
                  }
                  let areaSensorEntityId: string | null = null;
                  switch (deviceClass) {
                    case "temperature":
                      areaSensorEntityId = area.temperature_entity_id;
                      break;
                    case "humidity":
                      areaSensorEntityId = area.humidity_entity_id;
                      break;
                  }
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
                      !STATES_OFF.includes(e.state)
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
                            customization?.styles?.icon || customization?.css,
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
                    @action=${handleSensorAction(this, domain, deviceClass)}
                    .actionHandler=${renderActionHandler(customization)}
                    style=${styleMap({
                      ...(sensorColor
                        ? { color: `var(--${sensorColor}-color)` }
                        : {}),
                      ...this._getParsedCss(
                        this._config?.styles?.sensor,
                        this._config
                      ),
                      ...this._getParsedCss(
                        customization?.styles?.sensor ||
                          customization?.styles?.button ||
                          customization?.styles?.card ||
                          customization?.css,
                        customization
                      ),
                    })}
                  >
                    ${!this._config?.show_sensor_icons &&
                    !this._config?.wrap_sensor_icons &&
                    index > 0
                      ? " - "
                      : ""}
                    ${areaEntity
                      ? this.hass.formatEntityState(areaEntity)
                      : calculateAverage(
                          domain,
                          deviceClass,
                          matchingEntities,
                          this.hass.locale
                        )}
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
                ...this._getParsedCss(
                  customization?.styles?.button ||
                    customization?.styles?.card ||
                    customization?.css,
                  customization
                ),
              };

              return html`<div
                class="climate"
                style=${styleMap(parentStyleObj)}
                @action=${handleDomainAction(this, domain)}
                .actionHandler=${renderActionHandler(customization)}
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
                  !excludedEntities.includes(entity.entity_id);

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
              ...this._getParsedCss(
                customization?.styles?.button ||
                  customization?.styles?.card ||
                  customization?.css,
                customization
              ),
            };

            return html`<div
              class="climate"
              style=${styleMap(textStyleObj)}
              @action=${handleDomainAction(this, domain)}
              .actionHandler=${renderActionHandler(customization)}
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
    groupedEntities: Map<string, Map<string, HassEntity[]>>,
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
            ...this._getParsedCss(
              this._config?.styles?.name || this._config?.name_css,
              this._config
            ),
          })}
          @action=${this._handleAction}
          .actionHandler=${renderActionHandler(this._config)}
        >
          ${this._config.area_name || area.name}
        </div>
        ${this._renderSensors(
          sensors,
          entitiesByDomain,
          groupedEntities,
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

    const entitiesIndex =
      this.hass.entities && this.hass.devices
        ? getEntitiesIndex(this.hass.entities, this.hass.devices)
        : undefined;

    const entityIds = this._getAreaEntityIds(
      this._config.area,
      entitiesIndex
        ? EMPTY_SET
        : this._devicesInArea(this._config.area, this.hass.devices),
      this.hass.entities,
      this._hiddenEntitiesSet,
      this._config.label,
      entitiesIndex
    );

    const { grouped: groupedEntitiesRaw, byDomain: entitiesByDomainRaw } =
      this._getOrganizedEntities(
        entityIds,
        this.hass.states,
        this._deviceClasses
      );

    const entitiesByDomain: { [domain: string]: HassEntity[] } = {};
    Object.entries(entitiesByDomainRaw).forEach(([domain, entities]) => {
      entitiesByDomain[domain] = entities.filter((entity) =>
        filterByCategory(
          entity.entity_id,
          this.hass.entities,
          this._config?.category_filter
        )
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
      this._config?.styles?.icon || this._config?.icon_css,
      this._config?.area_icon_color
    );

    const ignoreAspectRatio = this.layout === "grid" || this.layout === "panel";

    return html`
      <ha-card
        class="${classMap(classes)}"
        style=${styleMap(
          this._getParsedCss(
            this._config?.styles?.card || this._config?.css,
            this._config
          )
        )}
      >
        <div
          class="header"
          style=${(showPicture || showCamera) &&
          (cameraEntityId || area.picture)
            ? "padding-bottom:0em"
            : "padding-bottom:12em"}
          @action=${this._handleAction}
          .actionHandler=${renderActionHandler(this._config)}
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
                    style=${styleMap(
                      this._getParsedCss(
                        showCamera
                          ? this._config?.styles?.camera
                          : this._config?.styles?.image,
                        this._config
                      )
                    )}
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
            ? (this._config.area_icon || area.icon || "").startsWith("M")
              ? html`
                  <ha-svg-icon
                    style=${styleMap(iconStyles)}
                    .path=${this._config.area_icon || area.icon}
                  ></ha-svg-icon>
                `
              : html`
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
          .actionHandler=${renderActionHandler(this._config)}
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
              groupedEntitiesRaw,
              customizationCoverMap
            )}
            ${this._renderAlerts(
              alerts,
              groupedEntitiesRaw,
              customizationAlertMap
            )}
            ${this.renderCustomButtons(entitiesByDomain)}
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
              groupedEntitiesRaw,
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
      entities: this._getAreaEntityIds(
        this._config.area,
        this._devicesInArea(this._config.area, this.hass.devices),
        this.hass.entities,
        this._hiddenEntitiesSet,
        this._config.label,
        this.hass.entities && this.hass.devices
          ? getEntitiesIndex(this.hass.entities, this.hass.devices)
          : undefined
      )
        .map((id) => this.hass.states[id])
        .filter((e) => e !== undefined),
    });
  }

  private _openGeneralPopup() {
    const area = this._area(this._config?.area, this.hass?.areas || {});
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const dialogTag = "area-card-plus-popup";
    this.showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      card: this,
      entities: this._getAreaEntityIds(
        this._config.area,
        this._devicesInArea(this._config.area, this.hass.devices),
        this.hass.entities,
        this._hiddenEntitiesSet,
        this._config.label,
        this.hass.entities && this.hass.devices
          ? getEntitiesIndex(this.hass.entities, this.hass.devices)
          : undefined
      )
        .map((id) => this.hass.states[id])
        .filter((e) => e !== undefined),
    });
  }

  static get styles() {
    return cardStyles;
  }
}
