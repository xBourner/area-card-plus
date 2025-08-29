import type {
  HassEntity,
  HassEntityAttributeBase,
} from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import {
  HomeAssistant,
  debounce,
  ActionConfig,
  LovelaceCardConfig,
} from "custom-card-helpers";
import type { Connection, UnsubscribeFunc } from "home-assistant-js-websocket";
import { createCollection } from "home-assistant-js-websocket";
import type { Store } from "home-assistant-js-websocket/dist/store";
import type { PropertyValues, ReactiveElement } from "lit";
import { property } from "lit/decorators.js";

export interface CardConfig extends LovelaceCardConfig {
  area: string;
  navigation_path?: string;
  columns?: number;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  show_sensor_icons?: boolean;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface Schema {
  name: string;
  selector?: any;
  required?: boolean;
  default?: any;
  type?: string;
}

export interface SubElementEditor {
  index?: number;
  type?: string;
}

export interface HassCustomElement extends CustomElementConstructor {
  getConfigElement(): Promise<unknown>;
}

export interface EditorTarget extends EventTarget {
  value?: string;
  index?: number;
  checked?: boolean;
  configValue?: string;
  type?: HTMLInputElement["type"];
  config: ActionConfig;
}

export interface Settings {
  type: string;
  area?: string;
}

export interface RegistryEntry {
  created_at: number;
  modified_at: number;
}

export interface AreaRegistryEntry extends RegistryEntry {
  area_id: string;
  floor_id: string | null;
  name: string;
  picture: string | null;
  icon: string | null;
  labels: string[];
  aliases: string[];
  temperature_entity_id: string;
  humidity_entity_id: string;
}

export interface DeviceRegistryEntry extends RegistryEntry {
  id: string;
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string | null;
  model: string | null;
  model_id: string | null;
  name: string | null;
  labels: string[];
  sw_version: string | null;
  hw_version: string | null;
  serial_number: string | null;
  via_device_id: string | null;
  area_id: string | null;
  name_by_user: string | null;
  entry_type: "service" | null;
  disabled_by: "user" | "integration" | "config_entry" | null;
  configuration_url: string | null;
  primary_config_entry: string | null;
}

export interface EntityRegistryEntry extends RegistryEntry {
  id: string;
  entity_id: string;
  name: string | null;
  icon: string | null;
  platform: string;
  config_entry_id: string | null;
  device_id: string | null;
  entity_category: "config" | "diagnostic" | null;
  area_id: string | null;
  labels: string[];
  disabled_by: "user" | "device" | "integration" | "config_entry" | null;
  hidden_by: Exclude<EntityRegistryEntry["disabled_by"], "config_entry">;
  has_entity_name: boolean;
  original_name?: string;
  unique_id: string;
  translation_key?: string;
  categories: { [scope: string]: string };
}

export interface HTMLElementValue extends HTMLElement {
  value: string;
}

export type Constructor<T = any> = new (...args: any[]) => T;

export const round = (value: number, precision = 2): number =>
  Math.round(value * 10 ** precision) / 10 ** precision;

export const isNumericState = (stateObj: HassEntity): boolean =>
  isNumericFromAttributes(stateObj.attributes);

export const isNumericFromAttributes = (
  attributes: HassEntityAttributeBase,
  numericDeviceClasses?: string[]
): boolean =>
  !!attributes.unit_of_measurement ||
  !!attributes.state_class ||
  (numericDeviceClasses || []).includes(attributes.device_class || "");

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  space_comma = "space_comma",
  none = "none",
}

export enum TimeFormat {
  language = "language",
  system = "system",
  am_pm = "12",
  twenty_four = "24",
}

export enum TimeZone {
  local = "local",
  server = "server",
}

export enum DateFormat {
  language = "language",
  system = "system",
  DMY = "DMY",
  MDY = "MDY",
  YMD = "YMD",
}

export enum FirstWeekday {
  language = "language",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
  time_format: TimeFormat;
  date_format: DateFormat;
  first_weekday: FirstWeekday;
  time_zone: TimeZone;
}

export const blankBeforeUnit = (
  unit: string,
  localeOptions: FrontendLocaleData | undefined
): string => {
  if (unit === "°") {
    return "";
  }
  if (localeOptions && unit === "%") {
    return blankBeforePercent(localeOptions);
  }
  return " ";
};

export const blankBeforePercent = (
  localeOptions: FrontendLocaleData
): string => {
  switch (localeOptions.language) {
    case "cs":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return " ";
    default:
      return "";
  }
};

