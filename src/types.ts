export interface CardStyles {
  card?: string;
  icon?: string;
  name?: string;
  domain?: string;
  cover?: string;
  alert?: string;
  sensor?: string;
  image?: string;
  camera?: string;
  sensors?: string;
  thermostat?: string | {
    heat?: string;
    cool?: string;
    standby?: string;
  };
}

export interface CustomButtonConfig {
  name?: string;
  icon?: string;
  entity?: string;
  color?: string;
  activate_state_color?: boolean;
  css?: string;
  icon_css?: string;
  styles?: {
    button?: string;
    card?: string;
    icon?: string;
    name?: string;
  };
  use_entity_picture?: boolean;
  position?: "default" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom";
  position_top?: string;
  position_right?: string;
  position_bottom?: string;
  position_left?: string;
  position_group?: string;
  position_direction?: "row" | "column";
  state_mode?: "default" | "equal" | "not_equal";
  state_value?: string;
  tap_action?: any;
  hold_action?: any;
  double_tap_action?: any;
  conditional?: boolean;
}
