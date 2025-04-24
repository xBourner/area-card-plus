import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  computeDomain,
  HomeAssistant,
  LovelaceCardEditor,
  LovelaceCardConfig,
} from "custom-card-helpers";
import memoizeOne from "memoize-one";
import {
  caseInsensitiveStringCompare,
  getSensorNumericDeviceClasses,
  HassCustomElement,
  SubElementConfig,
  Settings,
  fireEvent,
  EntityRegistryEntry,
  UiAction,
} from "./helpers";
import {
  DEVICE_CLASSES,
  TOGGLE_DOMAINS,
  CLIMATE_DOMAINS,
  domainOrder,
} from "./card";
import {
  mdiAlert,
  mdiGarage,
  mdiChartBoxMultiple,
  mdiCube,
  mdiViewDashboardVariant,
} from "@mdi/js";
import "./items-editor";
import "./item-editor";

export interface CardConfig extends LovelaceCardConfig {
  area: string;
  navigation_path?: string;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;

  default?: any;
  type?: string;
}

interface SubElementEditor {
  index?: number;
}

@customElement("area-card-plus-editor")
export class AreaCardPlusEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() public _entities?: EntityRegistryEntry[];
  @state() private _numericDeviceClasses?: string[];
  @state() private _subElementEditorDomain: SubElementConfig | undefined =
    undefined;
  @state() private _subElementEditorAlert: SubElementConfig | undefined =
    undefined;
  @state() private _subElementEditorCover: SubElementConfig | undefined =
    undefined;
  @state() private _subElementEditorSensor: SubElementConfig | undefined =
    undefined;
  //   @state() private _subElementEditorPopup: SubElementConfig | undefined = undefined;

  private _schema = memoizeOne((showCamera: boolean, designVersion: string) => {
    const localize = (key: string) => this.hass!.localize(key) || key;
    const actions: UiAction[] = [
      "more-info",
      "navigate",
      "url",
      "perform-action",
      "none",
    ];

    const icons = [
      {
        value: "icon",
        label: localize("ui.panel.lovelace.editor.card.generic.icon"),
      },
      {
        value: "image",
        label: localize("ui.components.selectors.image.image"),
      },
      {
        value: "icon + image",
        label: `${localize(
          "ui.panel.lovelace.editor.card.generic.icon"
        )} & ${localize("ui.components.selectors.image.image")}`,
      },
    ];

    return [
      { name: "area", selector: { area: {} } },
      {
        name: "appearance",
        flatten: true,
        type: "expandable",
        icon: "mdi:palette",
        schema: [
          { name: "theme", required: false, selector: { theme: {} } },
          {
            name: "layout",
            required: true,
            selector: {
              select: {
                mode: "box",
                options: ["vertical", "horizontal"].map((value) => ({
                  label: localize(
                    `ui.panel.lovelace.editor.card.tile.content_layout_options.${value}`
                  ),
                  value,
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
                    color_rgb: { default_color: "state", include_state: true },
                  },
                },
              ] as const)
            : []),
          { name: "mirrored", selector: { boolean: {} } },
          { name: "show_camera", required: false, selector: { boolean: {} } },
          ...(showCamera
            ? ([
                {
                  name: "camera_view",
                  selector: { select: { options: ["auto", "live"] } },
                },
              ] as const)
            : []),
          {
            name: "show_icon",
            selector: { select: { options: icons, mode: "dropdown" } },
          },
          { name: "area_icon", selector: { icon: {} } },
          {
            name: "area_icon_color",
            selector: {
              ui_color: { default_color: "state", include_state: true },
            },
          },
          { name: "area_name", selector: { text: {} } },
          {
            name: "area_name_color",
            selector: {
              ui_color: { default_color: "state", include_state: true },
            },
          },
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
  });

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
    (allDomains: SelectOption[], allEntities: SelectOption[]) => [
      {
        name: "columns",
        selector: { number: { min: 1, max: 4, mode: "box" } },
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
        name: "hidden_entities",
        flatten: true,
        type: "expandable",
        icon: "mdi:eye-off",
        schema: [
          {
            name: "hidden_entities",
            selector: {
              select: {
                reorder: true,
                multiple: true,
                options: allEntities,
              },
            },
          },
        ],
      },
      {
        name: "extra_entities",
        flatten: true,
        type: "expandable",
        icon: "mdi:eye-plus",
        schema: [
          { name: "extra_entities", selector: { entity: { multiple: true } } },
        ],
      },
      { name: "hide_unavailable", selector: { boolean: {} } },
    ]
  );

  protected async firstUpdated(): Promise<void> {
    if (
      !customElements.get("ha-form") ||
      !customElements.get("hui-action-editor")
    ) {
      (
        customElements.get("hui-button-card") as HassCustomElement
      )?.getConfigElement();
    }

    if (!customElements.get("ha-entity-picker")) {
      (
        customElements.get("hui-entities-card") as HassCustomElement
      )?.getConfigElement();
    }
  }

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

      return [...new Set(entities.map((e) => computeDomain(e.entity_id)))];
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

      return [...new Set(classes)];
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

  setConfig(config: CardConfig): void {
    this._config = {
      ...config,
      columns: config.columns || 4,
      mirrored: config.mirrored || false,
      customization_domain: config.customization_domain || [],
      customization_alert: config.customization_alert || [],
      customization_cover: config.customization_cover || [],
      customization_sensor: config.customization_sensor || [],
      //    customization_popup: config.customization_popup || [],
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
        | CardConfig
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

        const sortedDomains = possibleDomains.sort(
          (a, b) => domainOrder.indexOf(a) - domainOrder.indexOf(b)
        );

        this._config.toggle_domains = [...sortedToggleDomains];
        this._config.alert_classes = [...possibleAlertClasses];
        this._config.cover_classes = [...possibleCoverClasses];
        this._config.popup_domains = [...sortedDomains];
        this._config.customization_domain = [];
        this._config.customization_alert = [];
        this._config.customization_cover = [];
        this._config.customization_sensor = [];

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

  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "theme":
        return `${this.hass!.localize(
          "ui.panel.lovelace.editor.card.generic.theme"
        )} (${this.hass!.localize(
          "ui.panel.lovelace.editor.card.config.optional"
        )})`;
      case "area":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name");
      case "navigation_path":
        return this.hass!.localize(
          "ui.panel.lovelace.editor.action-editor.navigation_path"
        );
      case "area_name":
        return (
          this.hass!.localize("ui.panel.lovelace.editor.card.area.name") +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.card.generic.name`)
        );
      case "area_icon":
        return (
          this.hass!.localize("ui.panel.lovelace.editor.card.area.name") +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`)
        );
      case "area_name_color":
        return (
          this.hass!.localize("ui.panel.lovelace.editor.card.area.name") +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.card.generic.name`) +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`)
        );
      case "area_icon_color":
        return (
          this.hass!.localize("ui.panel.lovelace.editor.card.area.name") +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`) +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`)
        );
      case "v2_color":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
      case "css":
        return "CSS";
      case "domain_css":
        return "Domain CSS";
      case "cover_css":
        return "Cover CSS";
      case "alert_css":
        return "Alert CSS";
      case "icon_css":
        return "Icon CSS";
      case "name_css":
        return "Name CSS";
      case "mirrored":
        return "Mirror Card Layout";
      case "alert_color":
      case "sensor_color":
      case "domain_color":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
      case "columns":
        return this.hass!.localize(`ui.components.grid-size-picker.columns`);
      case "appearance":
        return (
          this.hass!.localize(
            `ui.panel.lovelace.editor.card.tile.appearance`
          ) || "Appearance"
        );
      case "toggle_domains":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.cardpicker.domain`
        );
      case "popup":
        return "Popup";
      case "popup_domains":
        return (
          "Popup" +
          " " +
          this.hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`)
        );
      case "extra_entities":
        return (
          this.hass!.localize(`ui.common.add`) +
          " " +
          this.hass!.localize(
            `ui.panel.lovelace.editor.card.generic.entities`
          ) +
          ":"
        );
      case "hidden_entities":
        return (
          this.hass!.localize(`ui.common.hide`) +
          " " +
          this.hass!.localize(
            `ui.panel.lovelace.editor.card.generic.entities`
          ) +
          ":"
        );
      case "hide_unavailable":
        return (
          this.hass!.localize(`ui.common.hide`) +
          " " +
          this.hass!.localize(`state.default.unavailable`)
        );
      case "show_active":
        return (
          this.hass!.localize(`ui.common.hide`) +
          " " +
          this.hass!.localize(
            `ui.components.entity.entity-state-picker.state`
          ) +
          " " +
          this.hass!.localize(
            `component.binary_sensor.entity_component._.state.off`
          )
        );
      case "edit_filters":
        return (
          this.hass!.localize(`ui.panel.lovelace.editor.common.edit`) +
          " " +
          this.hass!.localize(`ui.components.subpage-data-table.filters`)
        );
      case "label_filter":
        return (
          this.hass!.localize("ui.components.label-picker.label") +
          " " +
          this.hass!.localize("ui.components.related-filter-menu.filter")
        );
      case "cover_classes":
        return this.hass!.localize(`component.cover.entity_component._.name`);
      case "label":
        return this.hass!.localize("ui.components.label-picker.label");
      case "show_icon":
      case "tap_action":
      case "hold_action":
      case "double_tap_action":
      case "camera_view":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.generic.${schema.name}`
        );
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };

  private _editItem(
    ev: CustomEvent<number>,
    editorKey: "Domain" | "Alert" | "Cover" | "Sensor" //| "Popup"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = ev.detail;

    this[`_subElementEditor${editorKey}`] = { index };
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

  /*
  private _edit_itemPopup(ev: CustomEvent<number>): void {
    this._editItem(ev, "Popup");
  }
*/
  private _customizationChanged(
    ev: CustomEvent<Settings[]>,
    customizationKey: "domain" | "alert" | "cover" | "sensor" //| "popup"
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    fireEvent(this, "config-changed", {
      config: {
        ...this._config,
        [`customization_${customizationKey}`]: ev.detail,
      } as CardConfig,
    });
  }

  private _customizationChangedDomain(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, "domain");
  }

  private _customizationChangedAlert(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, "alert");
  }

  private _customizationChangedCover(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, "cover");
  }

  private _customizationChangedSensor(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, "sensor");
  }

  /*
  private _customizationChangedPopup(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, "popup");
  }
*/
  private _renderSubElementEditor(
    editorKey: "domain" | "alert" | "cover" | "sensor",
    goBackHandler: () => void,
    itemChangedHandler: (ev: CustomEvent<Settings>) => void
  ) {
    // 1) den Array-Namen zusammensetzen:
    const listName = `customization_${editorKey}` as keyof Settings;
    // 2) das korrekte Element (bei Mehrfach-Editoren nach index) holen:
    const subConfigs = this._config?.[listName] as
      | Array<{ type?: string }>
      | undefined;
    const editorKeyCapitalized = `_subElementEditor${
      editorKey.charAt(0).toUpperCase() + editorKey.slice(1)
    }` as keyof this;
    const idx = (this[editorKeyCapitalized] as SubElementEditor)?.index ?? 0;
    const rawType = subConfigs?.[idx]?.type ?? "unknown";

    const match = rawType.match(/^(.+?)\s*-\s*(.+)$/);
    let localizedType: string;

    if (match) {
      // —> 2-Teiler „Domain – DeviceClass“
      const domainKey = match[1].toLowerCase().replace(" ", "_");
      const devClassKey = match[2].toLowerCase();

      const domainName =
        this.hass!.localize(`component.${domainKey}.entity_component._.name`) ||
        match[1];

      let deviceClassName =
        this.hass!.localize(
          `ui.dialogs.entity_registry.editor.device_classes.${domainKey}.${devClassKey}`
        ) || match[2];

      // hier Großschreibung erzwingen
      deviceClassName =
        deviceClassName.charAt(0).toUpperCase() + deviceClassName.slice(1);

      localizedType = `${domainName} – ${deviceClassName}`;
    } else {
      // —> nur ein einziger Teil (z. B. „window“)
      let only =
        this.hass!.localize(`component.${rawType}.entity_component._.name`) ||
        rawType;

      // auch hier erstes Zeichen groß
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

  private _renderSubElementEditorDomain() {
    return this._renderSubElementEditor(
      "domain",
      this._goBackDomain,
      this._itemChangedDomain
    );
  }

  private _renderSubElementEditorAlert() {
    return this._renderSubElementEditor(
      "alert",
      this._goBackAlert,
      this._itemChangedAlert
    );
  }

  private _renderSubElementEditorCover() {
    return this._renderSubElementEditor(
      "cover",
      this._goBackCover,
      this._itemChangedCover
    );
  }

  private _renderSubElementEditorSensor() {
    return this._renderSubElementEditor(
      "sensor",
      this._goBackSensor,
      this._itemChangedSensor
    );
  }
  /*
  private _renderSubElementEditorPopup() {
    return this._renderSubElementEditor(
      "popup",
      this._goBackPopup,
      this._itemChangedPopup
    );
  }
*/
  private _goBackDomain(): void {
    this._subElementEditorDomain = undefined;
  }

  private _goBackAlert(): void {
    this._subElementEditorAlert = undefined;
  }

  private _goBackCover(): void {
    this._subElementEditorCover = undefined;
  }

  private _goBackSensor(): void {
    this._subElementEditorSensor = undefined;
  }

  /*  private _goBackPopup(): void {
    this._subElementEditorPopup = undefined;
  }
*/
  private _itemChanged(
    ev: CustomEvent<Settings>,
    editorTarget: { index?: number } | undefined,
    customizationKey:
      | "customization_domain"
      | "customization_alert"
      | "customization_cover"
      | "customization_sensor"
    //  | "customization_popup"
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

  private _itemChangedDomain(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorDomain, "customization_domain");
  }

  private _itemChangedAlert(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorAlert, "customization_alert");
  }

  private _itemChangedCover(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorCover, "customization_cover");
  }

  private _itemChangedSensor(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorSensor, "customization_sensor");
  }

  /*
  private _itemChangedPopup(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorPopup, "customization_popup");
  }
*/
  public get toggleSelectOptions(): SelectOption[] {
    return this._buildToggleOptions(
      this._toggleDomainsForArea(this._config!.area || ""),
      this._config?.toggle_domains ||
        this._toggleDomainsForArea(this._config!.area || "")
    );
  }

  public get AllSelectOptions(): SelectOption[] {
    return this._buildAllOptions(
      this._allDomainsForArea(this._config!.area || ""),
      this._config?.popup_domains ||
        this._allDomainsForArea(this._config!.area || "")
    );
  }

  public get binarySelectOptions(): SelectOption[] {
    return this._buildBinaryOptions(
      this._binaryClassesForArea(this._config!.area || ""),
      this._config?.alert_classes ||
        this._binaryClassesForArea(this._config!.area || "")
    );
  }

  public get coverSelectOptions(): SelectOption[] {
    return this._buildCoverOptions(
      this._coverClassesForArea(this._config!.area || ""),
      this._config?.cover_classes ||
        this._coverClassesForArea(this._config!.area || "")
    );
  }

  public get sensorSelectOptions(): SelectOption[] {
    return this._buildSensorOptions(
      this._sensorClassesForArea(this._config!.area || ""),
      this._config?.sensor_classes ||
        this._sensorClassesForArea(this._config!.area || "")
    );
  }

  public get entityOptions(): SelectOption[] {
    return this._entityOptions;
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
      this._config.show_camera || false,
      this._config.design || "V1"
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
      return this._renderSubElementEditorDomain();
    if (this._subElementEditorAlert) return this._renderSubElementEditorAlert();
    if (this._subElementEditorCover) return this._renderSubElementEditorCover();
    if (this._subElementEditorSensor)
      return this._renderSubElementEditorSensor();
    //    if (this._subElementEditorPopup) return this._renderSubElementEditorPopup();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiAlert}></ha-svg-icon>
          ${this._computeLabelCallback({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${binaryschema}
            .computeLabel=${this._computeLabelCallback}
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
          ${this._computeLabelCallback({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${coverschema}
            .computeLabel=${this._computeLabelCallback}
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
          ${this._computeLabelCallback({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${sensorschema}
            .computeLabel=${this._computeLabelCallback}
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
          ${this._computeLabelCallback({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${toggleschema}
            .computeLabel=${this._computeLabelCallback}
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

      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiViewDashboardVariant}></ha-svg-icon>
          ${this._computeLabelCallback({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${popupschema}
            .computeLabel=${this._computeLabelCallback}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </ha-expansion-panel>
    `;
  }

  /*

<!--
          <popup-items-editor
            .hass=${this.hass}
            .customization_popup=${this._config.customization_popup}
            .SelectOptions=${this.AllSelectOptions}
            @edit-item=${this._edit_itemPopup}
            @config-changed=${this._customizationChangedPopup}
          >
          </popup-items-editor>  
          
-->    
  */

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
      margin-top: 24px;
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
  `;
}
