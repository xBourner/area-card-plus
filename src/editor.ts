import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  computeDomain,
  HomeAssistant,
  LovelaceCardEditor,
  EntityRegistryEntry,
  LovelaceCardConfig,
  caseInsensitiveStringCompare,
  getSensorNumericDeviceClasses,
  UiAction,
  fireEvent,
  SelectOption,
  Schema,
  SubElementEditorConfig,
} from "./ha";
import memoizeOne from "memoize-one";
import {
  DEVICE_CLASSES,
  TOGGLE_DOMAINS,
  CLIMATE_DOMAINS,
  DOMAIN_ICONS,
} from "./helpers";
import {
  mdiAlert,
  mdiGarage,
  mdiChartBoxMultiple,
  mdiCube,
  mdiViewDashboardVariant,
  mdiEye,
  mdiEyeOff,
  mdiGestureTapButton,
  mdiEyeOutline,
  mdiEyeOffOutline,
} from "@mdi/js";
import "./items-editor";
import "./item-editor";
import { computeLabelCallback } from "./translations";

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
  @state() private _config?: LovelaceCardConfig;
  @state() public _entities?: EntityRegistryEntry[];
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

  private computeLabel = memoizeOne((schema: Schema): string => {
    return computeLabelCallback(this.hass, schema);
  });

  private _schema = memoizeOne(
    (designVersion: string, displayType: AreaCardDisplayType) => {
      const localize = (key: string) => this.hass!.localize(key) || key;
      const actions: UiAction[] = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none",
      ];

      return [
        { name: "area", selector: { area: {} } },

        {
          name: "appearance",
          flatten: true,
          type: "expandable",
          icon: "mdi:palette",
          schema: [
            {
              name: "",
              type: "grid",
              schema: [
                { name: "area_name", selector: { text: {} } },
                {
                  name: "area_name_color",
                  selector: {
                    ui_color: { default_color: "state", include_state: true },
                  },
                },
                { name: "area_icon", selector: { icon: {} } },
                {
                  name: "area_icon_color",
                  selector: {
                    ui_color: { default_color: "state", include_state: true },
                  },
                },
                {
                  name: "display_type",
                  selector: {
                    select: {
                      options: [
                        "icon",
                        "picture",
                        "icon & picture",
                        "camera",
                        "camera & icon",
                      ].map((value) => {
                        const keyForPart = (part: string) => {
                          const p = part.trim().toLowerCase();
                          if (p === "icon")
                            return "ui.panel.lovelace.editor.card.generic.icon";
                          if (p === "picture" || p === "image")
                            return "ui.components.selectors.image.image";
                          if (p === "camera")
                            return `ui.panel.lovelace.editor.card.area.display_type_options.camera`;
                          return `ui.panel.lovelace.editor.card.area.display_type_options.${part}`;
                        };

                        const parts = value.split(" & ").map((p) => p.trim());
                        const label = parts
                          .map((p) => localize(keyForPart(p)) || p)
                          .join(" & ");

                        return { value, label };
                      }),
                      mode: "dropdown",
                    },
                  },
                },
                ...(displayType === "camera" || displayType === "camera & icon"
                  ? ([
                      {
                        name: "camera_view",
                        selector: {
                          select: {
                            options: ["auto", "live"].map((value) => ({
                              value,
                              label: localize(
                                `ui.panel.lovelace.editor.card.generic.camera_view_options.${value}`
                              ),
                            })),
                            mode: "dropdown",
                          },
                        },
                      },
                    ] as const satisfies readonly Schema[])
                  : []),
              ],
            },
            { name: "mirrored", selector: { boolean: {} } },
            {
              name: "layout",
              required: true,
              selector: {
                select: {
                  mode: "box",
                  options: ["vertical", "horizontal"].map((value) => ({
                    label: this.hass!.localize(
                      `ui.panel.lovelace.editor.card.tile.content_layout_options.${value}`
                    ),
                    value,
                    image: {
                      src: `/static/images/form/tile_content_layout_${value}.svg`,
                      src_dark: `/static/images/form/tile_content_layout_${value}_dark.svg`,
                      flip_rtl: true,
                    },
                  })),
                },
              },
            },
            {
              name: "design",
              selector: {
                select: { mode: "box", options: ["V1", "V2"] },
              },
            },
            ...(designVersion === "V2"
              ? ([
                  {
                    name: "v2_color",
                    selector: {
                      color_rgb: {
                        default_color: "state",
                        include_state: true,
                      },
                    },
                  },
                ] as const)
              : []),
            { name: "theme", required: false, selector: { theme: {} } },
            {
              name: "css",
              flatten: true,
              type: "expandable",
              icon: "mdi:palette",
              schema: [
                { name: "icon_css", selector: { template: {} } },
                { name: "name_css", selector: { template: {} } },
              ],
            },
            { name: "tap_action", selector: { ui_action: { actions } } },
            { name: "double_tap_action", selector: { ui_action: { actions } } },
            { name: "hold_action", selector: { ui_action: { actions } } },
          ],
        },
      ];
    }
  );

  private _binaryschema = memoizeOne((binaryClasses: SelectOption[]) => [
    {
      name: "alert_classes",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: binaryClasses,
        },
      },
    },
    {
      name: "alert_color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
    { name: "alert_css", selector: { template: {} } },
  ]);

  private _coverschema = memoizeOne((CoverClasses: SelectOption[]) => [
    {
      name: "cover_classes",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: CoverClasses,
        },
      },
    },
    {
      name: "cover_color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
    { name: "cover_css", selector: { template: {} } },
  ]);

  private _sensorschema = memoizeOne((sensorClasses: SelectOption[]) => [
    {
      name: "",
      type: "grid",
      schema: [
        { name: "show_sensor_icons", selector: { boolean: {} } },
        { name: "wrap_sensor_icons", selector: { boolean: {} } },
      ],
    },
    {
      name: "sensor_classes",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: sensorClasses,
        },
      },
    },
    {
      name: "sensor_color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
  ]);

  private _toggleschema = memoizeOne((toggleDomains: SelectOption[]) => [
    {
      name: "toggle_domains",
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: toggleDomains,
        },
      },
    },
    {
      name: "domain_color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
    { name: "domain_css", selector: { template: {} } },
    { name: "show_active", selector: { boolean: {} } },
  ]);

  private _popupschema = memoizeOne(
    (allDomains: SelectOption[], allEntities: SelectOption[]) => {
      const name = this.computeLabel({ name: "name" });
      const state = this.computeLabel({ name: "state" });
      return [
        {
          name: "columns",
          selector: { number: { min: 1, max: 4, mode: "box" } },
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

  private _binaryClassesForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "binary_sensor")
  );

  private _coverClassesForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "cover")
  );

  private _sensorClassesForArea = memoizeOne(
    (area: string, numericDeviceClasses?: string[]): string[] =>
      this._classesForArea(area, "sensor", numericDeviceClasses)
  );

  private _toggleDomainsForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "toggle")
  );

  private _allDomainsForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "all")
  );

  private _classesForArea(
    area: string,
    domain: "sensor" | "binary_sensor" | "cover" | "toggle" | "all",
    numericDeviceClasses?: string[] | undefined
  ): string[] {
    let entities;

    if (domain === "toggle") {
      entities = Object.values(this.hass!.entities).filter(
        (e) =>
          (TOGGLE_DOMAINS.includes(computeDomain(e.entity_id)) ||
            CLIMATE_DOMAINS.includes(computeDomain(e.entity_id))) &&
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );

      return [
        ...new Set(entities.map((e) => computeDomain(e.entity_id))),
      ] as string[];
    } else if (domain === "all") {
      const extraEntities = this._config?.extra_entities || [];

      let entities = Object.values(this.hass!.entities).filter(
        (e) =>
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );

      const extraEntityObjects = extraEntities
        .map((entityId: string) => this.hass!.states[entityId])
        .filter((stateObj: string) => stateObj !== undefined);

      entities = [...entities, ...extraEntityObjects];

      return [...new Set(entities.map((e) => computeDomain(e.entity_id)))];
    } else {
      entities = Object.values(this.hass!.entities).filter(
        (e) =>
          computeDomain(e.entity_id) === domain &&
          !e.entity_category &&
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );

      const classes = entities
        .map(
          (e) => this.hass!.states[e.entity_id]?.attributes.device_class || ""
        )
        .filter(
          (c) =>
            c &&
            (domain !== "sensor" ||
              !numericDeviceClasses ||
              numericDeviceClasses.includes(c))
        );

      return [...new Set(classes)] as string[];
    }
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

    options.sort((a, b) =>
      caseInsensitiveStringCompare(a.label, b.label, this.hass!.locale.language)
    );

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
        const possibleToggleDomains = this._toggleDomainsForArea(currentArea);
        const possibleAlertClasses = this._binaryClassesForArea(currentArea);
        const possibleCoverClasses = this._coverClassesForArea(currentArea);
        const possibleDomains = this._allDomainsForArea(currentArea);

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
              ...(this._config || ({} as any)),
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

    this._entityOptions = Object.values(this.hass.entities)
      .filter(
        (e) =>
          !e.hidden &&
          currentPopupDomains.includes(computeDomain(e.entity_id)) &&
          (e.area_id === currentArea ||
            (e.device_id &&
              this.hass!.devices[e.device_id]?.area_id === currentArea))
      )
      .map((e) => ({
        value: e.entity_id,
        label: e.entity_id,
      }))
      .sort((a, b) => a.value.localeCompare(b.value));

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
      ...(this._config || ({} as any)),
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
      ...(this._config || ({} as any)),
      excluded_entities,
    } as LovelaceCardConfig;
    fireEvent(this, "config-changed", { config: this._config });
  };

  private _hiddenCategoryChanged(ev: CustomEvent) {
    const val = ev.detail?.value?.category_filter;
    this._config = {
      ...(this._config || ({} as any)),
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
            <ha-icon icon="mdi:chevron-left"></ha-icon>
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

  private _itemChangedCustomButton(ev: CustomEvent<any>): void {
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
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title">${localizedType}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
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
    const prop = `_subElementEditor${
      editorKey.charAt(0).toUpperCase() + editorKey.slice(1)
    }` as keyof this;
    (this as any)[prop] = undefined;
  }

  private _itemChangedByKey(
    ev: CustomEvent<LovelaceCardConfig>,
    editorKey: "domain" | "alert" | "cover" | "sensor"
  ) {
    const prop = `_subElementEditor${
      editorKey.charAt(0).toUpperCase() + editorKey.slice(1)
    }` as keyof this;
    const editorTarget = (this as any)[prop] as { index?: number } | undefined;
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
          this._toggleDomainsForArea(area),
          this._config?.toggle_domains || this._toggleDomainsForArea(area)
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(area),
          this._config?.popup_domains || this._allDomainsForArea(area)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(area),
          this._config?.alert_classes || this._binaryClassesForArea(area)
        );
      case "cover":
        return this._buildCoverOptions(
          this._coverClassesForArea(area),
          this._config?.cover_classes || this._coverClassesForArea(area)
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(area),
          this._config?.sensor_classes || this._sensorClassesForArea(area)
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
    return "mdi:help-circle";
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
      this._config.area || ""
    );

    const possibleAlertClasses = this._binaryClassesForArea(
      this._config.area || ""
    );
    const possibleCoverClasses = this._coverClassesForArea(
      this._config.area || ""
    );

    const possibleDomains = this._allDomainsForArea(this._config.area || "");

    const schema = this._schema(
      this._config.design || "V1",
      this._config.display_type
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
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

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
                .data=${{ category_filter: this._config?.category_filter }}
                .schema=${[
                  {
                    name: "category_filter",
                    selector: {
                      select: {
                        options: ["config", "diagnostic", "config+diagnostic"],
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
                      <ha-icon
                        .icon=${this._domainIcon(group.domain, "on")}
                      ></ha-icon>
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
                              <ha-expansion-panel outlined class="domain-panel">
                                <div slot="header" class="dc-header">
                                  <ha-icon
                                    .icon=${this._domainIcon(
                                      group.domain,
                                      "on",
                                      sub.deviceClass
                                    )}
                                  ></ha-icon>
                                  <span class="dc-title">${sub.label}</span>
                                </div>
                                <div class="content">
                                  ${sub.entities.map(
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
                                    ? this.hass.localize("ui.common.show") ??
                                      "Show"
                                    : this.hass.localize("ui.common.hide") ??
                                      "Hide"}
                                  @click=${() => this._toggleEntityHidden(id)}
                                ></ha-icon-button>
                                <ha-icon-button
                                  .path=${this._isExcludedEntity(id)
                                    ? mdiEyeOffOutline
                                    : mdiEyeOutline}
                                  .label=${this._isExcludedEntity(id)
                                    ? "Include"
                                    : "Exclude"}
                                  @click=${() => this._toggleEntityExcluded(id)}
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
