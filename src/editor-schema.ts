import memoizeOne from "memoize-one";
import { AreaCardDisplayType } from "./editor";
import { Schema, SelectOption, UiAction, HomeAssistant } from "./ha";

export const getConfigSchema = memoizeOne(() => {
  return [{ name: "area", selector: { area: {} } }];
});

export const getAppearanceSchema = memoizeOne(
  (
    designVersion: string,
    displayType: AreaCardDisplayType,
    hass: HomeAssistant
  ) => {
    const localize = (key: string) => hass.localize(key) || key;

    return [
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
              label: hass.localize(
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
    ];
  }
);

export const getActionsSchema = memoizeOne(() => {
  const actions: UiAction[] = [
    "more-info",
    "navigate",
    "url",
    "perform-action",
    "none",
  ];

  return [
    { name: "tap_action", selector: { ui_action: { actions } } },
    { name: "double_tap_action", selector: { ui_action: { actions } } },
    { name: "hold_action", selector: { ui_action: { actions } } },
  ];
});

export const getBinarySchema = memoizeOne((binaryClasses: SelectOption[]) => [
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
]);

export const getCoverSchema = memoizeOne((CoverClasses: SelectOption[]) => [
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
]);

export const getSensorSchema = memoizeOne((sensorClasses: SelectOption[]) => [
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

export const getToggleSchema = memoizeOne((toggleDomains: SelectOption[]) => [
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
]);

export const getStyleSchema = memoizeOne(() => [
  {
    name: "styles",
    selector: {
      object: {},
    },
  },
]);
