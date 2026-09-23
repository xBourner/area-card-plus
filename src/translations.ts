import { HomeAssistant, Schema } from "./ha";
import { getTranslation, TranslationKey } from "./translations-data";

export function translateEntityState(
  hass: HomeAssistant,
  state: string,
  domain: string,
): string {
  const localized = hass.localize(
    `component.${domain}.entity_component._.state.${state}`,
  );
  return localized || state;
}

const compositeKeys: string[] = [
  "area_name",
  "area_icon",
  "area_name_color",
  "area_icon_color",
  "hide_unavailable",
  "show_active",
  "extra_entities",
  "hidden_entities",
  "edit_filters",
  "label_filter",
  "ungroup_areas",
  "popup_domains",
  "wrap_sensor_icons",
  "category_filter",
  "mirrored",
  "popup_sort",
  "camera_mode",
  "camera_auto_interval",
  "add_custom_button",
  "color",
  "edit_content",
];

export function computeLabelCallback(
  hass: HomeAssistant,
  schema: Schema,
): string {
  if (compositeKeys.includes(schema.name)) {
    return getTranslation(
      schema.name as TranslationKey,
      hass.locale.language,
    );
  }

  switch (schema.name) {
    case "theme":
      return `${hass!.localize(
        "ui.panel.lovelace.editor.card.generic.theme",
      )} (${hass!.localize("ui.panel.lovelace.editor.card.config.optional")})`;
    case "v2_color":
      return hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
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
    case "columns":
      return hass!.localize(`ui.components.grid-size-picker.columns`);
    case "appearance":
      return (
        hass!.localize(`ui.panel.lovelace.editor.card.tile.appearance`) ||
        "Appearance"
      );
    case "toggle_domains":
      return hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`);
    case "popup":
      return "Popup";
    case "cover_classes":
      return hass!.localize(`component.cover.entity_component._.name`);
    case "alert_color":
      return `${hass!.localize(`ui.panel.lovelace.editor.card.area.alert_classes`) || "Alert"} ${getTranslation("color", hass.locale.language)}`;
    case "sensor_color":
      return `${hass!.localize(`ui.panel.lovelace.editor.card.area.sensor_classes`) || "Sensor"} ${getTranslation("color", hass.locale.language)}`;
    case "domain_color":
      return `${hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`) || "Domain"} ${getTranslation("color", hass.locale.language)}`;
    case "cover_color":
      return `${hass!.localize(`component.cover.entity_component._.name`) || "Cover"} ${getTranslation("color", hass.locale.language)}`;
    case "label":
      return hass!.localize("ui.components.label-picker.label");
    case "show_sensor_icons":
      return hass!.localize("ui.panel.lovelace.editor.card.generic.show_icon");
    case "name":
      return hass!.localize("ui.common.name");
    case "state":
      return hass!.localize("ui.components.entity.entity-state-picker.state");
    case "show_icon":
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
    case "camera_view":
      return hass!.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`,
      );
    case "camera_entity":
      return hass!.localize(
          `ui.panel.lovelace.editor.card.area.display_type_options.camera`,
        );
    case "camera_entity_left":
      return ( hass!.localize(
          `ui.panel.lovelace.editor.card.area.display_type_options.camera`,
        )  +
        ` (${getTranslation("position_left", hass.locale.language)})`
      );
    case "camera_entity_right":
      return ( hass!.localize(
          `ui.panel.lovelace.editor.card.area.display_type_options.camera`,
        )  +
        ` (${getTranslation("position_right", hass.locale.language)})`
      );
    default:
      return hass!.localize(
        `ui.panel.lovelace.editor.card.area.${schema.name}`,
      );
  }
}