const collator = memoizeOne(
  (language: string | undefined) => new Intl.Collator(language)
);

const caseInsensitiveCollator = memoizeOne(
  (language: string | undefined) =>
    new Intl.Collator(language, { sensitivity: "accent" })
);

const fallbackStringCompare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
};

export const stringCompare = (
  a: string,
  b: string,
  language: string | undefined = undefined
) => {
  // @ts-ignore
  if (Intl?.Collator) {
    return collator(language).compare(a, b);
  }

  return fallbackStringCompare(a, b);
};

export const caseInsensitiveStringCompare = (
  a: string,
  b: string,
  language: string | undefined = undefined
) => {
  // @ts-ignore
  if (Intl?.Collator) {
    return caseInsensitiveCollator(language).compare(a, b);
  }

  return fallbackStringCompare(a.toLowerCase(), b.toLowerCase());
};

export type SensorNumericDeviceClasses = {
  numeric_device_classes: string[];
};

let sensorNumericDeviceClassesCache:
  | Promise<SensorNumericDeviceClasses>
  | undefined;

export const getSensorNumericDeviceClasses = async (
  hass: HomeAssistant
): Promise<SensorNumericDeviceClasses> => {
  if (sensorNumericDeviceClassesCache) {
    return sensorNumericDeviceClassesCache;
  }
  sensorNumericDeviceClassesCache = hass.callWS({
    type: "sensor/numeric_device_classes",
  });
  return sensorNumericDeviceClassesCache!;
};

const fetchAreaRegistry = (conn: Connection) =>
  conn
    .sendMessagePromise<AreaRegistryEntry[]>({
      type: "config/area_registry/list",
    })
    .then((areas) =>
      areas.sort((ent1, ent2) => stringCompare(ent1.name, ent2.name))
    );

const subscribeAreaRegistryUpdates = (
  conn: Connection,
  store: Store<AreaRegistryEntry[]>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchAreaRegistry(conn).then((areas: AreaRegistryEntry[]) =>
          store.setState(areas, true)
        ),
      500,
      true
    ),
    "area_registry_updated"
  );

export const subscribeAreaRegistry = (
  conn: Connection,
  onChange: (areas: AreaRegistryEntry[]) => void
) =>
  createCollection<AreaRegistryEntry[]>(
    "_areaRegistry",
    fetchAreaRegistry,
    subscribeAreaRegistryUpdates,
    conn,
    onChange
  );

export const fetchDeviceRegistry = (conn: Connection) =>
  conn.sendMessagePromise<DeviceRegistryEntry[]>({
    type: "config/device_registry/list",
  });

const subscribeDeviceRegistryUpdates = (
  conn: Connection,
  store: Store<DeviceRegistryEntry[]>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchDeviceRegistry(conn).then((devices) =>
          store.setState(devices, true)
        ),
      500,
      true
    ),
    "device_registry_updated"
  );

export const subscribeDeviceRegistry = (
  conn: Connection,
  onChange: (devices: DeviceRegistryEntry[]) => void
) =>
  createCollection<DeviceRegistryEntry[]>(
    "_dr",
    fetchDeviceRegistry,
    subscribeDeviceRegistryUpdates,
    conn,
    onChange
  );

export const fetchEntityRegistry = (conn: Connection) =>
  conn.sendMessagePromise<EntityRegistryEntry[]>({
    type: "config/entity_registry/list",
  });

const subscribeEntityRegistryUpdates = (
  conn: Connection,
  store: Store<EntityRegistryEntry[]>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchEntityRegistry(conn).then((entities) =>
          store.setState(entities, true)
        ),
      500,
      true
    ),
    "entity_registry_updated"
  );

export const subscribeEntityRegistry = (
  conn: Connection,
  onChange: (entities: EntityRegistryEntry[]) => void
) =>
  createCollection<EntityRegistryEntry[]>(
    "_entityRegistry",
    fetchEntityRegistry,
    subscribeEntityRegistryUpdates,
    conn,
    onChange
  );

export const subscribeOne = async <T>(
  conn: Connection,
  subscribe: (
    conn2: Connection,
    onChange: (items: T) => void
  ) => UnsubscribeFunc
) =>
  new Promise<T>((resolve) => {
    const unsub = subscribe(conn, (items) => {
      unsub();
      resolve(items);
    });
  });

