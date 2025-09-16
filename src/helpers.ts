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

declare module "custom-card-helpers" {
  interface HomeAssistant {
    entities: { [id: string]: EntityRegistryEntry };
    devices: { [id: string]: DeviceRegistryEntry };
    areas: { [id: string]: AreaRegistryEntry };
    formatEntityState(stateObj: HassEntity, state?: string): string;
  }
}

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
  hidden?: boolean;
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

export function typeKey(domain: string, deviceClass?: string): string {
  return deviceClass ? `${_formatDomain(domain)} - ${deviceClass}` : domain;
}

export function _formatDomain(domain: string): string {
  return domain
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

export type UiAction =
  | Exclude<ActionConfig["action"], "fire-dom-event">
  | "perform-action";

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
  selectedTheme?: string,
  themeSettings?: Partial<{
    dark: boolean;
    primaryColor: string;
    accentColor: string;
  }>,
  main?: boolean
) => {
  const themeToApply = selectedTheme || (main ? themes?.theme : undefined);
  const darkMode =
    themeSettings?.dark !== undefined
      ? themeSettings.dark
      : themes?.darkMode || false;

  if (!element.__themes) {
    element.__themes = { cacheKey: null, keys: new Set<string>() };
  }

  let cacheKey = themeToApply || "";
  let themeRules: Record<string, string> = {};

  // Default theme: only use provided primary/accent colors, do not wipe inline styles
  if (themeToApply === "default") {
    const primaryColor = themeSettings?.primaryColor;
    const accentColor = themeSettings?.accentColor;

    if (primaryColor) {
      cacheKey = `${cacheKey}__primary_${primaryColor}`;
      themeRules["primary-color"] = String(primaryColor);
    }
    if (accentColor) {
      cacheKey = `${cacheKey}__accent_${accentColor}`;
      themeRules["accent-color"] = String(accentColor);
    }

    // If nothing changes and we already applied the same config, skip
    if (
      !primaryColor &&
      !accentColor &&
      element.__themes?.cacheKey === "default"
    ) {
      return;
    }
  }

  // Custom theme: merge base rules with dark/light mode specific overrides if present
  if (
    themeToApply &&
    themeToApply !== "default" &&
    themes?.themes?.[themeToApply]
  ) {
    const { modes, ...base } = themes.themes[themeToApply] || {};
    themeRules = { ...themeRules, ...base };
    if (modes) {
      if (darkMode && modes.dark) {
        themeRules = { ...themeRules, ...modes.dark };
      } else if (!darkMode && modes.light) {
        themeRules = { ...themeRules, ...modes.light };
      }
    }
  } else if (
    !themeToApply &&
    (!element.__themes?.keys ||
      (element.__themes.keys as Set<string>).size === 0)
  ) {
    // No theme to apply and nothing set previously
    return;
  }

  const prevKeys: Set<string> = element.__themes?.keys || new Set<string>();
  const newKeys = new Set<string>(Object.keys(themeRules));

  // If default theme with no explicit colors provided, clear previously set vars
  if (themeToApply === "default" && newKeys.size === 0) {
    for (const key of prevKeys) {
      try {
        element.style.removeProperty(`--${key}`);
      } catch {}
    }
    element.__themes = { cacheKey: "default", keys: new Set<string>() };
    return;
  }

  // If cacheKey unchanged and keys are identical, skip reapplying
  if (element.__themes?.cacheKey === cacheKey) {
    let same = true;
    if (prevKeys.size !== newKeys.size) {
      same = false;
    } else {
      for (const k of prevKeys) {
        if (!newKeys.has(k)) {
          same = false;
          break;
        }
      }
    }
    if (same) return;
  }

  // Remove variables that are no longer present
  for (const key of prevKeys) {
    if (!newKeys.has(key)) {
      try {
        element.style.removeProperty(`--${key}`);
      } catch {}
    }
  }

  // Apply new variables
  for (const [key, value] of Object.entries(themeRules)) {
    element.style.setProperty(`--${key}`, String(value));
  }

  element.__themes.cacheKey = cacheKey || null;
  element.__themes.keys = newKeys;
};

