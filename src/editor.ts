import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  computeDomain,
  HomeAssistant,
  LovelaceCardEditor,
  LovelaceCardConfig,
  getSensorNumericDeviceClasses,
  fireEvent,
  SelectOption,
  Schema,
  SubElementEditorConfig,
} from "./ha";
import {
  compareByFriendlyName,
  getEntitiesIndex,
  getAreaEntityIds,
  getDevicesInArea,
} from "./helpers";
import memoizeOne from "memoize-one";
import {
  DEVICE_CLASSES,
  TOGGLE_DOMAINS,
  CLIMATE_DOMAINS,
  DOMAIN_ICONS,
} from "./const";
import {
  getConfigSchema,
  getAppearanceSchema,
  getActionsSchema,
  getBinarySchema,
  getCoverSchema,
  getSensorSchema,
  getToggleSchema,
  getStyleSchema,
} from "./editor-schema";
import {
  mdiAlert,
  mdiGarage,
  mdiChartBoxMultiple,
  mdiCube,
  mdiViewDashboardVariant,
  mdiGestureTapButton,
  mdiEye,
  mdiEyeOff,
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiHelpCircle,
  mdiChevronLeft,
} from "@mdi/js";
import "./items-editor";
import "./item-editor";
import { computeLabelCallback } from "./translations";

const EMPTY_SET = new Set<string>();

export type AreaCardDisplayType =
  | "icon"
  | "picture"
  | "icon + picture"
  | "camera"
  | "camera & icon";

