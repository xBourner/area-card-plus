import { AreaCardPlus } from "./card";
import { html, TemplateResult, nothing } from "lit";
import memoizeOne from "memoize-one";
import {
  EntityRegistryEntry,
  domainOrder,
  STATES_OFF,
  UNAVAILABLE_STATES,
} from "./helpers";
import type { HassEntity } from "home-assistant-js-websocket";
import {
  HomeAssistant,
  LovelaceCard,
  computeDomain,
} from "custom-card-helpers";
import { mdiClose } from "@mdi/js";
import { parse } from "yaml";

function createCard(
  cardConfig: { type: string; entity: string; [key: string]: any },
  card: AreaCardPlus
) {
  let cardElement: LovelaceCard;

  if (cardConfig.type.startsWith("custom:")) {
    const customType = cardConfig.type.replace("custom:", "");
    cardElement = document.createElement(customType) as LovelaceCard;
  } else {
    cardElement = document.createElement(
      `hui-${cardConfig.type}-card`
    ) as LovelaceCard;
  }

  if (cardElement) {
    cardElement.hass = card.hass;
    cardElement.setConfig(cardConfig);
    return cardElement;
  }

  return html`<p>Invalid Configuration for card type: ${cardConfig.type}</p>`;
}

function _closeDialog(this: AreaCardPlus): void {
  this.selectedDomain = null;
  this.selectedDeviceClass = null;
  this.selectedGroup = null;
  this._showPopup = false;

  const container = document.querySelector("home-assistant")?.shadowRoot;
  const dialog = container?.querySelector("ha-dialog");

  if (dialog && container?.contains(dialog)) {
    container.removeChild(dialog);
  }
}

function getDomainName(
  card: AreaCardPlus,
  domain: string,
  deviceClass?: string
): string {
  if (domain === "scene") {
    return "Scene";
  }

  if (domain === "binary_sensor" || domain === "sensor" || domain === "cover") {
    return deviceClass
      ? card.hass!.localize(
          `component.${domain}.entity_component.${deviceClass}.name`
        )
      : card.hass!.localize(`component.${domain}.entity_component._.name`);
  }

  return card.hass!.localize(`component.${domain}.entity_component._.name`);
}