export interface HassSubscribeElement {
  hassSubscribe(): UnsubscribeFunc[];
}

export const SubscribeMixin = <T extends Constructor<ReactiveElement>>(
  superClass: T
) => {
  class SubscribeClass extends superClass {
    @property({ attribute: false }) public hass?: HomeAssistant;

    // we wait with subscribing till these properties are set on the host element
    protected hassSubscribeRequiredHostProps?: string[];

    private __unsubs?: Array<UnsubscribeFunc | Promise<UnsubscribeFunc>>;

    public connectedCallback() {
      super.connectedCallback();
      this._checkSubscribed();
    }

    public disconnectedCallback() {
      super.disconnectedCallback();
      if (this.__unsubs) {
        while (this.__unsubs.length) {
          const unsub = this.__unsubs.pop()!;
          if (unsub instanceof Promise) {
            unsub.then((unsubFunc) => unsubFunc());
          } else {
            unsub();
          }
        }
        this.__unsubs = undefined;
      }
    }

    protected updated(changedProps: PropertyValues) {
      super.updated(changedProps);
      if (changedProps.has("hass")) {
        this._checkSubscribed();
        return;
      }
      if (!this.hassSubscribeRequiredHostProps) {
        return;
      }
      for (const key of changedProps.keys()) {
        if (this.hassSubscribeRequiredHostProps.includes(key as string)) {
          this._checkSubscribed();
          return;
        }
      }
    }

    protected hassSubscribe(): Array<
      UnsubscribeFunc | Promise<UnsubscribeFunc>
    > {
      return [];
    }

    [key: string]: any;

    private _checkSubscribed(): void {
      if (
        this.__unsubs !== undefined ||
        !(this as unknown as Element).isConnected ||
        this.hass === undefined ||
        this.hassSubscribeRequiredHostProps?.some(
          (prop) => this[prop] === undefined
        )
      ) {
        return;
      }
      this.__unsubs = this.hassSubscribe();
    }
  }
  return SubscribeClass;
};

export function fireEvent<T>(
  node: HTMLElement | Window,
  type: string,
  detail: T
): void {
  const event = new CustomEvent(type, {
    bubbles: false,
    composed: false,
    detail: detail,
  });
  node.dispatchEvent(event);
}

import { noChange } from "lit";
import {
  AttributePart,
  directive,
  Directive,
  DirectiveParameters,
} from "lit/directive.js";

export type UiAction = Exclude<ActionConfig["action"], "fire-dom-event">;

interface ActionHandlerType extends HTMLElement {
  holdTime: number;
  bind(element: Element, options?: ActionHandlerOptions): void;
}
interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
    handleKeyDown?: (ev: KeyboardEvent) => void;
  };
}

export interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
  disabled?: boolean;
}

class ActionHandler extends HTMLElement implements ActionHandlerType {
  public holdTime = 500;

  protected timer?: number;

  protected held = false;

  private cancelled = false;

  private dblClickTimeout?: number;

