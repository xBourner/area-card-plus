import { HomeAssistant, Schema } from "./ha";

export function translateEntityState(
  hass: HomeAssistant,
  state: string,
  domain: string
): string {
  const localized = hass.localize(
    `component.${domain}.entity_component._.state.${state}`
  );
  return localized || state;
}

export function computeLabelCallback(
  hass: HomeAssistant,
  schema: Schema
): string {
  switch (schema.name) {
    case "theme":
      return `${hass!.localize(
        "ui.panel.lovelace.editor.card.generic.theme"
      )} (${hass!.localize("ui.panel.lovelace.editor.card.config.optional")})`;
    case "area":
      return hass!.localize("ui.panel.lovelace.editor.card.area.name");
    case "navigation_path":
      return hass!.localize(
        "ui.panel.lovelace.editor.action-editor.navigation_path"
      );
    case "area_name":
      return (
        hass!.localize("ui.panel.lovelace.editor.card.area.name") +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.generic.name`)
      );
    case "area_icon":
      return (
        hass!.localize("ui.panel.lovelace.editor.card.area.name") +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`)
      );
    case "area_name_color":
      return (
        hass!.localize("ui.panel.lovelace.editor.card.area.name") +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.generic.name`) +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.tile.color`)
      );
    case "area_icon_color":
      return (
        hass!.localize("ui.panel.lovelace.editor.card.area.name") +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`) +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.tile.color`)
      );
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
    case "mirrored":
      return "Mirror Card Layout";
    case "alert_color":
    case "sensor_color":
    case "domain_color":
      return hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
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
    case "popup_domains":
      return (
        "Popup" +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`)
      );
    case "extra_entities":
      return (
        hass!.localize(`ui.common.add`) +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.generic.entities`) +
        ":"
      );
    case "hidden_entities":
      return (
        hass!.localize(`ui.common.hide`) +
        " " +
        hass!.localize(`ui.panel.lovelace.editor.card.generic.entities`) +
        ":"
      );
    case "hide_unavailable":
      return (
        hass!.localize(`ui.common.hide`) +
        " " +
        hass!.localize(`state.default.unavailable`)
      );
    case "show_active":
      return (
        hass!.localize(`ui.common.hide`) +
        " " +
        hass!.localize(`ui.components.entity.entity-state-picker.state`) +
        " " +
        hass!.localize(`component.binary_sensor.entity_component._.state.off`)
      );
    case "edit_filters":
      return (
        hass!.localize(`ui.panel.lovelace.editor.common.edit`) +
        " " +
        hass!.localize(`ui.components.subpage-data-table.filters`)
      );
    case "label_filter":
      return (
        hass!.localize("ui.components.label-picker.label") +
        " " +
        hass!.localize("ui.components.related-filter-menu.filter")
      );
    case "cover_classes":
      return hass!.localize(`component.cover.entity_component._.name`);
    case "label":
      return hass!.localize("ui.components.label-picker.label");
    case "show_sensor_icons":
      return hass!.localize("ui.panel.lovelace.editor.card.generic.show_icon");
    case "wrap_sensor_icons":
      return (
        hass!.localize(
          "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
        ) +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.sensor.name")
      );
    case "category_filter":
      return (
        hass!.localize("ui.components.category-picker.category") +
        " " +
        hass!.localize("ui.components.related-filter-menu.filter")
      );
    case "name":
      return hass!.localize("ui.common.name");
    case "state":
      return hass!.localize("ui.components.entity.entity-state-picker.state");
    case "ungroup_areas":
      return (
        hass!.localize("ui.common.disable") +
        " " +
        hass!.localize("ui.panel.lovelace.editor.card.area.name") +
        " " +
        hass!.localize("component.group.entity_component._.name")
      );
    case "popup_sort":
      return "Popup Sort";
    case "show_icon":
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
    case "camera_view":
      return hass!.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      );
    case "show_camera":
      return hass!.localize(`ui.panel.lovelace.editor.card.area.show_camera`);

    default:
      return hass!.localize(
        `ui.panel.lovelace.editor.card.area.${schema.name}`
      );
  }
}