export function renderPopup(card: AreaCardPlus): TemplateResult {
  // Hole alle relevanten Filterwerte
  const areaId = card._config!.area;
  const devicesInArea = card._devicesInArea(areaId, card._devices!);
  const registryEntities = card._entities!;
  const states = card.hass.states;
  const popupDomains = card._config?.popup_domains || [];
  const hiddenEntities = card._config?.hidden_entities || [];
  const extraEntities = card._config?.extra_entities || [];
  const labelFilter = card._config?.label;
  const hideUnavailable = card._config?.hide_unavailable;
  const categoryFilter = card._config?.category_filter;
  const selectedDomain = card._selectedDomain;
  const selectedDeviceClass = card._selectedDeviceClass;

  // Memoisierte Funktion für Entities nach allen Filtern
  const filteredEntitiesByArea = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      states: HomeAssistant["states"],
      popupDomains: string[],
      hiddenEntities: string[],
      extraEntities: string[],
      labelFilter: string[] | undefined,
      hideUnavailable: boolean | undefined,
      categoryFilter: string | undefined,
      selectedDomain: string | null,
      selectedDeviceClass: string | null
    ) => {
      // Hilfsfunktion für Kategorie-Filter
      const filterByCategory = (entityId: string) => {
        if (!categoryFilter) return true;
        const entry = registryEntities.find((e) => e.entity_id === entityId);
        if (!entry?.entity_category) return true;
        if (categoryFilter === "config")
          return entry.entity_category !== "config";
        if (categoryFilter === "diagnostic")
          return entry.entity_category !== "diagnostic";
        if (categoryFilter === "config+diagnostic") {
          return (
            entry.entity_category !== "config" &&
            entry.entity_category !== "diagnostic"
          );
        }
        return true;
      };

      // Hilfsfunktion für DeviceClass-Filter
      const filterByDeviceClass = (entity: HassEntity) => {
        if (!selectedDeviceClass) return true;
        return entity.attributes.device_class === selectedDeviceClass;
      };

      // Entities im Bereich filtern
      const entitiesInArea = registryEntities.reduce<string[]>((acc, entry) => {
        if (
          !entry.hidden_by &&
          (entry.area_id
            ? entry.area_id === areaId
            : entry.device_id && devicesInArea.has(entry.device_id)) &&
          (!labelFilter ||
            (entry.labels && entry.labels.some((l) => labelFilter.includes(l))))
        ) {
          const entityId = entry.entity_id;
          if (
            !hiddenEntities.includes(entityId) &&
            filterByCategory(entityId) &&
            (!hideUnavailable ||
              !UNAVAILABLE_STATES.includes(states[entityId]?.state))
          ) {
            acc.push(entityId);
          }
        }
        return acc;
      }, []);

      // Entities nach Domain gruppieren und DeviceClass filtern
      const entitiesByArea: { [domain: string]: HassEntity[] } = {};

      for (const entityId of entitiesInArea) {
        const domain = computeDomain(entityId);

        if (popupDomains.length > 0 && !popupDomains.includes(domain)) {
          continue;
        }

        const stateObj: HassEntity | undefined = states[entityId];
        if (!stateObj) continue;
        if (!filterByDeviceClass(stateObj)) continue;

        if (!(domain in entitiesByArea)) {
          entitiesByArea[domain] = [];
        }
        entitiesByArea[domain].push(stateObj);
      }

      // Extra Entities hinzufügen (sofern sie nicht schon enthalten sind)
      for (const extraEntity of extraEntities) {
        const domain = computeDomain(extraEntity);

        if (!(domain in entitiesByArea)) {
          entitiesByArea[domain] = [];
        }

        const stateObj: HassEntity | undefined = states[extraEntity];
        if (
          stateObj &&
          !entitiesByArea[domain].some((e) => e.entity_id === extraEntity)
        ) {
          if (filterByCategory(extraEntity) && filterByDeviceClass(stateObj)) {
            entitiesByArea[domain].push(stateObj);
          }
        }
      }

      // Domains sortieren
      const sortOrder = popupDomains.length > 0 ? popupDomains : domainOrder;
      const sortedEntitiesByArea = Object.entries(entitiesByArea)
        .sort(([domainA], [domainB]) => {
          const indexA = sortOrder.indexOf(domainA);
          const indexB = sortOrder.indexOf(domainB);

          const adjustedIndexA = indexA === -1 ? sortOrder.length : indexA;
          const adjustedIndexB = indexB === -1 ? sortOrder.length : indexB;

          return adjustedIndexA - adjustedIndexB;
        })
        .reduce((acc, [domain, entities]) => {
          const sortedEntities = entities.sort((a, b) => {
            const stateA = a.state;
            const stateB = b.state;

            const getGroup = (state: string) => {
              if (
                !STATES_OFF.includes(state) &&
                !UNAVAILABLE_STATES.includes(state)
              ) {
                return 0;
              } else if (
                STATES_OFF.includes(state) &&
                !UNAVAILABLE_STATES.includes(state)
              ) {
                return 1;
              } else {
                return 2;
              }
            };

            const groupA = getGroup(stateA);
            const groupB = getGroup(stateB);

            if (groupA !== groupB) {
              return groupA - groupB;
            }

            return a.entity_id.localeCompare(b.entity_id);
          });

          acc[domain] = sortedEntities;
          return acc;
        }, {} as { [domain: string]: HassEntity[] });

      // Wenn ein spezifischer Domain-Filter gesetzt ist, nur diese Domain zurückgeben
      if (selectedDomain) {
        return {
          [selectedDomain]: sortedEntitiesByArea[selectedDomain] || [],
        };
      }

      return sortedEntitiesByArea;
    }
  );

  // Memoized Entities holen
  const entsByArea = filteredEntitiesByArea(
    areaId,
    devicesInArea,
    registryEntities,
    states,
    popupDomains,
    hiddenEntities,
    extraEntities,
    labelFilter,
    hideUnavailable,
    categoryFilter,
    selectedDomain,
    selectedDeviceClass
  );

  const area = card._area(card._config!.area, card._areas!);
  let columns = card._config?.columns ? card._config.columns : 4;

  // Spaltenberechnung wie gehabt
  let maxEntityCount = 0;
  Object.entries(entsByArea).forEach(([domain, entities]) => {
    const entityCount = entities.length;
    if (entityCount > maxEntityCount) {
      maxEntityCount = entityCount;
    }
  });

  if (maxEntityCount === 1) columns = 1;
  else if (maxEntityCount === 2) columns = Math.min(columns, 2);
  else if (maxEntityCount === 3) columns = Math.min(columns, 3);
  else columns = Math.min(columns, 4);

  card.style.setProperty("--columns", columns.toString());

  const styleBlock = card._isMobile ? mobileStyles : desktopStyles;

  return html`
    <ha-dialog
      id="more-info-dialog"
      style="--columns: ${columns};"
      open
      @closed="${_closeDialog}"
    >
      <style>
        ${styleBlock}
      </style>
      <div class="dialog-header">
        <ha-icon-button
          slot="navigationIcon"
          .path=${mdiClose}
          @click=${_closeDialog}
          .label=${card.hass!.localize("ui.common.close")}
        ></ha-icon-button>
        <div slot="title">
          <h3>${card._config?.area_name || area?.name}</h3>
        </div>
      </div>

      <div class="tile-container">
        ${Object.entries(entsByArea).map(([domain, entities]) =>
          entities.length > 0
            ? html`
                <div class="domain-group">
                  <h4>
                    ${domain === "binary_sensor" ||
                    domain === "sensor" ||
                    domain === "cover"
                      ? getDomainName(card, domain, card._selectedDeviceClass)
                      : getDomainName(card, domain)}
                  </h4>
                  <div class="domain-entities">
                    ${entities.map((entity: HassEntity) => {
                      const customization =
                        card._config?.customization_popup?.find(
                          (c: any) => c.type === domain
                        );

                      let cardType: string | undefined;
                      let cardFeatures: Record<string, any> | undefined =
                        undefined;

                      if (customization?.card) {
                        try {
                          const parsedCard = parse(customization.card);
                          cardType = parsedCard.type;
                          const { type, ...restOfCard } = parsedCard;
                          cardFeatures = restOfCard;
                        } catch (e) {
                          console.error("Error parsing card configuration:", e);
                        }
                      }

                      const cardConfig = cardType
                        ? {
                            type: cardType,
                            entity: entity.entity_id,
                            ...cardFeatures,
                          }
                        : {
                            type: "tile",
                            entity: entity.entity_id,
                            ...(domain === "alarm_control_panel" && {
                              features: [
                                {
                                  type: "alarm-modes",
                                  modes: [
                                    "armed_home",
                                    "armed_away",
                                    "armed_night",
                                    "armed_vacation",
                                    "armed_custom_bypass",
                                    "disarmed",
                                  ],
                                },
                              ],
                            }),
                            ...(domain === "light" && {
                              features: [{ type: "light-brightness" }],
                            }),
                            ...(domain === "cover" && {
                              features: [
                                { type: "cover-open-close" },
                                { type: "cover-position" },
                              ],
                            }),
                            ...(domain === "vacuum" && {
                              features: [
                                {
                                  type: "vacuum-commands",
                                  commands: [
                                    "start_pause",
                                    "stop",
                                    "clean_spot",
                                    "locate",
                                    "return_home",
                                  ],
                                },
                              ],
                            }),
                            ...(domain === "climate" && {
                              features: [
                                {
                                  type: "climate-hvac-modes",
                                  hvac_modes: [
                                    "auto",
                                    "heat_cool",
                                    "heat",
                                    "cool",
                                    "dry",
                                    "fan_only",
                                    "off",
                                  ],
                                },
                              ],
                            }),
                            ...(domain === "media_player" && {
                              features: [
                                { type: "media-player-volume-slider" },
                              ],
                            }),
                            ...(domain === "lock" && {
                              features: [{ type: "lock-commands" }],
                            }),
                            ...(domain === "fan" && {
                              features: [{ type: "fan-speed" }],
                            }),
                            ...(domain === "switch" && {
                              features: [{ type: "toggle" }],
                            }),
                            ...(domain === "counter" && {
                              features: [
                                {
                                  type: "counter-actions",
                                  actions: ["increment", "decrement", "reset"],
                                },
                              ],
                            }),
                            ...(domain === "update" && {
                              features: [
                                { type: "update-actions", backup: "ask" },
                              ],
                            }),
                          };

                      return html`
                        <div class="entity-card">
                          ${createCard(cardConfig, card)}
                        </div>
                      `;
                    })}
                  </div>
                </div>
              `
            : nothing
        )}
      </div>
    </ha-dialog>
  `;
}

const desktopStyles = `
  .tile-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .domain-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  .domain-group h4 {
    margin: 0;
    font-size: 1.2em;
  }
  .domain-entities {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 4px;
  }
  .entity-card {
    width: 22.5vw;
  }
  .dialog-header { 
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    align-items: center;
  }
  .dialog-header ha-icon-button { 
    margin-right: 10px;  
  }
  ha-dialog#more-info-dialog {
    --mdc-dialog-max-width: calc(22.5vw * var(--columns) + 3vw);
    overflow: hidden;
  }
`;

const mobileStyles = `
  .tile-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .domain-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  .domain-group h4 {
    margin: 0;
    font-size: 1.2em;
  }
  .domain-entities {
    display: grid;
    grid-template-columns: 1fr !important;
    gap: 4px;
  }
  .dialog-header { 
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    align-items: center;
  }    
  .entity-card {
    flex-basis: 100%;
    width: 100% !important;
    overflow: hidden;
  }
  ha-dialog#more-info-dialog {
    --mdc-dialog-min-width: 96vw;
    --mdc-dialog-max-width: 96vw;
    --columns: 1;
    max-width: 100%;
    padding: 16px;
    overflow: hidden;
  }
`;
