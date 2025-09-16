import { LitElement, html, nothing } from "lit";
import { HomeAssistant } from "custom-card-helpers";
import { EditorTarget, Settings, HTMLElementValue } from "./helpers";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { css, CSSResult, nothing } from "lit";
import { mdiClose, mdiPencil, mdiGestureTapButton } from "@mdi/js";
import { fireEvent, SelectOption } from "./helpers";

abstract class BaseItemsEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Array }) SelectOptions: SelectOption[] = [];

  protected abstract customization: Settings[] | undefined;
  protected abstract customizationChangedEvent: string;

  private _entityKeys = new WeakMap<Settings, string>();

  private _getKey(action: Settings) {
    if (!this._entityKeys.has(action)) {
      this._entityKeys.set(action, Math.random().toString());
    }
    return this._entityKeys.get(action)!;
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    return html`
      <div class="customization">
        ${this.customization &&
        repeat(
          this.customization,
          (conf) => this._getKey(conf),
          (conf, index) => html`
            <div class="customize-item">
              <ha-select
                label=${this.hass!.localize(
                  "ui.panel.lovelace.editor.features.edit"
                )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${conf.type}
                @closed=${(ev: any) => ev.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
                  (option) =>
                    html`<mwc-list-item .value=${option.value}
                      >${option.label}</mwc-list-item
                    >`
                )}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${mdiClose}
                class="remove-icon"
                .index=${index}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${mdiPencil}
                class="edit-icon"
                .index=${index}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `
        )}

        <div class="add-item row">
          <ha-select
            label=${this.hass!.localize(
              "ui.panel.lovelace.editor.common.edit"
            ) +
            " " +
            this.hass!.localize(
              "ui.panel.lovelace.editor.card.markdown.content"
            )}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${(ev: any) => ev.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
              (option) =>
                html`<mwc-list-item .value=${option.value}
                  >${option.label}</mwc-list-item
                >`
            )}
          </ha-select>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this.customization || !this.hass) {
      return;
    }
    const value = ev.detail.value;
    const index = (ev.target as any).index;
    const newCustomization = this.customization.concat();
    newCustomization[index] = { ...newCustomization[index], type: value || "" };
    fireEvent(this, this.customizationChangedEvent, newCustomization);
  }

  private _removeRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.currentTarget as EditorTarget).index;
    if (index != undefined) {
      const customization = this.customization!.concat();
      customization.splice(index, 1);
      fireEvent<Settings[]>(
        this,
        this.customizationChangedEvent,
        customization
      );
    }
  }

    
  private _editRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.target as EditorTarget).index;
    if (index != undefined) {
      fireEvent<number>(this, "edit-item", index);
    }
  }

  private _addRow(ev: Event): void {
    ev.stopPropagation();
    if (!this.customization || !this.hass) {
      return;
    }
    const selectElement = this.shadowRoot!.querySelector(
      ".add-customization"
    ) as HTMLElementValue;
    if (!selectElement || !selectElement.value) {
      return;
    }
    const preset = selectElement.value;
    const newItem: Settings = { type: preset };
    fireEvent<Settings[]>(this, this.customizationChangedEvent, [
      ...this.customization,
      newItem,
    ]);
    selectElement.value = "";
  }

  static get styles(): CSSResult {
    return css`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization,
      .select-customization {
        width: 100%;
        margin-top: 8px;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
    `;
  }
}

@customElement("domain-items-editor")
export class DomainItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization_domain?: Settings[];
  protected customizationChangedEvent = "config-changed";
  protected get customization() {
    return this.customization_domain;
  }
}

@customElement("alert-items-editor")
export class AlertItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization_alert?: Settings[];
  protected customizationChangedEvent = "config-changed";
  protected get customization() {
    return this.customization_alert;
  }
}

@customElement("cover-items-editor")
export class CoverItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization_cover?: Settings[];
  protected customizationChangedEvent = "config-changed";
  protected get customization() {
    return this.customization_cover;
  }
}

@customElement("sensor-items-editor")
export class SensorItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization_sensor?: Settings[];
  protected customizationChangedEvent = "config-changed";
  protected get customization() {
    return this.customization_sensor;
  }
}

@customElement("popup-items-editor")
export class PopupItemsEditor extends BaseItemsEditor {
  @property({ attribute: false }) customization_popup?: Settings[];
  protected customizationChangedEvent = "config-changed";
  protected get customization() {
    return this.customization_popup;
  }
}

@customElement("custom-buttons-editor")
export class CustomButtonsEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) custom_buttons?: any[];
  
  protected customizationChangedEvent = "config-changed";

  private _editRow(ev: Event): void {
    const index = (ev.currentTarget as any).index;
    fireEvent(this, "edit-item", index);
  }

  private _removeRow(ev: Event): void {
    if (!this.custom_buttons) return;
    const index = (ev.currentTarget as any).index;
    const newButtons = [...this.custom_buttons];
    newButtons.splice(index, 1);
    fireEvent(this, "config-changed", newButtons);
  }

  private _addRow(): void {
    const newButton = {
      name: "New Button",
      icon: "mdi:gesture-tap-button",
      tap_action: { action: "none" },
    };
    const newButtons = [...(this.custom_buttons || []), newButton];
    fireEvent(this, "config-changed", newButtons);
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    return html`
      ${this.custom_buttons?.map(
        (button, index) => html`
          <div class="row">
            <div class="item">
              <ha-icon .path=${button.icon || mdiGestureTapButton}></ha-icon>
              <span class="name">${button.name || `Button ${index + 1}`}</span>
            </div>
            <ha-icon-button
              .label=${this.hass!.localize("ui.common.edit")}
              .path=${mdiPencil}
              .index=${index}
              @click=${this._editRow}
            ></ha-icon-button>
            <ha-icon-button
              .label=${this.hass!.localize("ui.common.remove")}
              .path=${mdiClose}
              .index=${index}
              @click=${this._removeRow}
            ></ha-icon-button>
          </div>
        `
      )}
      <mwc-button @click=${this._addRow} class="add-btn" outlined>
        ${this.hass!.localize("ui.panel.lovelace.editor.card.generic.add_button")}
      </mwc-button>
    `;
  }

  static styles = css`
    .row {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }
    .item {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .name {
        font-size: 16px;
    }
    .add-btn {
      margin-top: 8px;
      width: 100%;
    }
  `;
}