  public connectedCallback() {
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll",
    ].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          this.cancelled = true;
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
          }
        },
        { passive: true }
      );
    });
  }

  public bind(
    element: ActionHandlerElement,
    options: ActionHandlerOptions = {}
  ) {
    if (
      element.actionHandler &&
      deepEqual(options, element.actionHandler.options)
    ) {
      return;
    }

    if (element.actionHandler) {
      element.removeEventListener("touchstart", element.actionHandler.start!);
      element.removeEventListener("touchend", element.actionHandler.end!);
      element.removeEventListener("touchcancel", element.actionHandler.end!);

      element.removeEventListener("mousedown", element.actionHandler.start!);
      element.removeEventListener("click", element.actionHandler.end!);

      element.removeEventListener(
        "keydown",
        element.actionHandler.handleKeyDown!
      );
    }
    element.actionHandler = { options };

    if (options.disabled) {
      return;
    }

    element.actionHandler.start = (ev: Event) => {
      this.cancelled = false;
      let x: number;
      let y: number;
      if ((ev as TouchEvent).touches) {
        x = (ev as TouchEvent).touches[0].clientX;
        y = (ev as TouchEvent).touches[0].clientY;
      } else {
        x = (ev as MouseEvent).clientX;
        y = (ev as MouseEvent).clientY;
      }

      if (options.hasHold) {
        this.held = false;
        this.timer = window.setTimeout(() => {
          this.held = true;
        }, this.holdTime);
      }
    };

    element.actionHandler.end = (ev: Event) => {
      // Don't respond when moved or scrolled while touch
      if (ev.currentTarget !== ev.target) {
        return;
      }
      if (
        ev.type === "touchcancel" ||
        (ev.type === "touchend" && this.cancelled)
      ) {
        return;
      }
      const target = ev.target as HTMLElement;
      // Prevent mouse event if touch event
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (options.hasHold) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      if (options.hasHold && this.held) {
        fireEvent(target, "action", { action: "hold" });
      } else if (options.hasDoubleClick) {
        if (
          (ev.type === "click" && (ev as MouseEvent).detail < 2) ||
          !this.dblClickTimeout
        ) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            fireEvent(target, "action", { action: "tap" });
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireEvent(target, "action", { action: "double_tap" });
        }
      } else {
        fireEvent(target, "action", { action: "tap" });
      }
    };

    element.actionHandler.handleKeyDown = (ev: KeyboardEvent) => {
      if (!["Enter", " "].includes(ev.key)) {
        return;
      }
      (ev.currentTarget as ActionHandlerElement).actionHandler!.end!(ev);
    };

    element.addEventListener("touchstart", element.actionHandler.start, {
      passive: true,
    });
    element.addEventListener("touchend", element.actionHandler.end);
    element.addEventListener("touchcancel", element.actionHandler.end);

    element.addEventListener("mousedown", element.actionHandler.start, {
      passive: true,
    });
    element.addEventListener("click", element.actionHandler.end);

    element.addEventListener("keydown", element.actionHandler.handleKeyDown);
  }
}

customElements.define("action-handler-area-card", ActionHandler);

const getActionHandler = (): ActionHandler => {
  const body = document.body;
  if (body.querySelector("action-handler-area-card")) {
    return body.querySelector("action-handler-area-card") as ActionHandler;
  }

  const actionhandler = document.createElement("action-handler-area-card");
  body.appendChild(actionhandler);

  return actionhandler as ActionHandler;
};

export const actionHandlerBind = (
  element: ActionHandlerElement,
  options?: ActionHandlerOptions
): void => {
  const actionhandler: ActionHandler = getActionHandler();
  if (!actionhandler) {
    return;
  }
  actionhandler.bind(element, options);
};

export const actionHandler = directive(
  class extends Directive {
    update(part: AttributePart, [options]: DirectiveParameters<this>) {
      actionHandlerBind(part.element as ActionHandlerElement, options);
      return noChange;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    render(_options?: ActionHandlerOptions) {}
  }
);

// From https://github.com/epoberezkin/fast-deep-equal
// MIT License - Copyright (c) 2017 Evgeny Poberezkin
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let i: number | [any, any];
    let length: number;
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      for (i of a.entries()) {
        if (!b.has(i[0])) {
          return false;
        }
      }
      for (i of a.entries()) {
        if (!deepEqual(i[1], b.get(i[0]))) {
          return false;
        }
      }
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) {
        return false;
      }
      for (i of a.entries()) {
        if (!b.has(i[0])) {
          return false;
        }
      }
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      length = a.length;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if ((a as Uint8Array)[i] !== (b as Uint8Array)[i]) {
          return false;
        }
      }
      return true;
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }

    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length; i-- !== 0; ) {
      const key = keys[i];

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  // true if both NaN, false otherwise
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b;
};

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  max_columns?: number;
  min_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

// Handle 16x9, 16:9, 1.78x1, 1.78:1, 1.78
// Ignore everything else
const parseOrThrow = (num: any) => {
  const parsed = parseFloat(num);
  if (isNaN(parsed)) {
    throw new Error(`${num} is not a number`);
  }
  return parsed;
};

export default function parseAspectRatio(input: string) {
  if (!input) {
    return null;
  }
  try {
    if (input.endsWith("%")) {
      return { w: 100, h: parseOrThrow(input.substr(0, input.length - 1)) };
    }

    const arr = input.replace(":", "x").split("x");
    if (arr.length === 0) {
      return null;
    }

    return arr.length === 1
      ? { w: parseOrThrow(arr[0]), h: 1 }
      : { w: parseOrThrow(arr[0]), h: parseOrThrow(arr[1]) };
  } catch (_err: any) {
    // Ignore the error
  }
  return null;
}