@customElement("area-card-plus-editor")
export class AreaCardPlusEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public lovelace?: any;
  @state() private _config?: LovelaceCardConfig;

  @state() private _activeTab = "config";

  @state() private _numericDeviceClasses?: string[];
  @state() private _subElementEditorDomain: SubElementEditorConfig | undefined =
    undefined;
  @state() private _subElementEditorAlert: SubElementEditorConfig | undefined =
    undefined;
  @state() private _subElementEditorCover: SubElementEditorConfig | undefined =
    undefined;
  @state() private _subElementEditorSensor: SubElementEditorConfig | undefined =
    undefined;
  @state() private _subElementEditorCustomButton:
    | SubElementEditorConfig
    | undefined = undefined;

  private _computeLabelCallback = memoizeOne(
    (schema: Schema, hass: HomeAssistant): string => {
      return computeLabelCallback(hass, schema);
    }
  );

  private computeLabel = (schema: Schema): string =>
    this._computeLabelCallback(schema, this.hass);

  private _schema = memoizeOne(
    (
      tab: string,
      designVersion: string,
      displayType: AreaCardDisplayType,
      language: string
    ) => {
      switch (tab) {
        case "appearance":
          return getAppearanceSchema(designVersion, displayType, this.hass!);
        case "actions":
          return getActionsSchema();
        case "style":
          return getStyleSchema();
        case "config":
        default:
          return getConfigSchema();
      }
    }
  );

  private _binaryschema = memoizeOne((binaryClasses: SelectOption[]) =>
    getBinarySchema(binaryClasses)
  );

  private _coverschema = memoizeOne((CoverClasses: SelectOption[]) =>
    getCoverSchema(CoverClasses)
  );

  private _sensorschema = memoizeOne((sensorClasses: SelectOption[]) =>
    getSensorSchema(sensorClasses)
  );

  private _toggleschema = memoizeOne((toggleDomains: SelectOption[]) =>
    getToggleSchema(toggleDomains)
  );

  private _popupschema = memoizeOne(
    (allDomains: SelectOption[], allEntities: SelectOption[]) => {
      const name = this.computeLabel({ name: "name" });
      const state = this.computeLabel({ name: "state" });
      return [
        {
          name: "columns",
          selector: { number: { min: 1, max: 4 } },
        },
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "ungroup_areas",
              selector: { boolean: {} },
            },
            { name: "hide_unavailable", selector: { boolean: {} } },
          ],
        },
        {
          name: "popup_sort",
          selector: {
            select: {
              options: [
                { value: "name", label: name },
                { value: "state", label: state },
              ],
            },
          },
        },
        {
          name: "popup_domains",
          selector: {
            select: {
              reorder: true,
              multiple: true,
              custom_value: true,
              options: allDomains,
            },
          },
        },
        {
          name: "edit_filters",
          flatten: true,
          type: "expandable",
          icon: "mdi:eye-plus",
          schema: [{ name: "label", selector: { label: { multiple: true } } }],
        },
        {
          name: "extra_entities",
          flatten: true,
          type: "expandable",
          icon: "mdi:eye-plus",
          schema: [
            {
              name: "extra_entities",
              selector: { entity: { multiple: true } },
            },
          ],
        },
      ];
    }
  );

  private _binaryClassesForArea = memoizeOne(
    (
      area: string,
      entities: HomeAssistant["entities"],
      devices: HomeAssistant["devices"]
    ): string[] =>
      this._classesForArea(area, "binary_sensor", undefined, entities, devices)
  );

  private _coverClassesForArea = memoizeOne(
    (
      area: string,
      entities: HomeAssistant["entities"],
      devices: HomeAssistant["devices"]
    ): string[] =>
      this._classesForArea(area, "cover", undefined, entities, devices)
  );

  private _sensorClassesForArea = memoizeOne(
    (
      area: string,
      numericDeviceClasses: string[] | undefined,
      entities: HomeAssistant["entities"],
      devices: HomeAssistant["devices"]
    ): string[] =>
      this._classesForArea(
        area,
        "sensor",
        numericDeviceClasses,
        entities,
        devices
      )
  );

  private _toggleDomainsForArea = memoizeOne(
    (
      area: string,
      entities: HomeAssistant["entities"],
      devices: HomeAssistant["devices"]
    ): string[] =>
      this._classesForArea(area, "toggle", undefined, entities, devices)
  );

  private _allDomainsForArea = memoizeOne(
    (
      area: string,
      entities: HomeAssistant["entities"],
      devices: HomeAssistant["devices"]
    ): string[] =>
      this._classesForArea(area, "all", undefined, entities, devices)
  );

  private _classesForArea(
    area: string,
    domain: "sensor" | "binary_sensor" | "cover" | "toggle" | "all",
    numericDeviceClasses: string[] | undefined,
    entitiesRegistry: HomeAssistant["entities"],
    devicesRegistry: HomeAssistant["devices"]
  ): string[] {
    const entitiesIndex = getEntitiesIndex(entitiesRegistry, devicesRegistry);
    const devicesInArea = entitiesIndex
      ? EMPTY_SET
      : getDevicesInArea(area, devicesRegistry);

    const candidateIds = getAreaEntityIds(
      area,
      devicesInArea,
      entitiesRegistry,
      new Set(),
      undefined,
      entitiesIndex
    );

    const extraEntities = this._config?.extra_entities || [];

    const entities = candidateIds
      .map((id) => this.hass.states[id])
      .filter((e) => e !== undefined);

    if (domain === "toggle") {
      const filtered = entities.filter(
        (e) =>
          TOGGLE_DOMAINS.includes(computeDomain(e.entity_id)) ||
          CLIMATE_DOMAINS.includes(computeDomain(e.entity_id))
      );
      return [...new Set(filtered.map((e) => computeDomain(e.entity_id)))];
    }

    if (domain === "all") {
      const extraEntityObjects = extraEntities
        .map((entityId: string) => this.hass!.states[entityId])
        .filter((stateObj: string) => stateObj !== undefined);

      const all = [...entities, ...extraEntityObjects];
      return [...new Set(all.map((e) => computeDomain(e.entity_id)))];
    }

    const filtered = entities.filter(
      (e) =>
        computeDomain(e.entity_id) === domain &&
        !(entitiesRegistry[e.entity_id] as any)?.entity_category
    );

    const classes = filtered
      .map((e) => e.attributes.device_class || "")
      .filter(
        (c) =>
          c &&
          (domain !== "sensor" ||
            !numericDeviceClasses ||
            numericDeviceClasses.includes(c))
      );

    return [...new Set(classes)];
  }

  private _buildBinaryOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("binary_sensor", possibleClasses, currentClasses)
  );

  private _buildCoverOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("cover", possibleClasses, currentClasses)
  );

  private _buildSensorOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("sensor", possibleClasses, currentClasses)
  );

  private _buildToggleOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("toggle", possibleClasses, currentClasses)
  );

  private _buildAllOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("all", possibleClasses, currentClasses)
  );

  private _buildOptions(
    type: "sensor" | "binary_sensor" | "cover" | "toggle" | "all",
    possibleClasses: string[],
    currentClasses: string[]
  ): SelectOption[] {
    const allClasses = [...new Set([...possibleClasses, ...currentClasses])];

    const options = allClasses.map((domain) => ({
      value: domain,
      label:
        domain === "scene"
          ? "Scene"
          : type === "toggle" || type === "all"
          ? this.hass!.localize(
              `component.${domain}.entity_component._.name`
            ) || domain
          : this.hass!.localize(
              `component.${type}.entity_component.${domain}.name`
            ) || domain,
    }));

    const cmp = compareByFriendlyName(
      this.hass!.states,
      this.hass!.locale.language
    );
    options.sort((a, b) => cmp(a.value, b.value));

    return options;
  }

  setConfig(config: LovelaceCardConfig): void {
    this._config = {
      ...config,
      columns: config.columns || 4,
      mirrored: config.mirrored || false,
      customization_domain: config.customization_domain || [],
      customization_alert: config.customization_alert || [],
      customization_cover: config.customization_cover || [],
      customization_sensor: config.customization_sensor || [],
      custom_buttons: config.custom_buttons || [],
    };
  }

  protected async updated(
    changedProperties: Map<string | number | symbol, unknown>
  ): Promise<void> {
    super.updated(changedProperties);

    if (!this.hass || !this._config) {
      return;
    }

    if (changedProperties.has("_config")) {
      const previousConfig = changedProperties.get("_config") as
        | LovelaceCardConfig
        | undefined;
      const previousArea = previousConfig?.area;
      const currentArea = this._config.area;

      const previousExtraEntities = previousConfig?.extra_entities || [];
      const currentExtraEntities = this._config.extra_entities || [];

      const previousPopupDomains = previousConfig?.popup_domains || [];
      const currentPopupDomains = this._config?.popup_domains || [];

      const extraEntitiesChanged =
        previousExtraEntities.length !== currentExtraEntities.length ||
        !previousExtraEntities.every((entity: string) =>
          currentExtraEntities.includes(entity)
        );

      const popupDomainsChanged =
        previousPopupDomains.length !== currentPopupDomains.length ||
        !previousPopupDomains.every((entity: string) =>
          currentPopupDomains.includes(entity)
        );

      if (previousArea !== undefined && previousArea !== currentArea) {
        const possibleToggleDomains = this._toggleDomainsForArea(
          currentArea,
          this.hass.entities,
          this.hass.devices
        );
        const possibleAlertClasses = this._binaryClassesForArea(
          currentArea,
          this.hass.entities,
          this.hass.devices
        );
        const possibleCoverClasses = this._coverClassesForArea(
          currentArea,
          this.hass.entities,
          this.hass.devices
        );
        const possibleDomains = this._allDomainsForArea(
          currentArea,
          this.hass.entities,
          this.hass.devices
        );

        const sortedToggleDomains = possibleToggleDomains.sort(
          (a, b) => TOGGLE_DOMAINS.indexOf(a) - TOGGLE_DOMAINS.indexOf(b)
        );

        const _iconOrder = Object.keys(DOMAIN_ICONS || {});
        const _iconIndex = new Map<string, number>(
          _iconOrder.map((d, i) => [d, i])
        );
        const sortedDomains = possibleDomains.sort((a, b) => {
          const ia = _iconIndex.has(a)
            ? _iconIndex.get(a)!
            : Number.MAX_SAFE_INTEGER;
          const ib = _iconIndex.has(b)
            ? _iconIndex.get(b)!
            : Number.MAX_SAFE_INTEGER;
          if (ia === ib) return a.localeCompare(b);
          return ia - ib;
        });

        this._config.toggle_domains = [
          ...sortedToggleDomains.filter((d) => d !== "scene" && d !== "script"),
        ];
        this._config.alert_classes = [...possibleAlertClasses];
        this._config.cover_classes = [...possibleCoverClasses];
        this._config.popup_domains = [...sortedDomains];
        this._config.customization_domain = [];
        this._config.customization_alert = [];
        this._config.customization_cover = [];
        this._config.customization_sensor = [];
        this._updateEntityOptions();

        if (Array.isArray(this._config.hidden_entities)) {
          const currentHidden = this._config.hidden_entities as string[];
          const allowed = Object.values(this._hiddenEntitiesByDomain()).flat();
          const newHidden = currentHidden.filter((id) => allowed.includes(id));
          if (newHidden.length !== currentHidden.length) {
            this._config = {
              ...(this._config || {}),
              hidden_entities: newHidden,
            } as LovelaceCardConfig;

            fireEvent(this, "config-changed", {
              config: { ...this._config },
            });
          }
        }

        this.requestUpdate();
      }

      if (extraEntitiesChanged) {
        for (const entity of currentExtraEntities) {
          const domain = computeDomain(entity);
          if (!this._config.popup_domains.includes(domain)) {
            this._config.popup_domains.push(domain);
          }
        }
        this.requestUpdate();
      }

      if (popupDomainsChanged) {
        this._updateEntityOptions();
      }
    }

    if (!this._numericDeviceClasses) {
      const { numeric_device_classes: sensorNumericDeviceClasses } =
        await getSensorNumericDeviceClasses(this.hass);
      this._numericDeviceClasses = sensorNumericDeviceClasses;
    }
  }

  private _entityOptions: SelectOption[] = [];

  private _updateEntityOptions(): void {
    if (!this._config || !this.hass) return;

    const currentArea = this._config.area;
    const currentPopupDomains = this._config.popup_domains || [];

    const devicesInArea = getDevicesInArea(currentArea, this.hass.devices);
    const candidateIds = getAreaEntityIds(
      currentArea,
      devicesInArea,
      this.hass.entities,
      new Set(),
      undefined,
      getEntitiesIndex(this.hass.entities, this.hass.devices)
    );

    this._entityOptions = candidateIds
      .filter((id) => {
        const e = this.hass!.states[id];
        if (!e) return false;

        return (
          !this.hass!.entities[id]?.hidden &&
          currentPopupDomains.includes(computeDomain(id))
        );
      })
      .map((id) => ({
        value: id,
        label: id,
      }));

    const cmp = compareByFriendlyName(
      this.hass!.states,
      this.hass!.locale.language
    );
    this._entityOptions.sort((a, b) => cmp(a.value, b.value));

    this._valueChanged({ detail: { value: this._config } } as CustomEvent);
  }

  private _valueChanged(event: CustomEvent) {
    this._config = event.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
      })
    );
  }

  private _isHiddenEntity(entity_id: string): boolean {
    const list = this._config?.hidden_entities ?? [];
    return Array.isArray(list) && list.includes(entity_id);
  }

  private _toggleEntityHidden = (entity_id: string) => {
    const current = new Set(this._config?.hidden_entities ?? []);
    if (current.has(entity_id)) current.delete(entity_id);
    else current.add(entity_id);
    const hidden_entities = Array.from(current);
    this._config = {
      ...(this._config || {}),
      hidden_entities,
    } as LovelaceCardConfig;
    fireEvent(this, "config-changed", { config: this._config });
  };

  private _isExcludedEntity(entity_id: string): boolean {
    const list = this._config?.excluded_entities ?? [];
    return Array.isArray(list) && list.includes(entity_id);
  }

  private _toggleEntityExcluded = (entity_id: string) => {
    const current = new Set(this._config?.excluded_entities ?? []);
    if (current.has(entity_id)) current.delete(entity_id);
    else current.add(entity_id);
    const excluded_entities = Array.from(current);
    this._config = {
      ...(this._config || {}),
      excluded_entities,
    } as LovelaceCardConfig;
    fireEvent(this, "config-changed", { config: this._config });
  };

  private _hiddenCategoryChanged(ev: CustomEvent) {
    const val = ev.detail?.value?.category_filter;
    this._config = {
      ...(this._config || {}),
      category_filter: val,
    } as LovelaceCardConfig;
    fireEvent(this, "config-changed", { config: { ...this._config } });
  }

  private _editItem(
    ev: CustomEvent<number>,
    editorKey: "Domain" | "Alert" | "Cover" | "Sensor"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = ev.detail;

    this[`_subElementEditor${editorKey}`] = { index, type: "element" };
  }

  private _edit_itemDomain(ev: CustomEvent<number>): void {
    this._editItem(ev, "Domain");
  }

  private _edit_itemAlert(ev: CustomEvent<number>): void {
    this._editItem(ev, "Alert");
  }

  private _edit_itemCover(ev: CustomEvent<number>): void {
    this._editItem(ev, "Cover");
  }

  private _edit_itemSensor(ev: CustomEvent<number>): void {
    this._editItem(ev, "Sensor");
  }

  private _customizationChanged(
    ev: CustomEvent<LovelaceCardConfig[]>,
    customizationKey: "domain" | "alert" | "cover" | "sensor"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    fireEvent(this, "config-changed", {
      config: {
        ...this._config,
        [`customization_${customizationKey}`]: ev.detail,
      } as LovelaceCardConfig,
    });
  }

  private _customizationChangedDomain(
    ev: CustomEvent<LovelaceCardConfig[]>
  ): void {
    this._customizationChanged(ev, "domain");
  }

  private _customizationChangedAlert(
    ev: CustomEvent<LovelaceCardConfig[]>
  ): void {
    this._customizationChanged(ev, "alert");
  }

  private _customizationChangedCover(
    ev: CustomEvent<LovelaceCardConfig[]>
  ): void {
    this._customizationChanged(ev, "cover");
  }

  private _customizationChangedSensor(
    ev: CustomEvent<LovelaceCardConfig[]>
  ): void {
    this._customizationChanged(ev, "sensor");
  }

  private _renderSubElementEditorCustomButton() {
    const index = this._subElementEditorCustomButton?.index ?? 0;
    const buttonConfig = this._config?.custom_buttons?.[index] || {};

    return html`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${this._goBackCustomButton}>
            <ha-svg-icon .path=${mdiChevronLeft}></ha-svg-icon>
          </mwc-icon-button>
          <span slot="title"
            >${this.hass.localize(
              "ui.panel.lovelace.editor.card.generic.edit_button"
            )}</span
          >
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${buttonConfig}
        .getSchema=${"custom_button"}
        @config-changed=${this._itemChangedCustomButton}
      ></item-editor>
    `;
  }

  private _edit_itemCustomButton(ev: CustomEvent<number>): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    this._subElementEditorCustomButton = { index: ev.detail, type: "element" };
  }

  private _goBackCustomButton(): void {
    this._subElementEditorCustomButton = undefined;
  }

  private _itemChangedCustomButton(ev: CustomEvent<LovelaceCardConfig>): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = this._subElementEditorCustomButton?.index;
    if (index !== undefined) {
      const newButtons = [...(this._config.custom_buttons || [])];
      newButtons[index] = ev.detail;

      fireEvent(this, "config-changed", {
        config: { ...this._config, custom_buttons: newButtons },
      });
    }
  }

  private _customizationChangedCustomButtons(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const updatedButtons = ev.detail;
    fireEvent(this, "config-changed", {
      config: { ...this._config, custom_buttons: updatedButtons },
    });
  }

  private _renderSubElementEditor(
    editorKey: "domain" | "alert" | "cover" | "sensor",
    goBackHandler: () => void,
    itemChangedHandler: (ev: CustomEvent<LovelaceCardConfig>) => void
  ) {
    const listName = `customization_${editorKey}` as keyof LovelaceCardConfig;
    const subConfigs = this._config?.[listName] as
      | Array<{ type?: string }>
      | undefined;
    const editorKeyCapitalized = `_subElementEditor${
      editorKey.charAt(0).toUpperCase() + editorKey.slice(1)
    }` as keyof this;
    const idx =
      (this[editorKeyCapitalized] as SubElementEditorConfig)?.index ?? 0;
    const rawType = subConfigs?.[idx]?.type ?? "unknown";

    const match = rawType.match(/^(.+?)\s*-\s*(.+)$/);
    let localizedType: string;

    if (match) {
      const domainKey = match[1].toLowerCase().replace(" ", "_");
      const devClassKey = match[2].toLowerCase();

      const domainName =
        this.hass!.localize(`component.${domainKey}.entity_component._.name`) ||
        match[1];

      let deviceClassName =
        this.hass!.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${domainKey}.${devClassKey}`
        ) || match[2];

      deviceClassName =
        deviceClassName.charAt(0).toUpperCase() + deviceClassName.slice(1);

      localizedType = `${domainName} – ${deviceClassName}`;
    } else {
      let only =
        this.hass!.localize(`component.${rawType}.entity_component._.name`) ||
        rawType;

      only = only.charAt(0).toUpperCase() + only.slice(1);
      localizedType = only;
    }

    return html`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${goBackHandler}>
            <ha-svg-icon .path=${mdiChevronLeft}></ha-svg-icon>
          </mwc-icon-button>
          <span slot="title">${localizedType}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .config=${subConfigs?.[idx] || {}}
        .getSchema=${editorKey}
        @config-changed=${itemChangedHandler}
      ></item-editor>
    `;
  }

  private _renderSubElementEditorByKey(
    editorKey: "domain" | "alert" | "cover" | "sensor"
  ) {
    return this._renderSubElementEditor(
      editorKey,
      () => this._goBackByKey(editorKey),
      (ev: CustomEvent<LovelaceCardConfig>) =>
        this._itemChangedByKey(ev, editorKey)
    );
  }

  private _goBackByKey(editorKey: "domain" | "alert" | "cover" | "sensor") {
    switch (editorKey) {
      case "domain":
        this._subElementEditorDomain = undefined;
        break;
      case "alert":
        this._subElementEditorAlert = undefined;
        break;
      case "cover":
        this._subElementEditorCover = undefined;
        break;
      case "sensor":
        this._subElementEditorSensor = undefined;
        break;
    }
  }

  private _itemChangedByKey(
    ev: CustomEvent<LovelaceCardConfig>,
    editorKey: "domain" | "alert" | "cover" | "sensor"
  ) {
    let editorTarget: SubElementEditorConfig | undefined;
    switch (editorKey) {
      case "domain":
        editorTarget = this._subElementEditorDomain;
        break;
      case "alert":
        editorTarget = this._subElementEditorAlert;
        break;
      case "cover":
        editorTarget = this._subElementEditorCover;
        break;
      case "sensor":
        editorTarget = this._subElementEditorSensor;
        break;
    }
    const customizationKey = `customization_${editorKey}` as
      | "customization_domain"
      | "customization_alert"
      | "customization_cover"
      | "customization_sensor";
    this._itemChanged(ev, editorTarget, customizationKey);
  }

  private _itemChanged(
    ev: CustomEvent<LovelaceCardConfig>,
    editorTarget: { index?: number } | undefined,
    customizationKey:
      | "customization_domain"
      | "customization_alert"
      | "customization_cover"
      | "customization_sensor"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = editorTarget?.index;
    if (index != undefined) {
      const customization = [...this._config[customizationKey]];
      customization[index] = ev.detail;

      fireEvent(this, "config-changed", {
        config: { ...this._config, [customizationKey]: customization },
      });
    }
  }

  public get toggleSelectOptions(): SelectOption[] {
    return this._selectOptions("toggle");
  }

  public get AllSelectOptions(): SelectOption[] {
    return this._selectOptions("all");
  }

  public get binarySelectOptions(): SelectOption[] {
    return this._selectOptions("binary");
  }

  public get coverSelectOptions(): SelectOption[] {
    return this._selectOptions("cover");
  }

  public get sensorSelectOptions(): SelectOption[] {
    return this._selectOptions("sensor");
  }

  private _selectOptions(
    kind: "toggle" | "all" | "binary" | "cover" | "sensor"
  ): SelectOption[] {
    const area = this._config?.area || "";
    switch (kind) {
      case "toggle":
        return this._buildToggleOptions(
          this._toggleDomainsForArea(
            area,
            this.hass.entities,
            this.hass.devices
          ),
          this._config?.toggle_domains ||
            this._toggleDomainsForArea(
              area,
              this.hass.entities,
              this.hass.devices
            )
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(area, this.hass.entities, this.hass.devices),
          this._config?.popup_domains ||
            this._allDomainsForArea(area, this.hass.entities, this.hass.devices)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(
            area,
            this.hass.entities,
            this.hass.devices
          ),
          this._config?.alert_classes ||
            this._binaryClassesForArea(
              area,
              this.hass.entities,
              this.hass.devices
            )
        );
      case "cover":
        return this._buildCoverOptions(
          this._coverClassesForArea(
            area,
            this.hass.entities,
            this.hass.devices
          ),
          this._config?.cover_classes ||
            this._coverClassesForArea(
              area,
              this.hass.entities,
              this.hass.devices
            )
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(
            area,
            this._numericDeviceClasses,
            this.hass.entities,
            this.hass.devices
          ),
          this._config?.sensor_classes ||
            this._sensorClassesForArea(
              area,
              this._numericDeviceClasses,
              this.hass.entities,
              this.hass.devices
            )
        );
    }
  }

  public get entityOptions(): SelectOption[] {
    return this._entityOptions;
  }

  private _domainIcon(
    domain: string,
    state: string = "on",
    deviceClass?: string
  ): string {
    const icons: any = DOMAIN_ICONS as any;
    if (domain in icons) {
      const def = icons[domain];
      if (typeof def === "string") return def;
      if (deviceClass && def[deviceClass])
        return (
          def[deviceClass][state === "off" ? "off" : "on"] || def[deviceClass]
        );
      return def[state === "off" ? "off" : "on"] || Object.values(def)[0];
    }
    return mdiHelpCircle;
  }

  private _groupAllEntitiesByDomain(): Array<{
    domain: string;
    entities: string[];
  }> {
    const visibleMap: Record<string, string[]> = {};
    const ids = (this.entityOptions || []).map((o) => o.value);
    for (const id of ids) {
      const d = computeDomain(id);
      if (!visibleMap[d]) visibleMap[d] = [];
      visibleMap[d].push(id);
    }

    const hidden = this._hiddenEntitiesByDomain();
    const domains = Array.from(
      new Set([...Object.keys(visibleMap), ...Object.keys(hidden)])
    );

    const states = this.hass?.states || {};
    const cmpByFriendly = (this as any).compareByFriendlyName
      ? (this as any).compareByFriendlyName(states, this.hass!.locale.language)
      : (a: string, b: string) => a.localeCompare(b);

    return domains
      .sort((a, b) => a.localeCompare(b))
      .map((domain) => {
        const merged = new Set<string>([
          ...(visibleMap[domain] || []),
          ...(hidden[domain] || []),
        ]);
        return { domain, entities: Array.from(merged).sort(cmpByFriendly) };
      });
  }

  private _domainLabel(domain: string): string {
    return (
      this.hass?.localize?.(`component.${domain}.entity_component._.name`) ||
      domain
    );
  }

  private _getDeviceClassLabel(domain: string, deviceClass: string): string {
    if (!deviceClass || deviceClass === "other")
      return (
        this.hass.localize("ui.dialogs.helper_settings.generic.other") ??
        "Other"
      );
    const key = `ui.dialogs.entity_registry.editor.device_classes.${domain}.${deviceClass}`;
    return this.hass.localize(key) || deviceClass;
  }

  private _groupByDeviceClass(domain: string, entities: string[]) {
    const states = this.hass?.states || {};
    const map: Record<string, string[]> = {};
    for (const id of entities) {
      const dc = (states[id]?.attributes?.device_class as string) || "";
      if (!dc) continue;
      if (!map[dc]) map[dc] = [];
      map[dc].push(id);
    }
    const cmpByFriendly = (this as any).compareByFriendlyName
      ? (this as any).compareByFriendlyName(states, this.hass!.locale.language)
      : (a: string, b: string) => a.localeCompare(b);
    const deviceClasses = Object.keys(map).sort((a, b) => a.localeCompare(b));
    return deviceClasses.map((dc) => ({
      deviceClass: dc,
      label: this._getDeviceClassLabel(domain, dc),
      entities: map[dc].slice().sort(cmpByFriendly),
    }));
  }

  private _hiddenEntitiesByDomain(): Record<string, string[]> {
    const res: Record<string, string[]> = {};
    const hidden = Array.isArray(this._config?.hidden_entities)
      ? (this._config!.hidden_entities as string[])
      : [];
    if (hidden.length === 0) return res;

    const entitiesReg = (this.hass as any)?.entities || {};
    const devices = (this.hass as any)?.devices || {};
    const areasArrAll = this.hass?.areas ? Object.values(this.hass.areas) : [];

    const areaFilter = this._config?.area;
    const floorFilter = this._config?.floor;
    const labelFilter = this._config?.label;

    const areasSel = areaFilter
      ? Array.isArray(areaFilter)
        ? areaFilter
        : [areaFilter]
      : [];
    const floorsSel = floorFilter
      ? Array.isArray(floorFilter)
        ? floorFilter
        : [floorFilter]
      : [];
    const labelsSel = labelFilter
      ? Array.isArray(labelFilter)
        ? labelFilter
        : [labelFilter]
      : [];

    for (const id of hidden) {
      const domain = computeDomain(id);
      const reg = (entitiesReg as any)[id];
      const dev = reg?.device_id ? (devices as any)[reg.device_id] : undefined;

      const hasAnyArea = reg?.area_id != null || dev?.area_id != null;
      if (!hasAnyArea) continue;

      if (labelsSel.length) {
        const ok =
          (Array.isArray(reg?.labels) &&
            reg.labels.some((l: string) => labelsSel.includes(l))) ||
          (Array.isArray(dev?.labels) &&
            dev.labels.some((l: string) => labelsSel.includes(l)));
        if (!ok) continue;
      }

      if (areasSel.length) {
        const ok =
          (reg?.area_id && areasSel.includes(reg.area_id)) ||
          (dev?.area_id && areasSel.includes(dev.area_id));
        if (!ok) continue;
      }

      if (floorsSel.length) {
        const regAreaOk =
          reg?.area_id &&
          areasArrAll.some(
            (a) =>
              a.area_id === reg.area_id &&
              a.floor_id &&
              floorsSel.includes(a.floor_id as any)
          );
        const devAreaOk =
          dev?.area_id &&
          areasArrAll.some(
            (a) =>
              a.area_id === dev.area_id &&
              a.floor_id &&
              floorsSel.includes(a.floor_id as any)
          );
        if (!regAreaOk && !devAreaOk) continue;
      }

      if (!res[domain]) res[domain] = [];
      res[domain].push(id);
    }

    return res;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const possibleToggleDomains = this._toggleDomainsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    );

    const possibleAlertClasses = this._binaryClassesForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    );
    const possibleCoverClasses = this._coverClassesForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    );

    const possibleDomains = this._allDomainsForArea(
      this._config.area || "",
      this.hass.entities,
      this.hass.devices
    );

    const schema = this._schema(
      this._activeTab,
      this._config.design || "V1",
      this._config.display_type,
      this.hass.locale.language
    );

    const binaryschema = this._binaryschema(this.binarySelectOptions);

    const coverschema = this._coverschema(this.coverSelectOptions);

    const sensorschema = this._sensorschema(this.sensorSelectOptions);

    const toggleschema = this._toggleschema(this.toggleSelectOptions);

    const popupschema = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    );

    const data = {
      alert_classes: possibleAlertClasses,
      cover_classes: possibleCoverClasses,
      sensor_classes: DEVICE_CLASSES.sensor,
      toggle_domains: possibleToggleDomains,
      popup_domains: possibleDomains,
      ...this._config,
    };

    if (this._subElementEditorDomain)
      return this._renderSubElementEditorByKey("domain");
    if (this._subElementEditorAlert)
      return this._renderSubElementEditorByKey("alert");
    if (this._subElementEditorCover)
      return this._renderSubElementEditorByKey("cover");
    if (this._subElementEditorSensor)
      return this._renderSubElementEditorByKey("sensor");
    if (this._subElementEditorCustomButton)
      return this._renderSubElementEditorCustomButton();

    return html`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "config"}
          @click=${() => (this._activeTab = "config")}
        >
          ${this.hass.localize(
            "ui.panel.lovelace.editor.edit_card.tab_config"
          ) ?? "Configuration"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "appearance"}
          @click=${() => (this._activeTab = "appearance")}
        >
          ${this.hass.localize(
            "ui.panel.lovelace.editor.card.map.appearance"
          ) || "Appearance"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => (this._activeTab = "actions")}
        >
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => (this._activeTab = "style")}
        >
          Style
        </ha-tab-group-tab>
      </ha-tab-group>

      ${this._activeTab === "style"
        ? html`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>card</b>: Card Background/Border</li>
                <li><b>icon</b>: Main Area Icon</li>
                <li><b>name</b>: Area Name</li>
                <li><b>domain</b>: Standard Buttons (Light, Switch...)</li>
                <li><b>cover</b>: Cover Buttons</li>
                <li><b>alert</b>: Alert Chips</li>
                <li><b>image</b>: Area Picture</li>
                <li><b>camera</b>: Camera View</li>
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
card:
  background-color: rgba(255, 0, 0, 0.1);
  border: none;              
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
name:
  font-size: 15px;  
domain:
  --mdc-icon-size: 24px;
image:
  opacity: 0.5;  
              </pre
              >
            </ha-alert>
          `
        : nothing}

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._activeTab === "config"
        ? html`
            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${mdiAlert}></ha-svg-icon>
                ${this.computeLabel({ name: "alert_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${data}
                  .schema=${binaryschema}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
                <alert-items-editor
                  .hass=${this.hass}
                  .customization_alert=${this._config.customization_alert}
                  .SelectOptions=${this.binarySelectOptions}
                  @edit-item=${this._edit_itemAlert}
                  @config-changed=${this._customizationChangedAlert}
                >
                </alert-items-editor>
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${mdiGarage}></ha-svg-icon>
                ${this.computeLabel({ name: "cover_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${data}
                  .schema=${coverschema}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
                <cover-items-editor
                  .hass=${this.hass}
                  .customization_cover=${this._config.customization_cover}
                  .SelectOptions=${this.coverSelectOptions}
                  @edit-item=${this._edit_itemCover}
                  @config-changed=${this._customizationChangedCover}
                >
                </cover-items-editor>
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${mdiChartBoxMultiple}></ha-svg-icon>
                ${this.computeLabel({ name: "sensor_classes" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${data}
                  .schema=${sensorschema}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
                <sensor-items-editor
                  .hass=${this.hass}
                  .customization_sensor=${this._config.customization_sensor}
                  .SelectOptions=${this.sensorSelectOptions}
                  @edit-item=${this._edit_itemSensor}
                  @config-changed=${this._customizationChangedSensor}
                >
                </sensor-items-editor>
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main" .name="toggle_domains">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${mdiCube}></ha-svg-icon>
                ${this.computeLabel({ name: "toggle_domains" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${data}
                  .schema=${toggleschema}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
                <domain-items-editor
                  .hass=${this.hass}
                  .customization_domain=${this._config.customization_domain}
                  .SelectOptions=${this.toggleSelectOptions}
                  @edit-item=${this._edit_itemDomain}
                  @config-changed=${this._customizationChangedDomain}
                >
                </domain-items-editor>
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${mdiGestureTapButton}></ha-svg-icon>
                Custom Buttons
              </div>
              <div class="content">
                <custom-buttons-editor
                  .hass=${this.hass}
                  .custom_buttons=${this._config!.custom_buttons}
                  @config-changed=${this._customizationChangedCustomButtons}
                  @edit-item=${this._edit_itemCustomButton}
                >
                </custom-buttons-editor>
              </div>
            </ha-expansion-panel>

            <ha-expansion-panel outlined class="main" .name="popup">
              <div slot="header" role="heading" aria-level="3">
                <ha-svg-icon .path=${mdiViewDashboardVariant}></ha-svg-icon>
                ${this.computeLabel({ name: "popup" })}
              </div>
              <div class="content">
                <ha-form
                  .hass=${this.hass}
                  .data=${data}
                  .schema=${popupschema}
                  .computeLabel=${this.computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>

                <ha-expansion-panel outlined class="main">
                  <div slot="header" role="heading" aria-level="3">
                    <ha-svg-icon .path=${mdiEyeOff}></ha-svg-icon>
                    ${this.computeLabel({ name: "hidden_entities" })}
                  </div>
                  <div class="content">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
                        category_filter: this._config?.category_filter,
                      }}
                      .schema=${[
                        {
                          name: "category_filter",
                          selector: {
                            select: {
                              options: [
                                "config",
                                "diagnostic",
                                "config+diagnostic",
                              ],
                              mode: "dropdown",
                            },
                          },
                        },
                      ]}
                      .computeLabel=${this.computeLabel}
                      @value-changed=${(ev: CustomEvent) =>
                        this._hiddenCategoryChanged(ev)}
                    ></ha-form>
                    ${this._groupAllEntitiesByDomain().map(
                      (group) => html`
                        <ha-expansion-panel outlined class="domain-panel">
                          <div slot="header" class="domain-header">
                            <ha-svg-icon
                              .path=${this._domainIcon(group.domain, "on")}
                            ></ha-svg-icon>
                            <span class="domain-title"
                              >${this._domainLabel(group.domain)}</span
                            >
                          </div>
                          <div class="content">
                            ${["binary_sensor", "cover"].includes(group.domain)
                              ? this._groupByDeviceClass(
                                  group.domain,
                                  group.entities
                                ).map(
                                  (sub) => html`
                                    <ha-expansion-panel
                                      outlined
                                      class="domain-panel"
                                    >
                                      <div slot="header" class="dc-header">
                                        <ha-svg-icon
                                          .path=${this._domainIcon(
                                            group.domain,
                                            "on",
                                            sub.deviceClass
                                          )}
                                        ></ha-svg-icon>
                                        <span class="dc-title"
                                          >${sub.label}</span
                                        >
                                      </div>
                                      <div class="content">
                                        ${sub.entities.map(
                                          (id) => html`
                                            <div class="entity-row">
                                              <span class="entity-name">
                                                ${this.hass.states[id]
                                                  ?.attributes?.friendly_name ||
                                                id}
                                              </span>
                                              <ha-icon-button
                                                .path=${this._isHiddenEntity(id)
                                                  ? mdiEyeOff
                                                  : mdiEye}
                                                .label=${this._isHiddenEntity(
                                                  id
                                                )
                                                  ? this.hass.localize(
                                                      "ui.common.show"
                                                    ) ?? "Show"
                                                  : this.hass.localize(
                                                      "ui.common.hide"
                                                    ) ?? "Hide"}
                                                @click=${() =>
                                                  this._toggleEntityHidden(id)}
                                              ></ha-icon-button>
                                              <ha-icon-button
                                                .path=${this._isExcludedEntity(
                                                  id
                                                )
                                                  ? mdiEyeOffOutline
                                                  : mdiEyeOutline}
                                                .label=${this._isExcludedEntity(
                                                  id
                                                )
                                                  ? "Include"
                                                  : "Exclude"}
                                                @click=${() =>
                                                  this._toggleEntityExcluded(
                                                    id
                                                  )}
                                              ></ha-icon-button>
                                            </div>
                                          `
                                        )}
                                      </div>
                                    </ha-expansion-panel>
                                  `
                                )
                              : group.entities.map(
                                  (id) => html`
                                    <div class="entity-row">
                                      <span class="entity-name">
                                        ${this.hass.states[id]?.attributes
                                          ?.friendly_name || id}
                                      </span>
                                      <ha-icon-button
                                        .path=${this._isHiddenEntity(id)
                                          ? mdiEyeOff
                                          : mdiEye}
                                        .label=${this._isHiddenEntity(id)
                                          ? this.hass.localize(
                                              "ui.common.show"
                                            ) ?? "Show"
                                          : this.hass.localize(
                                              "ui.common.hide"
                                            ) ?? "Hide"}
                                        @click=${() =>
                                          this._toggleEntityHidden(id)}
                                      ></ha-icon-button>
                                      <ha-icon-button
                                        .path=${this._isExcludedEntity(id)
                                          ? mdiEyeOffOutline
                                          : mdiEyeOutline}
                                        .label=${this._isExcludedEntity(id)
                                          ? "Include"
                                          : "Exclude"}
                                        @click=${() =>
                                          this._toggleEntityExcluded(id)}
                                      ></ha-icon-button>
                                    </div>
                                  `
                                )}
                          </div>
                        </ha-expansion-panel>
                      `
                    )}
                  </div>
                </ha-expansion-panel>
              </div>
            </ha-expansion-panel>
          `
        : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    select {
      padding: 5px;
      font-size: 14px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .main {
      --ha-card-border-radius: 6px;
      border-radius: 6px;
      margin-top: 16px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .content {
      padding: 12px 4px;
    }
    .back-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      gap: 0.5em;
    }
    ha-icon {
      display: flex;
    }
    ha-tab-group {
      display: block;
      margin-bottom: 16px;
      padding: 0 1em;
    }
    ha-tab-group-tab {
      flex: 1;
    }
    ha-tab-group-tab::part(base) {
      width: 100%;
      justify-content: center;
    }
    .header {
      margin-bottom: 0.5em;
    }
    .entity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 0;
    }
    .entity-name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .domain-panel {
      margin-top: 6px;
    }
    .domain-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .domain-header ha-icon {
      --mdc-icon-size: 20px;
    }
    .dc-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dc-header ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
}
