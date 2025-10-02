import { repeat } from "lit/directives/repeat.js";
import { LitElement, html, css, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import {
  LovelaceCard,
  HomeAssistant,
  computeDomain,
  AreaRegistryEntry,
  EntityRegistryEntry,
  UNAVAILABLE,
  UNKNOWN,
  STATES_OFF,
  caseInsensitiveStringCompare,
  Schema,
} from "./ha";
import { HassEntity } from "home-assistant-js-websocket";
import {
  SENSOR_DOMAINS,
  ALERT_DOMAINS,
  COVER_DOMAINS,
  DOMAIN_ICONS,
} from "./helpers";
import { mdiClose } from "@mdi/js";
import { computeLabelCallback, translateEntityState } from "./translations";
import memoizeOne from "memoize-one";

const UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN];

const OFF_STATES = [UNAVAILABLE_STATES, STATES_OFF];

export class AreaCardPlusPopup extends LitElement {
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("popstate", this._onPopState);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onPopState);
    this._cardEls.clear();
  }

  private _onPopState = (ev: PopStateEvent) => {
    if (this.open) {
      this._onClosed(ev);
    }
  };

  @property({ type: Boolean }) public open = false;
  @property({ type: String }) public selectedDomain?: string;
  @property({ type: String }) public selectedDeviceClass?: string;
  @property({ type: String }) public content = "";
  @property({ type: Array }) public entities: HassEntity[] = [];
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public card!: LovelaceCard & {
    areas?: AreaRegistryEntry[];
    entities?: any[];
    devices?: any[];
    _config?: any;
    selectedGroup?: number | null;
    selectedDomain?: string | null;
    getCustomizationForType?: (type: string) => any;
    _totalEntities?: (...args: any[]) => HassEntity[];
    _isOn?: (...args: any[]) => HassEntity[];
    _shouldShowTotalEntities?: (...args: any[]) => boolean;
    list_mode?: boolean;
  };

  @state() public selectedGroup?: number;
  private _cardEls: Map<string, HTMLElement> = new Map();

  private getFriendlyName(
    states: { [entity_id: string]: HassEntity },
    entityId: string
  ): string {
    return (
      (states?.[entityId]?.attributes?.friendly_name as string) || entityId
    );
  }

  private compareByFriendlyName(
    states: { [entity_id: string]: HassEntity },
    language?: string
  ): (a: string, b: string) => number {
    return (a: string, b: string) =>
      caseInsensitiveStringCompare(
        this.getFriendlyName(states, a),
        this.getFriendlyName(states, b),
        language
      );
  }

  public async showDialog(params: {
    title?: string;
    hass: HomeAssistant;
    entities?: HassEntity[];
    content?: string;
    selectedDomain?: string;
    selectedDeviceClass?: string;
    selectedGroup?: number;
    card?: unknown;
  }): Promise<void> {
    this.title = params.title ?? this.title;
    this.hass = params.hass;
    this.entities = params.entities ?? [];
    if (params.content !== undefined) this.content = params.content;
    this.selectedDomain = params.selectedDomain;
    this.selectedDeviceClass = params.selectedDeviceClass;
    this.selectedGroup = params.selectedGroup;
    this.card = params.card as LovelaceCard & { areas?: AreaRegistryEntry[] };
    this._cardEls.clear();
    this.open = true;
    this.requestUpdate();
    try {
      await this.updateComplete;
    } catch (_) {}
    this._applyDialogStyleAfterRender();
  }

  private _applyDialogStyleAfterRender() {
    try {
      requestAnimationFrame(() => {
        try {
          this._applyDialogStyle();
        } catch (_) {}
      });
    } catch (_) {
      try {
        this._applyDialogStyle();
      } catch (_) {}
    }
  }

  private _applyDialogStyle() {
    const surface = document
      .querySelector("body > home-assistant")
      ?.shadowRoot?.querySelector("area-card-plus-popup")
      ?.shadowRoot?.querySelector("ha-dialog")
      ?.shadowRoot?.querySelector(
        "div > div.mdc-dialog__container > div.mdc-dialog__surface"
      ) as HTMLElement | null;

    if (surface) {
      surface.style.minHeight = "unset";
      return true;
    }
    return false;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
  }

  private _onClosed = (_ev: Event) => {
    this.open = false;
    this._cardEls.clear();
    this.dispatchEvent(
      new CustomEvent("dialog-closed", {
        bubbles: true,
        composed: true,
        detail: { dialog: this },
      })
    );
    this.dispatchEvent(
      new CustomEvent("popup-closed", {
        bubbles: true,
        composed: true,
        detail: { dialog: this },
      })
    );
  };

  private _toTileConfig(cardConfig: {
    type: string;
    entity?: string;
    [k: string]: any;
  }) {
    return {
      type: "tile",
      entity: cardConfig.entity,
    };
  }

  private async _createCardElement(
    hass: HomeAssistant,
    cardConfig: { type: string; entity?: string; [key: string]: any },
    isFallback = false
  ): Promise<LovelaceCard | HTMLElement> {
    try {
      const helpers = await (window as any)?.loadCardHelpers?.();
      if (helpers?.createCardElement) {
        const el = helpers.createCardElement(cardConfig) as LovelaceCard;
        (el as any).hass = hass;
        (el as any).setAttribute?.("data-hui-card", "");
        return el;
      }
    } catch {}

    try {
      const type = cardConfig.type || "tile";
      const isCustom = typeof type === "string" && type.startsWith("custom:");
      const tag = isCustom ? type.slice(7) : `hui-${type}-card`;

      if (isCustom && !(customElements as any).get(tag)) {
        await customElements.whenDefined(tag).catch(() => {});
      }

      const el = document.createElement(tag) as LovelaceCard;

      if (typeof el.setConfig === "function") {
        el.setConfig(cardConfig);
      }

      (el as any).hass = hass;
      (el as any).setAttribute?.("data-hui-card", "");
      return el;
    } catch {
      if (!isFallback) {
        return this._createCardElement(
          hass,
          this._toTileConfig(cardConfig),
          true
        );
      }
      const empty = document.createElement("div");
      empty.setAttribute("data-hui-card", "");
      return empty;
    }
  }

  private _getPopupCardConfig(entity: HassEntity) {
    const card: any = this.card;
    const domainFromEntity = computeDomain(entity.entity_id);

    const domain = this.selectedDomain || domainFromEntity;
    const deviceClass = this.selectedDomain
      ? this.selectedDeviceClass
      : (this.hass?.states?.[entity.entity_id]?.attributes as any)
          ?.device_class;

    const cfg = card?._config || {};
    let customization: any | undefined;

    if (ALERT_DOMAINS.includes(domain)) {
      customization = cfg.customization_alert?.find(
        (c: any) => c.type === deviceClass
      );
      if (!customization)
        customization = cfg.customization_domain?.find(
          (c: any) => c.type === domain
        );
    } else if (SENSOR_DOMAINS.includes(domain)) {
      customization = cfg.customization_sensor?.find(
        (c: any) => c.type === deviceClass
      );
      if (!customization)
        customization = cfg.customization_domain?.find(
          (c: any) => c.type === domain
        );
    } else if (COVER_DOMAINS.includes(domain)) {
      customization = cfg.customization_cover?.find(
        (c: any) => c.type === deviceClass
      );
      if (!customization)
        customization = cfg.customization_domain?.find(
          (c: any) => c.type === domain
        );
    } else {
      customization = cfg.customization_domain?.find(
        (c: any) => c.type === domain
      );
    }

    const popupCard = customization?.popup_card as any | undefined;

    const resolvedType: string =
      (popupCard && typeof popupCard.type === "string" && popupCard.type) ||
      customization?.popup_card_type ||
      "tile";

    const baseOptions =
      resolvedType === "tile"
        ? (this.DOMAIN_FEATURES as any)[domainFromEntity] ?? {}
        : {};

    let overrideOptions: any = {};
    if (popupCard && typeof popupCard === "object") {
      const { type: _omitType, entity: _omitEntity, ...rest } = popupCard;
      overrideOptions = rest;
    } else {
      overrideOptions = customization?.popup_card_options ?? {};
    }

    const finalConfig = {
      type: resolvedType,
      entity: entity.entity_id,
      ...baseOptions,
      ...overrideOptions,
    } as any;

    return finalConfig;
  }

  private DOMAIN_FEATURES: Record<string, any> = {
    alarm_control_panel: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "alarm-modes",
          modes: [
            "armed_home",
            "armed_away",
            "armed_night",
            "armed_vacation",
            "armed_custom_bypass",
            "disarmed",
          ],
        },
      ],
    },
    light: {
      state_content: ["state", "brightness", "last_changed"],
      features: [{ type: "light-brightness" }],
    },
    cover: {
      state_content: ["state", "position", "last_changed"],
      features: [{ type: "cover-open-close" }, { type: "cover-position" }],
    },
    vacuum: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "vacuum-commands",
          commands: [
            "start_pause",
            "stop",
            "clean_spot",
            "locate",
            "return_home",
          ],
        },
      ],
    },
    climate: {
      state_content: ["state", "current_temperature", "last_changed"],
      features: [
        {
          type: "climate-hvac-modes",
          hvac_modes: [
            "auto",
            "heat_cool",
            "heat",
            "cool",
            "dry",
            "fan_only",
            "off",
          ],
        },
      ],
    },
    water_heater: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "water-heater-operation-modes",
          operation_modes: [
            "electric",
            "gas",
            "heat_pump",
            "eco",
            "performance",
            "high_demand",
            "off",
          ],
        },
      ],
    },
    humidifier: {
      state_content: ["state", "current_humidity", "last_changed"],
      features: [{ type: "target-humidity" }],
    },
    media_player: {
      show_entity_picture: true,
      state_content: ["state", "volume_level", "last_changed"],
      features: [{ type: "media-player-playback" }],
    },
    lock: {
      state_content: ["state", "last_changed"],
      features: [{ type: "lock-commands" }],
    },
    fan: {
      state_content: ["state", "percentage", "last_changed"],
      features: [{ type: "fan-speed" }],
    },
    counter: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "counter-actions",
          actions: ["increment", "decrement", "reset"],
        },
      ],
    },
    lawn_mower: {
      state_content: ["state", "last_changed"],
      features: [
        {
          type: "lawn-mower-commands",
          commands: ["start_pause", "dock"],
        },
      ],
    },
    update: {
      state_content: ["state", "latest_version", "last_changed"],
      features: [{ type: "update-actions", backup: "ask" }],
    },
    switch: {
      state_content: ["state", "last_changed"],
      features: [{ type: "toggle" }],
    },
    scene: {
      state_content: ["state", "last_changed"],
      features: [{ type: "button" }],
    },
    script: {
      state_content: ["state", "last_changed"],
      features: [{ type: "button" }],
    },
    input_boolean: {
      state_content: ["state", "last_changed"],
      features: [{ type: "toggle" }],
    },
    calendar: {
      state_content: "message",
    },
    timer: {
      state_content: ["state", "remaining_time"],
    },
    binary_sensor: {
      state_content: ["state", "last_changed"],
    },
    device_tracker: {
      state_content: ["state", "last_changed"],
    },
    remote: {
      state_content: ["state", "last_changed"],
    },
    valve: {
      state_content: ["state", "last_changed"],
      features: [{ type: "valve-open-close" }],
    },
  };

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.open) {
      return changedProps.has("open");
    }
    return true;
  }

  private _getOrCreateCard(entity: HassEntity): HTMLElement {
    const id = entity.entity_id;
    const existing = this._cardEls.get(id);
    if (existing) {
      try {
        (existing as any).hass = this.hass;
      } catch (_) {}
      return existing;
    }
    const placeholder = document.createElement("div");
    placeholder.classList.add("card-placeholder");
    placeholder.setAttribute("data-hui-card", "");
    this._cardEls.set(id, placeholder);

    const cfg = this._getPopupCardConfig(entity);
    this._createCardElement(this.hass!, cfg).then((el) => {
      try {
        const current = this._cardEls.get(id);
        if (current === placeholder) {
          placeholder.replaceWith(el as any);
          this._cardEls.set(id, el as any);
        }
        (el as any).hass = this.hass;
      } catch (_) {}
    });
    return placeholder;
  }

  public computeLabel = memoizeOne(
    (schema: Schema, domain?: string, deviceClass?: string): string => {
      return computeLabelCallback(this.hass!, schema);
    }
  );

  private _isActive(e: HassEntity): boolean {
    return !OFF_STATES.flat().includes(e.state);
  }

  private sortEntitiesForPopup(entities: HassEntity[]): HassEntity[] {
    const mode = (this.card as any)?._config?.popup_sort || "name";
    const arr = entities.slice();
    if (mode === "state") {
      const cmp = this.compareByFriendlyName(
        this.hass!.states,
        this.hass!.locale.language
      );
      return arr.sort((a, b) => {
        const aActive = this._isActive(a) ? 0 : 1;
        const bActive = this._isActive(b) ? 0 : 1;
        if (aActive !== bActive) return aActive - bActive;
        const aDom = computeDomain(a.entity_id);
        const bDom = computeDomain(b.entity_id);
        const aState = this.hass
          ? translateEntityState(this.hass, a.state, aDom)
          : a.state;
        const bState = this.hass
          ? translateEntityState(this.hass, b.state, bDom)
          : b.state;
        const s = (aState || "").localeCompare(bState || "");
        if (s !== 0) return s;
        return cmp(a.entity_id, b.entity_id);
      });
    }
    const cmp = this.compareByFriendlyName(
      this.hass!.states,
      this.hass!.locale.language
    );
    return arr.sort((a, b) => cmp(a.entity_id, b.entity_id));
  }

  protected render() {
    if (!this.open || !this.hass || !this.card) return html``;

    const card: any = this.card;
    const areaId: string = card._config?.area;
    const devicesInArea: Set<string> =
      card._devicesInArea?.(areaId, card._devices) ?? new Set<string>();
    const registryEntities: EntityRegistryEntry[] = card._entities || [];
    const states = this.hass.states;
    const popupDomains: string[] = card._config?.popup_domains || [];
    const hiddenEntities: string[] = card._config?.hidden_entities || [];
    const extraEntities: string[] = card._config?.extra_entities || [];
    const labelFilter: string[] | undefined = card._config?.label;
    const hideUnavailable: boolean | undefined = card._config?.hide_unavailable;
    const categoryFilter: string | undefined = card._config?.category_filter;
    const selectedDomain = this.selectedDomain || null;
    const selectedDeviceClass = this.selectedDeviceClass || null;
    const filterByCategory = (entityId: string) => {
      if (!categoryFilter) return true;
      const entry = registryEntities.find(
        (e) => (e as any).entity_id === entityId
      );
      const cat = (entry as any)?.entity_category;
      if (!cat) return true;
      if (categoryFilter === "config") return cat !== "config";
      if (categoryFilter === "diagnostic") return cat !== "diagnostic";
      if (categoryFilter === "config+diagnostic")
        return cat !== "config" && cat !== "diagnostic";
      return true;
    };

    const entitiesInArea = registryEntities.reduce<string[]>(
      (acc, entry: any) => {
        if (
          !entry.hidden_by &&
          (entry.area_id
            ? entry.area_id === areaId
            : entry.device_id && devicesInArea.has(entry.device_id)) &&
          (!labelFilter ||
            (entry.labels &&
              entry.labels.some((l: string) =>
                (labelFilter as any).includes(l)
              )))
        ) {
          const entityId = entry.entity_id;
          if (
            !hiddenEntities.includes(entityId) &&
            filterByCategory(entityId) &&
            (!hideUnavailable ||
              !UNAVAILABLE_STATES.includes(states[entityId]?.state))
          ) {
            acc.push(entityId);
          }
        }
        return acc;
      },
      [] as string[]
    );

    let ents: HassEntity[] = [];
    for (const entityId of entitiesInArea) {
      const domain = computeDomain(entityId);
      if (popupDomains.length > 0 && !popupDomains.includes(domain)) continue;
      const stateObj = states[entityId];
      if (!stateObj) continue;
      if (selectedDomain && domain !== selectedDomain) continue;
      if (
        selectedDeviceClass &&
        (stateObj.attributes as any).device_class !== selectedDeviceClass
      )
        continue;
      ents.push(stateObj);
    }

    for (const extra of extraEntities) {
      const domain = computeDomain(extra);
      const st = states[extra];
      if (!st) continue;
      if (popupDomains.length > 0 && !popupDomains.includes(domain)) continue;
      if (selectedDomain && domain !== selectedDomain) continue;
      if (
        selectedDeviceClass &&
        (st.attributes as any).device_class !== selectedDeviceClass
      )
        continue;
      if (filterByCategory(extra) && !ents.some((e) => e.entity_id === extra)) {
        ents.push(st);
      }
    }

    const ungroupAreas = card?._config?.ungroup_areas === true;
    let displayColumns = card._config?.columns ? card._config.columns : 4;

    let finalDomainEntries: Array<[string, HassEntity[]]> = [];
    let sorted: HassEntity[] = [];

    if (ungroupAreas) {
      sorted = this.sortEntitiesForPopup(ents);
      displayColumns = Math.min(displayColumns, Math.max(1, sorted.length));
    } else {
      const byDomain: Record<string, HassEntity[]> = {};
      for (const e of ents) {
        const d = computeDomain(e.entity_id);
        if (!(d in byDomain)) byDomain[d] = [];
        byDomain[d].push(e);
      }

      const _iconOrder = Object.keys(DOMAIN_ICONS || {});
      const sortOrder = popupDomains.length > 0 ? popupDomains : _iconOrder;
      finalDomainEntries = Object.entries(byDomain)
        .filter(([d]) => !selectedDomain || d === selectedDomain)
        .sort(([a], [b]) => {
          const ia = sortOrder.indexOf(a);
          const ib = sortOrder.indexOf(b);
          return (
            (ia === -1 ? sortOrder.length : ia) -
            (ib === -1 ? sortOrder.length : ib)
          );
        })
        .map(
          ([d, list]) =>
            [d, this.sortEntitiesForPopup(list)] as [string, HassEntity[]]
        );

      const maxEntityCount = finalDomainEntries.length
        ? Math.max(...finalDomainEntries.map(([, list]) => list.length))
        : 0;
      displayColumns = Math.min(displayColumns, Math.max(1, maxEntityCount));
    }

    const area = card._area?.(card._config?.area, card._areas) ?? null;

    return html`
      <ha-dialog
        hideActions
        id="more-info-dialog"
        style="--columns: ${displayColumns};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${mdiClose}
            @click=${this._onClosed}
            .label=${this.hass!.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${card._config?.area_name || (area && (area as any).name)}</h3>
          </div>
        </div>
        <div class="dialog-content scrollable">
          ${
            !ungroupAreas
              ? html`${repeat(
                  finalDomainEntries,
                  ([dom]) => dom,
                  ([dom, list]) => html`
                    <div class="cards-wrapper">
                      <h4>
                        ${dom === "binary_sensor" ||
                        dom === "sensor" ||
                        dom === "cover"
                          ? this._getDomainName(
                              dom,
                              selectedDeviceClass || undefined
                            )
                          : this._getDomainName(dom)}
                      </h4>
                      <div class="entity-cards">
                        ${repeat(
                          list,
                          (entity: HassEntity) => entity.entity_id,
                          (entity: HassEntity) => html`
                            <div class="entity-card">
                              ${this._getOrCreateCard(entity)}
                            </div>
                          `
                        )}
                      </div>
                    </div>
                  `
                )}`
              : html`
                  <div class="cards-wrapper">
                    <div class="entity-cards">
                      ${sorted.map(
                        (entity: HassEntity) => html`
                          <div class="entity-card">
                            ${this._getOrCreateCard(entity)}
                          </div>
                        `
                      )}
                    </div>
                  </div>
                `
          }
              </div>
        </div>
      </ha-dialog>
    `;
  }

  private _getDomainName(domain: string, deviceClass?: string): string {
    if (!this.hass) return domain;
    if (domain === "scene") return "Scene";
    if (
      domain === "binary_sensor" ||
      domain === "sensor" ||
      domain === "cover"
    ) {
      return deviceClass
        ? this.hass.localize(
            `component.${domain}.entity_component.${deviceClass}.name`
          )
        : this.hass.localize(`component.${domain}.entity_component._.name`);
    }
    return this.hass.localize(`component.${domain}.entity_component._.name`);
  }

  static styles = css`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }
    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: calc((var(--columns, 4) * 22.5vw) + 5vw);
      box-sizing: border-box;
      overflow-x: auto;
    }
    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      min-width: 15vw;
      position: sticky;
      top: 0;
      z-index: 10;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      background: transparent;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content.scrollable {
      margin-bottom: 16px;
      max-height: 80vh;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .dialog-content.scrollable::-webkit-scrollbar {
      display: none;
    }
    .cards-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    h4 {
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em 0em;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
      margin-top: 0.8em;
    }
    .entity-card {
      width: 22.5vw;
      box-sizing: border-box;
    }

    @media (max-width: 1200px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(var(--columns, 2), 45vw);
      }
      h4 {
        width: calc(var(--columns, 2) * 45vw);
        margin: 0.8em 0.2em;
      }
    }

    @media (max-width: 700px) {
      ha-dialog {
        --dialog-content-padding: 8px;
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-card {
        width: 92vw;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  `;
}

customElements.define("area-card-plus-popup", AreaCardPlusPopup);
