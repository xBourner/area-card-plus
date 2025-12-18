import { HassEntity } from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import { ALERT_DOMAINS, COVER_DOMAINS, SENSOR_DOMAINS } from "./const";

export const computeCovers = memoizeOne(
  (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
    COVER_DOMAINS.flatMap((domain) => {
      if (!(domain in entitiesByDomain)) return [] as any[];
      return deviceClasses[domain].map((deviceClass: string) => ({
        domain,
        deviceClass,
      }));
    })
);

export const computeAlerts = memoizeOne(
  (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
    ALERT_DOMAINS.flatMap((domain) => {
      if (!(domain in entitiesByDomain)) return [] as any[];
      return deviceClasses[domain].map((deviceClass: string) => ({
        domain,
        deviceClass,
      }));
    })
);

export const computeSensors = memoizeOne(
  (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
    SENSOR_DOMAINS.flatMap((domain) => {
      if (!(domain in entitiesByDomain)) return [] as any[];
      return deviceClasses[domain].map(
        (deviceClass: string, index: number) => ({
          domain,
          deviceClass,
          index,
        })
      );
    })
);

export const computeButtons = memoizeOne(
  (
    toggle_domains: string[] | undefined,
    entitiesByDomain: { [k: string]: HassEntity[] }
  ) =>
    (toggle_domains || []).filter(
      (domain: string) => domain in entitiesByDomain
    )
);

export const computeCameraEntity = memoizeOne(
  (
    show_camera: boolean | undefined,
    entitiesByDomain: { [k: string]: HassEntity[] }
  ) => {
    if (show_camera && "camera" in entitiesByDomain)
      return entitiesByDomain.camera[0]?.entity_id;
    return undefined;
  }
);
