import { HassEntity } from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import { ALERT_DOMAINS, COVER_DOMAINS, SENSOR_DOMAINS } from "./const";

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

export const computeButtons = memoizeOne(
  (
    toggle_domains: string[] | undefined,
    entitiesByDomain: { [k: string]: HassEntity[] }
  ) =>
    (toggle_domains || []).filter(
      (domain: string) => domain in entitiesByDomain
    )
);