export const applyThemesOnElement = (
  element: any,
  themes: any,
  localTheme: any
) => {
  const selected = localTheme || themes.theme;

  if (!element.__themes) {
    element.__themes = { cacheKey: null, keys: {} };
  }

  if (!selected || selected === "default") {
    // Default-Theme → alle Inline-CSS entfernen
    element.removeAttribute("style");
    element.__themes.cacheKey = "default";
    return;
  }

  const themeDef = themes.themes?.[selected];
  if (!themeDef) {
    console.warn(`Theme "${selected}" not found.`);
    element.removeAttribute("style");
    element.__themes.cacheKey = "default";
    return;
  }

  // Nur neu anwenden, wenn sich das Theme geändert hat
  if (element.__themes.cacheKey === selected) {
    return;
  }

  // Setze CSS-Variablen
  for (const [key, value] of Object.entries(themeDef)) {
    element.style.setProperty(`--${key}`, String(value));
  }

  // Cache aktualisieren
  element.__themes.cacheKey = selected;
};

export const UNAVAILABLE_STATES = ["unavailable", "unknown"];

export const STATES_OFF = [
  "closed",
  "unlocked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed",
];

export const SENSOR_DOMAINS = ["sensor"];

export const ALERT_DOMAINS = ["binary_sensor"];

export const COVER_DOMAINS = ["cover"];

export const CLIMATE_DOMAINS = ["climate"];

export const TOGGLE_DOMAINS = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
];

export const OTHER_DOMAINS = ["camera"];

export const domainOrder = [
  "alarm_control_panel",
  "siren",
  "light",
  "switch",
  "media_player",
  "climate",
  "air_quality",
  "humdifier",
  "vacuum",
  "lawn_mower",
  "cover",
  "lock",
  "camera",
  "fan",
  "valve",
  "water_heater",
  "person",
  "calendar",
  "remote",
  "scene",
  "device_tracker",
  "update",
  "notifications",
  "binary_sensor",
  "sensor",
  "script",
  "tags",
  "select",
  "automation",
  "button",
  "number",
  "conversation",
  "assist_satellite",
  "counter",
  "event",
  "group",
  "image",
  "image_processing",
  "input_boolean",
  "input_datetime",
  "input_number",
  "input_select",
  "input_text",
  "stt",
  "sun",
  "text",
  "date",
  "datetime",
  "time",
  "timer",
  "todo",
  "tts",
  "wake_word",
  "weather",
  "zone",
  "geo_location",
];

export const DEVICE_CLASSES = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"],
};

export type DomainType =
  | "light"
  | "switch"
  | "fan"
  | "climate"
  | "media_player"
  | "lock"
  | "vacuum"
  | "cover"
  | "binary_sensor";

export const DOMAIN_ICONS = {
  light: { on: "mdi:lightbulb-multiple", off: "mdi:lightbulb-multiple-off" },
  switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  climate: { on: "mdi:fan", off: "mdi:fan-off" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  lock: { on: "mdi:lock", off: "mdi:lock-open-variant" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  binary_sensor: {
    motion: "mdi:motion-sensor",
    moisture: "mdi:water-alert",
    window: "mdi:window-open",
    door: "mdi:door-open",
    lock: "mdi:lock",
    presence: "mdi:home",
    occupancy: "mdi:seat",
    vibration: "mdi:vibrate",
    opening: "mdi:shield-lock-open",
    garage_door: "mdi:garage-open",
    problem: "mdi:alert-circle",
    smoke: "mdi:smoke-detector",
    running: "mdi:play",
    plug: "mdi:power-plug",
    power: "mdi:power",
    battery: "mdi:battery",
    battery_charging: "mdi:battery-charging",
    gas: "mdi:gas-cylinder",
    carbon_monoxide: "mdi:molecule-co",
    cold: "mdi:snowflake",
    heat: "mdi:weather-sunny",
    connectivity: "mdi:connection",
    safety: "mdi:shield-alert",
    sound: "mdi:volume-high",
    update: "mdi:autorenew",
    tamper: "mdi:shield-home",
    light: "mdi:lightbulb",
    moving: "mdi:car",
  },
  cover: {
    garage: "mdi:garage",
    door: "mdi:door-closed",
    gate: "mdi:gate",
    blind: "mdi:blinds",
    curtain: "mdi:curtains-closed",
    damper: "mdi:valve-closed",
    awning: "mdi:awning-outline",
    shutter: "mdi:window-shutter",
    shade: "mdi:roller-shade-closed",
    window: "mdi:window-closed",
  },
};

export const DEFAULT_ASPECT_RATIO = "16:5";
