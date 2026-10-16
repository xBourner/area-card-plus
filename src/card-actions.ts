import { handleAction, hasAction, actionHandler } from "./ha";

type ActionKind = "domain" | "alert" | "cover" | "sensor";

/** [service when something is on, service when all are off]; default turn_off/turn_on. */
const TOGGLE_SERVICES: Record<string, [string, string]> = {
  media_player: ["media_pause", "media_play"],
  lock: ["lock", "unlock"],
  vacuum: ["stop", "start"],
};

const cachedActionHandler = (
  card: any,
  kind: ActionKind,
  domain: string,
  deviceClass?: string
): ((ev: CustomEvent) => void) => {
  const key = deviceClass ? `${kind}|${domain}|${deviceClass}` : `${kind}|${domain}`;
  if (!card._actionHandlerCache.has(key)) {
    card._actionHandlerCache.set(key, makeActionHandler(card, kind, domain, deviceClass));
  }
  return card._actionHandlerCache.get(key)!;
};

export const handleDomainAction = (card: any, domain: string) =>
  cachedActionHandler(card, "domain", domain);

export const handleAlertAction = (card: any, domain: string, deviceClass: string) =>
  cachedActionHandler(card, "alert", domain, deviceClass);

export const handleCoverAction = (card: any, domain: string, deviceClass: string) =>
  cachedActionHandler(card, "cover", domain, deviceClass);

export const handleSensorAction = (card: any, domain: string, deviceClass: string) =>
  cachedActionHandler(card, "sensor", domain, deviceClass);

export const makeActionHandler = (
  card: any,
  kind: ActionKind | "custom_button",
  domain: string,
  deviceClass?: string,
  customButton?: any
): ((ev: CustomEvent) => void) => {
  return (ev: CustomEvent) => {
    ev.stopPropagation();

    let customization: any;
    if (kind === "domain") {
      customization = card._customizationDomainMap.get(domain);
    } else if (kind === "alert") {
      customization = card._customizationAlertMap.get(deviceClass || "");
    } else if (kind === "cover") {
      customization = card._customizationCoverMap.get(deviceClass || "");
    } else if (kind === "sensor") {
      customization = card._customizationSensorMap.get(deviceClass || "");
    } else if (kind === "custom_button") {
      customization = customButton;
    }

    const actionConfig =
      ev.detail.action === "tap"
        ? customization?.tap_action
        : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
            ? customization?.double_tap_action
            : null;

    if (kind === "domain") {
      const isToggle =
        actionConfig === "toggle" || actionConfig?.action === "toggle";
      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (isToggle) {
        const [offService, onService] = TOGGLE_SERVICES[domain] ?? [
          "turn_off",
          "turn_on",
        ];
        card.hass.callService(
          domain,
          card._isOn(domain) ? offService : onService,
          undefined,
          { area_id: card._config!.area }
        );
        return;
      } else if (isMoreInfo || actionConfig === undefined) {
        if (domain !== "binary_sensor" && domain !== "sensor") {
          if (domain === "climate") {
            const displayMode = customization?.display_mode;
            if (displayMode === "icon" || displayMode === "text_icon") {
              card._showPopupForDomain(domain);
            }
          } else {
            card._showPopupForDomain(domain);
          }
        }
        return;
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(card, card.hass!, config, ev.detail.action!);
      return;
    }

    const isMoreInfo =
      actionConfig === "more-info" || actionConfig?.action === "more-info";

    if (kind === "alert") {
      if (isMoreInfo || actionConfig === undefined) {
        if (domain === "binary_sensor") {
          card._showPopupForDomain(domain, deviceClass);
        }
        return;
      }
    } else if (kind === "cover") {
      if (isMoreInfo || actionConfig === undefined) {
        if (domain === "cover") {
          card._showPopupForDomain(domain, deviceClass);
        }
        return;
      }
    } else if (kind === "sensor") {
      if (isMoreInfo) {
        if (domain === "sensor") {
          card._showPopupForDomain(domain, deviceClass);
        }
        return;
      }
      if (ev.detail.action === "tap" && !customization?.tap_action) {
        return;
      }
    }

    const config = {
      entity: customization?.entity,
      tap_action: customization?.tap_action,
      hold_action: customization?.hold_action,
      double_tap_action: customization?.double_tap_action,
    };

    if (kind === "custom_button" && customButton?.entity) {
      if (isMoreInfo) {
        const entityId = customButton.entity;
        const event = new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        });
        card.dispatchEvent(event);
        return;
      }
    }

    handleAction(card, card.hass!, config, ev.detail.action!);
  };
};

export const renderActionHandler = (
  customization: any,
  defaultConfig?: any
) => {
  return actionHandler({
    hasHold: hasAction(
      customization?.hold_action || defaultConfig?.hold_action
    ),
    hasDoubleClick: hasAction(
      customization?.double_tap_action || defaultConfig?.double_tap_action
    ),
  });
};
