import { HassEntity } from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import {
  ALERT_DOMAINS,
  CLIMATE_DOMAINS,
  COVER_DOMAINS,
  SENSOR_DOMAINS,
  TOGGLE_DOMAINS,
} from "./const";
import { UNAVAILABLE_STATES } from "./ha";
import { withNewDomains } from "./helpers";

/** One { domain, deviceClass } item per configured device class of the domains present in the area. */
const deviceClassItems = (domains: string[]) =>
  memoizeOne(
    (
      entitiesByDomain: { [k: string]: HassEntity[] },
      deviceClasses: { [domain: string]: string[] }
    ): Array<{ domain: string; deviceClass: string }> =>
      domains.flatMap((domain) =>
        domain in entitiesByDomain
          ? deviceClasses[domain].map((deviceClass) => ({ domain, deviceClass }))
          : []
      )
  );

export const computeCovers = deviceClassItems(COVER_DOMAINS);
export const computeAlerts = deviceClassItems(ALERT_DOMAINS);
export const computeSensors = deviceClassItems(SENSOR_DOMAINS);

/** Shown without an explicit selection, and appended when new; scene and script must be picked explicitly. */
export const AUTO_TOGGLE_DOMAINS = [...TOGGLE_DOMAINS, ...CLIMATE_DOMAINS].filter(
  (d) => d !== "scene" && d !== "script"
);

export const computeButtons = memoizeOne(
  (
    toggle_domains: string[] | undefined,
    hidden_toggle_domains: string[] | undefined,
    entitiesByDomain: { [k: string]: HassEntity[] }
  ): string[] => {
    // a domain whose entities are all unavailable is treated as absent
    const available = (d: string) =>
      entitiesByDomain[d]?.some((e) => !UNAVAILABLE_STATES.includes(e.state));
    const present = AUTO_TOGGLE_DOMAINS.filter(available);
    if (!toggle_domains) return present;
    return withNewDomains(toggle_domains, hidden_toggle_domains, present).filter(
      available
    );
  }
);
