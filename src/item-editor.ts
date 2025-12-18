import {
  LitElement,
  TemplateResult,
  html,
  css,
  CSSResult,
  PropertyValues,
  nothing,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig, UiAction, Schema } from "./ha";

import memoizeOne from "memoize-one";

interface ItemConfig extends LovelaceCardConfig {}

const ACTIONS: UiAction[] = [
  "more-info",
  "toggle",
  "navigate",
  "url",
  "perform-action",
  "none",
];

const ACTIONS_ALERT: UiAction[] = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "none",
];

const ACTIONS_SENSOR: UiAction[] = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "none",
];

@customElement("item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: LovelaceCardConfig;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @property({ attribute: false }) lovelace?: unknown;
  @state() private getSchema?: string;
  @state() private _config?: ItemConfig;
  @state() private _activeTab = "config";

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("config") && this.config) {
      this._config = { ...this.config };
    }
  }

  private _schemadomainConfig = memoizeOne(() => {
    const base: Schema[] = [
      { name: "icon", selector: { icon: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
    ];

    if (this._config?.type === "climate") {
      base.unshift(
        {
          name: "display_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "text", label: "Text" },
                { value: "icon", label: "Icon" },
                { value: "text_icon", label: "Text + Icon" },
              ],
            },
          },
        },
        {
          name: "show_set_temperature",
          selector: {
            boolean: {},
          },
        }
      );
    }

    return base;
  });

  private _schemadomainActions = memoizeOne(() => {
    const actions = ACTIONS;
    return [
      {
        name: "tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "double_tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "hold_action",
        selector: { ui_action: { actions } },
      },
    ];
  });

  private _schemaalertConfig = memoizeOne(() => {
    return [
      { name: "invert", selector: { boolean: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
    ];
  });

  private _schemaalertActions = memoizeOne(() => {
    const actions = ACTIONS_ALERT;
    return [
      {
        name: "tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "double_tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "hold_action",
        selector: { ui_action: { actions } },
      },
    ];
  });

  private _schemasensorConfig = memoizeOne(() => {
    return [
      { name: "invert", selector: { boolean: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
    ];
  });

  private _schemasensorActions = memoizeOne(() => {
    const actions = ACTIONS_SENSOR;
    return [
      {
        name: "tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "double_tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "hold_action",
        selector: { ui_action: { actions } },
      },
    ];
  });

  private _schemacustombuttonConfig = memoizeOne(() => {
    return [
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
    ];
  });

  private _schemacustombuttonActions = memoizeOne(() => {
    const actions = ACTIONS;
    return [
      {
        name: "tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "double_tap_action",
        selector: { ui_action: { actions } },
      },
      {
        name: "hold_action",
        selector: { ui_action: { actions } },
      },
    ];
  });

  private _schemaStyle = memoizeOne(() => {
    return [
      {
        name: "styles",
        selector: {
          object: {},
        },
      },
    ];
  });

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const hass = this.hass;

    if (!this._config) {
      this._config = { ...this.config, area: this.config.area || "" };
    }

    let schema: Schema[] | undefined;
    if (this._activeTab === "config") {
      switch (this.getSchema) {
        case "sensor":
          schema = this._schemasensorConfig();
          break;
        case "domain":
          schema = this._schemadomainConfig();
          break;
        case "alert":
        case "cover":
          schema = this._schemaalertConfig();
          break;
        case "custom_button":
          schema = this._schemacustombuttonConfig();
          break;
      }
    } else if (this._activeTab === "actions") {
      switch (this.getSchema) {
        case "sensor":
          schema = this._schemasensorActions();
          break;
        case "domain":
          schema = this._schemadomainActions();
          break;
        case "alert":
        case "cover":
          schema = this._schemaalertActions();
          break;
        case "custom_button":
          schema = this._schemacustombuttonActions();
          break;
      }
    } else if (this._activeTab === "style") {
      schema = this._schemaStyle();
    }

    const data = { ...this._config };

    return html`
      <ha-tab-group>
        <ha-tab-group-tab
          .active=${this._activeTab === "config"}
          @click=${() => (this._activeTab = "config")}
        >
          ${hass.localize("ui.panel.lovelace.editor.edit_card.tab_config") ??
          "Configuration"}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "actions"}
          @click=${() => (this._activeTab = "actions")}
        >
          ${hass.localize("ui.panel.lovelace.editor.card.generic.actions")}
        </ha-tab-group-tab>
        <ha-tab-group-tab
          .active=${this._activeTab === "style"}
          @click=${() => (this._activeTab = "style")}
        >
          Style
        </ha-tab-group-tab>
        ${this.getSchema !== "custom_button"
          ? html`
              <ha-tab-group-tab
                .active=${this._activeTab === "popup"}
                @click=${() => (this._activeTab = "popup")}
              >
                Popup Card
              </ha-tab-group-tab>
            `
          : ""}
      </ha-tab-group>

      ${this._activeTab === "style"
        ? html`
            <ha-alert alert-type="info" title="Style Guide">
              <p>
                You can use standard CSS per identifier. <br />
                <strong>Identifiers:</strong>
              </p>
              <ul>
                <li><b>button</b>: Item Container (Background, Border)</li>
                <li><b>icon</b>: Item Icon</li>
                ${this.getSchema === "custom_button"
                  ? html`<li><b>name</b>: Item Name (Label)</li>`
                  : nothing}
              </ul>
              <p>
                <strong>Animations:</strong> <br />
                spin, pulse, shake, blink, bounce
              </p>
              <p><strong>Example:</strong></p>
              <pre>
button:
  --mdc-icon-size: 24px;
  color: green;          
icon:
  animation: spin 2s linear infinite;
  --mdc-icon-size: 40px;
  color: var(--primary-color);
</pre
              >
            </ha-alert>
          `
        : nothing}
      ${this._activeTab === "popup"
        ? this._renderPopupTab()
        : html`
            <ha-form
              .hass=${hass}
              .data=${data}
              .schema=${schema}
              .computeLabel=${this._computeLabelCallback}
              @value-changed=${this._valueChangedSchema}
            ></ha-form>
          `}
    `;
  }

  private _renderPopupTab(): TemplateResult {
    const popupCard = this._config?.popup_card;

    if (!popupCard) {
      return html`
        <div class="card-picker">
          <hui-card-picker
            .hass=${this.hass!}
            .lovelace=${this.lovelace}
            @config-changed=${this._cardPicked}
          ></hui-card-picker>
        </div>
      `;
    }

    return html`
      <div class="card-editor">
        <div class="card-header">
          <h3>
            Popup
            ${this.hass!.localize(
              "ui.panel.lovelace.editor.edit_card.tab_config"
            )}
          </h3>
          <ha-button
            class="warning"
            @click=${this._removePopupCard}
            .disabled=${!popupCard}
          >
            ${this.hass!.localize("ui.common.delete")}
          </ha-button>
        </div>
        <hui-card-element-editor
          .hass=${this.hass!}
          .lovelace=${this.lovelace}
          .value=${popupCard}
          @config-changed=${this._popupCardChanged}
        ></hui-card-element-editor>
      </div>
    `;
  }
  private _cardPicked(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = ev.detail.config;
    this._updatePopupCard(config);
  }

  private _popupCardChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = ev.detail.config;
    this._updatePopupCard(config);
  }

  private _updatePopupCard(popup_card: LovelaceCardConfig): void {
    if (!this._config) return;
    const updatedConfig = {
      ...this._config,
      popup_card,
    };
    this._config = updatedConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: updatedConfig,
      })
    );
  }

  private _removePopupCard(): void {
    if (!this._config) return;
    const { popup_card, ...rest } = this._config;
    this._config = rest as LovelaceCardConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: this._config,
      })
    );
  }

  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "color":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
      case "enable_popup_view":
        return (
          this.hass!.localize("ui.common.enable") +
          " " +
          this.hass!.localize(
            "ui.panel.lovelace.editor.action-editor.actions.more-info"
          )
        );
      case "disable_toggle_action":
        return (
          this.hass!.localize("ui.common.disable") +
          " " +
          this.hass!.localize(
            "ui.panel.lovelace.editor.card.generic.tap_action"
          )
        );
      case "styles":
        return "Styles";
      case "display_mode":
        return "Display Mode";
      case "popup_card":
        return "Change Popup Card Type";
      case "icon":
      case "tap_action":
      case "hold_action":
      case "double_tap_action":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.generic.${schema.name}`
        );
      case "invert":
      case "invert_state":
        return this.hass!.localize(
          "ui.dialogs.entity_registry.editor.invert.label"
        );
      case "name":
        return this.hass!.localize(`ui.common.name`);
      case "show_set_temperature":
        return "Show Set Temperature";
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };

  private _valueChangedSchema(event: CustomEvent): void {
    if (!this.config) {
      return;
    }

    const updatedConfig = {
      ...this.config,
      ...event.detail.value,
    };

    this._config = updatedConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: updatedConfig,
      })
    );
  }

  static get styles(): CSSResult {
    return css`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
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
    `;
  }
}