export function getFriendlyName(
  states: { [entity_id: string]: HassEntity },
  entityId: string
): string {
  return (states?.[entityId]?.attributes?.friendly_name as string) || entityId;
}

export function compareByFriendlyName(
  states: { [entity_id: string]: HassEntity },
  language?: string
): (a: string, b: string) => number {
  return (a: string, b: string) =>
    caseInsensitiveStringCompare(
      getFriendlyName(states, a),
      getFriendlyName(states, b),
      language
    );
}

export const UNAVAILABLE_STATES = ["unavailable", "unknown"];

export const STATES_OFF = [
  "closed",
  "locked",
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
  "script",
  "scene",
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
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  person: { on: "mdi:account", off: "mdi:account-off" },
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  vacuum_cleaner: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted",
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant",
  },
  event: { on: "mdi:calendar-star", off: "mdi:calendar-star" },
  group: {
    on: "mdi:google-circles-communities",
    off: "mdi:google-circles-communities",
  },
  image: { on: "mdi:image", off: "mdi:image-off" },
  image_processing: {
    on: "mdi:image-filter-center-focus",
    off: "mdi:image-filter-center-focus",
  },
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline",
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  binary_sensor: {
    on: "mdi:power-off",
    off: "mdi:power-off",
    motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
    moisture: { on: "mdi:water-alert", off: "mdi:water-off" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    lock: { on: "mdi:lock-open", off: "mdi:lock" },
    presence: { on: "mdi:home-outline", off: "mdi:home-export-outline" },
    occupancy: { on: "mdi:seat", off: "mdi:seat-outline" },
    vibration: { on: "mdi:vibrate", off: "mdi:vibrate-off" },
    opening: { on: "mdi:shield-lock-open", off: "mdi:shield-lock" },
    garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
    problem: {
      on: "mdi:alert-circle-outline",
      off: "mdi:alert-circle-check-outline",
    },
    smoke: {
      on: "mdi:smoke-detector-outline",
      off: "mdi:smoke-detector-off-outline",
    },
    running: { on: "mdi:play", off: "mdi:pause" },
    plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
    power: { on: "mdi:power", off: "mdi:power-off" },
    battery: { on: "mdi:battery-alert", off: "mdi:battery" },
    battery_charging: { on: "mdi:battery-charging", off: "mdi:battery-check" },
    gas: { on: "mdi:gas-station-outline", off: "mdi:gas-station-off-outline" },
    carbon_monoxide: { on: "mdi:molecule-co", off: "mdi:molecule-co" },
    cold: { on: "mdi:snowflake", off: "mdi:snowflake-off" },
    heat: { on: "mdi:weather-sunny", off: "mdi:weather-sunny-off" },
    connectivity: { on: "mdi:connection", off: "mdi:connection" },
    safety: { on: "mdi:shield-alert-outline", off: "mdi:shield-check-outline" },
    sound: { on: "mdi:volume-high", off: "mdi:volume-off" },
    update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
    tamper: { on: "mdi:shield-home", off: "mdi:shield-home" },
    light: { on: "mdi:lightbulb-outline", off: "mdi:lightbulb-off-outline" },
    moving: { on: "mdi:car", off: "mdi:car-off" },
  },
  cover: {
    on: "mdi:garage-open",
    off: "mdi:garage",
    garage: { on: "mdi:garage-open", off: "mdi:garage" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    gate: { on: "mdi:gate-open", off: "mdi:gate" },
    blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
    curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
    damper: { on: "mdi:valve-open", off: "mdi:valve-closed" },
    awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" },
    shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
    shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
  },
};

export const DEFAULT_ASPECT_RATIO = "16:5";
