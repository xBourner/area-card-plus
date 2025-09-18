import { LitElement, TemplateResult, html, css, CSSResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { Settings, UiAction } from "./helpers";
import memoizeOne from "memoize-one";

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
}

interface ItemConfig extends LovelaceCardConfig {}

@customElement("item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @state() private getSchema?: string;
  @state() private _config?: ItemConfig;

  updated(changedProperties: any) {
    if (changedProperties.has("config") && this.config) {
      this._config = { ...this.config };
    }
  }

    
    private _schemacustombutton = memoizeOne(() => {
        const actions: UiAction[] = [
          "more-info",
          "toggle",
          "navigate",
          "url",
          "perform-action",
          "assist",
          "none",
        ];
        return [
          { name: "name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
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
    
  private _schemadomain = memoizeOne(() => {
    const actions: UiAction[] = [
      "more-info",
      "toggle",
      "navigate",
      "url",
      "perform-action",
      "none",
    ];
    const base: Schema[] = [
      { name: "icon", selector: { icon: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
      { name: "css", selector: { template: {} } },
      { name: "icon_css", selector: { template: {} } },
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
      { name: "popup_card", selector: { object: {} } },
    ];

    if (this._config?.type === "climate") {
      base.unshift({
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
      });
    }

    return base;
  });

  private _schemaalert = memoizeOne(() => {
    const actions: UiAction[] = [
      "more-info",
      "navigate",
      "url",
      "perform-action",
      "none",
    ];
    return [
      { name: "invert", selector: { boolean: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
      { name: "css", selector: { template: {} } },
      { name: "icon_css", selector: { template: {} } },
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
      { name: "popup_card", selector: { object: {} } },
    ];
  });

  private _schemasensor = memoizeOne(() => {
    const actions: UiAction[] = [
      "more-info",
      "navigate",
      "url",
      "perform-action",
      "none",
    ];
    return [
      { name: "invert", selector: { boolean: {} } },
      {
        name: "color",
        selector: { ui_color: { default_color: "state", include_state: true } },
      },
      { name: "css", selector: { template: {} } },
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
      { name: "popup_card", selector: { object: {} } },
    ];
  });

    
    protected render(): TemplateResult {
        if (!this.hass || !this.config) {
          return html``;
        }

        if (!this._config) {
          this._config = { ...this.config, area: this.config.area || "" };
        }

        let schema;
        switch (this.getSchema) {
          case "sensor":
            schema = this._schemasensor();
            break;
          case "domain":
            schema = this._schemadomain();
            break;
          case "alert":
          case "cover":
            schema = this._schemaalert();
            break;
          case "custom_button":
            schema = this._schemacustombutton();
            break;
        }

        const data = { ...this._config };

        return html`
          <ha-form
            .hass=${this.hass}
            .data=${data}
            .schema=${schema}
            .computeLabel=${this._computeLabelCallback}
            @value-changed=${this._handleFormValueChanged}
          ></ha-form>
          ${this._subElementEditorCustomButton !== undefined
            ? html`
                <popup-dialog
                  .hass=${this.hass}
                  .title=${this.hass!.localize("ui.panel.lovelace.editor.card.button.name")}
                  .open=${true}
                  @closed=${this._goBackCustomButton}
                >
                  <item-editor
                    .hass=${this.hass}
                    .config=${this._config!.custom_buttons?.[
                      this._subElementEditorCustomButton.index!
                    ]}
                    @config-changed=${this._itemChangedCustomButton}
                    .type=${"custom_buttons"}
                  ></item-editor>
                </popup-dialog>
              `
            : nothing
          }
        `;
      }
    
    
  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "custom":
        return "Custom";
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
      case "css":
        return "CSS";
      case "icon_css":
        return (
          this.hass!.localize("ui.panel.lovelace.editor.card.generic.icon") +
          " " +
          "CSS"
        );
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
      case "name":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.generic.name`
         );
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };

    private _handleFormValueChanged(event: CustomEvent): void {
        this._valueChangedSchema(event);
      }


    private _valueChangedSchema(event: CustomEvent): void {
        if (!this.config) {
          return;
        }

        let updatedConfig = {
          ...this.config,
          ...event.detail.value,
        };

        // Auto-populate fields when certain actions are selected
        if (updatedConfig.tap_action?.action === "toggle" && !updatedConfig.tap_action.target) {
          updatedConfig = {
            ...updatedConfig,
            tap_action: {
              ...updatedConfig.tap_action,
              action: "perform-action",
              target: { entity_id: "" },
              perform_action: "homeassistant.toggle",
            }
          };
        } else if (updatedConfig.tap_action?.action === "perform-action" && !updatedConfig.tap_action.target) {
          updatedConfig = {
            ...updatedConfig,
            tap_action: {
              ...updatedConfig.tap_action,
              target: { entity_id: "" },
              perform_action: "",
            }
          };
        }

        this._config = updatedConfig;
        
        // Trigger re-render when action type changes to show new fields
        this.requestUpdate();

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
    `;
  }
}
