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
  tap_action?: any;
  hold_action?: any;
  double_tap_action?: any;
  conditional?: boolean;
}
