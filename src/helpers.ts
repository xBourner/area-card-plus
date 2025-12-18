import memoizeOne from "memoize-one";
import { HomeAssistant } from "./ha";
import { HassEntity } from "home-assistant-js-websocket";
import {
  ALERT_DOMAINS,
  CLIMATE_DOMAINS,
  COVER_DOMAINS,
  DOMAIN_ICONS,
  DomainType,
  OTHER_DOMAINS,
  SENSOR_DOMAINS,
  TOGGLE_DOMAINS,
} from "./const";
import {
  caseInsensitiveStringCompare,
  computeDomain,
  formatNumber,
  isNumericState,
  blankBeforeUnit,
} from "./ha";

export const getFriendlyName = (
  states: { [entity_id: string]: HassEntity },
  entityId: string
): string => {
  return (states?.[entityId]?.attributes?.friendly_name as string) || entityId;
};

export const compareByFriendlyName = (
  states: { [entity_id: string]: HassEntity },
  language?: string
): ((a: string, b: string) => number) => {
  return (a: string, b: string) =>
    caseInsensitiveStringCompare(
      getFriendlyName(states, a),
      getFriendlyName(states, b),
      language
    );
};

export const getEntitiesIndex = memoizeOne(
  (
    entities: HomeAssistant["entities"],
    devices: HomeAssistant["devices"]
  ): Map<string, Set<string>> => {
    const index = new Map<string, Set<string>>();

    const add = (areaId: string, entityId: string) => {
      if (!index.has(areaId)) index.set(areaId, new Set());
      index.get(areaId)!.add(entityId);
    };

    for (const entity of Object.values(entities)) {
      if (entity.area_id) {
        add(entity.area_id, entity.entity_id);
      } else if (entity.device_id) {
        const device = devices[entity.device_id];
        if (device && device.area_id) {
          add(device.area_id, entity.entity_id);
        }
      }
    }
    return index;
  }
);

export const getAreaEntityIds = memoizeOne(
  (
    areaId: string,
    devicesInArea: Set<string>,
    entities: HomeAssistant["entities"],
    hiddenEntitiesSet: Set<string>,
    labelConfig: string[] | undefined,
    index?: Map<string, Set<string>>
  ): string[] => {
    let candidates: string[] = [];

    if (index && index.has(areaId)) {
      candidates = Array.from(index.get(areaId)!);
    } else {
      candidates = Object.values(entities)
        .filter((e: any) => {
          if (!e.area_id && !e.device_id) return false;
          if (e.area_id) {
            if (e.area_id !== areaId) return false;
          } else {
            if (!devicesInArea.has(e.device_id)) return false;
          }
          return true;
        })
        .map((e: any) => e.entity_id);
    }

    return candidates.filter((id) => {
      const e: any = entities[id];
      if (!e) return false;

      if (e.hidden || hiddenEntitiesSet.has(id)) return false;

      if (Array.isArray(labelConfig) && labelConfig.length > 0) {
        return (
          e.labels && e.labels.some((l: string) => labelConfig.includes(l))
        );
      }
      return true;
    });
  }
);

export const getEntitiesByDomain = memoizeOne(
  (
    entityIds: string[],
    states: HomeAssistant["states"],
    deviceClasses: { [key: string]: string[] }
  ) => {
    const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

    for (const entity of entityIds) {
      const domain = computeDomain(entity);

      if (
        !TOGGLE_DOMAINS.includes(domain) &&
        !SENSOR_DOMAINS.includes(domain) &&
        !ALERT_DOMAINS.includes(domain) &&
        !COVER_DOMAINS.includes(domain) &&
        !OTHER_DOMAINS.includes(domain) &&
        !CLIMATE_DOMAINS.includes(domain)
      ) {
        continue;
      }

      const stateObj: HassEntity | undefined = states[entity];
      if (!stateObj) {
        continue;
      }

      if (
        (ALERT_DOMAINS.includes(domain) ||
          SENSOR_DOMAINS.includes(domain) ||
          COVER_DOMAINS.includes(domain)) &&
        !deviceClasses[domain].includes(stateObj.attributes.device_class || "")
      ) {
        continue;
      }

      if (!(domain in entitiesByDomain)) {
        entitiesByDomain[domain] = [];
      }
      entitiesByDomain[domain].push(stateObj);
    }

    return entitiesByDomain;
  }
);

export const getDevicesInArea = memoizeOne(
  (areaId: string | undefined, devices: Record<string, any> | undefined) =>
    new Set(
      areaId && devices
        ? Object.values(devices).reduce<string[]>((acc, device) => {
            if (device.area_id === areaId) acc.push(device.id);
            return acc;
          }, [])
        : []
    )
);

export const findArea = memoizeOne(
  (
    areaId: string | undefined,
    areas: any[] | Record<string, any> | undefined
  ) => {
    const areaList: any[] = Array.isArray(areas)
      ? areas
      : areas
      ? Object.values(areas)
      : [];
    return areaList.find((area) => area.area_id === areaId) || null;
  }
);

export const filterByCategory = (
  entityId: string,
  hassEntities: HomeAssistant["entities"],
  categoryFilter?: string
): boolean => {
  if (!categoryFilter) return true;

  const entry: any = (hassEntities as any)?.[entityId];
  if (!entry) return true;

  const cat: string | null =
    typeof entry.entity_category === "string" ? entry.entity_category : null;

  if (!cat) return true;

  switch (categoryFilter) {
    case "config":
      return cat !== "config";
    case "diagnostic":
      return cat !== "diagnostic";
    case "config+diagnostic":
      return cat !== "config" && cat !== "diagnostic";
    default:
      return true;
  }
};

export const calculateAverage = (
  domain: string,
  deviceClass: string | undefined,
  entities: HassEntity[],
  locale: any
): string | undefined => {
  if (!entities || entities.length === 0) {
    return undefined;
  }

  let uom: any;
  const values = entities.filter((entity) => {
    if (!isNumericState(entity) || isNaN(Number(entity.state))) {
      return false;
    }
    if (!uom) {
      uom = entity.attributes.unit_of_measurement;
      return true;
    }
    return entity.attributes.unit_of_measurement === uom;
  });

  if (!values.length) {
    return undefined;
  }

  const sum = values.reduce((total, entity) => total + Number(entity.state), 0);

  if (deviceClass === "power") {
    return `${formatNumber(sum, locale, {
      maximumFractionDigits: 1,
    })}${uom ? blankBeforeUnit(uom, locale) : ""}${uom || ""}`;
  } else {
    return `${formatNumber(sum / values.length, locale, {
      maximumFractionDigits: 1,
    })}${uom ? blankBeforeUnit(uom, locale) : ""}${uom || ""}`;
  }
};

export const getIcon = (
  domain: DomainType,
  on: boolean,
  deviceClass?: string
): string => {
  if (domain in DOMAIN_ICONS) {
    const icons = DOMAIN_ICONS[domain] as any;

    if (deviceClass && typeof icons === "object") {
      const dc = (icons as Record<string, any>)[deviceClass];
      if (dc) {
        if (typeof dc === "string") return dc;
        if (typeof dc === "object" && "on" in dc && "off" in dc)
          return on ? dc.on : dc.off;
      }
    }

    if (typeof icons === "object" && "on" in icons && "off" in icons) {
      return on ? icons.on : icons.off;
    }

    if (typeof icons === "string") return icons;
  }

  return "";
};
