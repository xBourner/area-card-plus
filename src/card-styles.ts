import memoizeOne from "memoize-one";
import { css } from "lit";

export const parseCss = (
  css?: string | Record<string, any>,
  styleCache?: Map<string, Record<string, string>>
): Record<string, string> => {
  if (!css) return {};

  if (typeof css === "object") {
    return Object.entries(css).reduce((acc, [key, value]) => {
      const finalKey = key.startsWith("--")
        ? key
        : key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[finalKey] = String(value);
      return acc;
    }, {} as Record<string, string>);
  }

  const key = css.trim();
  if (styleCache && styleCache.has(key)) return styleCache.get(key)!;

  const normalized = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n/g, " ");

  const obj = normalized
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s && s.includes(":"))
    .reduce((acc: Record<string, string>, rule: string) => {
      const parts = rule.split(":");
      const keyPart = parts[0];
      const valuePart = parts.slice(1).join(":");

      if (keyPart && valuePart !== undefined) {
        const trimmed = keyPart.trim();
        const finalKey = trimmed.startsWith("--")
          ? trimmed
          : trimmed.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[finalKey] = valuePart.trim();
      }
      return acc;
    }, {} as Record<string, string>);

  if (styleCache) {
    styleCache.set(key, obj);
  }
  return obj;
};

export const getParsedCss = (
  source?: string | Record<string, any>,
  customization?: any,
  styleCache?: Map<string, Record<string, string>>
): Record<string, string> => {
  if (customization && customization._parsedCss)
    return customization._parsedCss;
  if (!source) return {};
  return parseCss(source, styleCache);
};

export const computeIconStyles = memoizeOne(
  (
    isV2Design: boolean,
    rowSize: number,
    icon_css: string | Record<string, any> | undefined,
    area_icon_color: string | undefined,
    styleCache?: Map<string, Record<string, string>>
  ) => {
    const base = {
      ...(isV2Design && rowSize === 1 ? { "--mdc-icon-size": "20px" } : {}),
      ...(area_icon_color ? { color: `var(--${area_icon_color}-color)` } : {}),
    };

    if (!icon_css) return base;

    const cssRules = getParsedCss(icon_css, undefined, styleCache);

    return { ...base, ...cssRules };
  }
);

export const cardStyles = css`
  ha-card {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .header {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .picture {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  hui-image {
    height: 100%;
    width: 100%;
  }
  .sensors {
    --mdc-icon-size: 20px;
  }
  .sensor-value {
    vertical-align: middle;
  }
  .sensor-row {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  .icon-container {
    position: absolute;
    top: 16px;
    left: 16px;
    color: var(--primary-color);
    z-index: 1;
    pointer-events: none;
  }
  .icon-container.row {
    top: 25%;
  }
  .icon-container.v2 {
    top: 8px;
    left: 8px;
    border-radius: 50%;
  }
  .mirrored .icon-container {
    left: unset;
    right: 16px;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
  .content.row {
    flex-direction: column;
    justify-content: center;
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    position: absolute;
    top: 8px;
    right: 8px;
    gap: 7px;
  }
  .right.row {
    top: unset;
  }
  .mirrored .right {
    right: unset;
    left: 8px;
    flex-direction: row-reverse;
  }
  .alerts,
  .covers,
  .custom_buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: -3px;
    gap: 2px;
  }
  .alerts.row,
  .covers.row,
  .custom_buttons.row {
    flex-direction: row-reverse;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-right: -3px;
  }
  .buttons.row {
    flex-direction: row-reverse;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 8px;
    left: 16px;
  }
  .bottom.row {
    flex-direction: row;
    left: calc(var(--row-size, 3) * 20px + 25px);
    bottom: unset;
    align-items: baseline;
    gap: 5px;
  }
  .mirrored .bottom.row {
    flex-direction: row-reverse;
    right: calc(var(--row-size, 3) * 20px + 25px) !important;
  }
  .mirrored .bottom {
    left: unset;
    right: 16px;
    text-align: end;
  }
  .name {
    font-weight: bold;
    margin-bottom: 8px;
    z-index: 1;
  }
  .name.row {
    margin-bottom: 0;
  }
  .icon-with-count {
    display: flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: solid 0.025rem rgba(var(--rgb-primary-text-color), 0.15);
    padding: 1px;
    border-radius: 5px;
    --mdc-icon-size: 20px;
    pointer-events: auto;
  }
  .icon-with-count > * {
    pointer-events: none;
  }

  .toggle-on {
    color: var(--primary-text-color);
  }
  .toggle-off {
    color: var(--secondary-text-color) !important;
  }
  .off {
    color: var(--secondary-text-color);
  }
  .navigate {
    cursor: pointer;
  }
  .hover:hover {
    background-color: rgba(var(--rgb-primary-text-color), 0.15);
  }
  .text-small {
    font-size: 0.9em;
  }
  .text-medium {
    font-size: 1em;
  }
  .text-large {
    font-size: 1.3em;
  }
  .v2 .covers {
    flex-direction: row-reverse;
  }
  .mirrored .v2 .covers {
    flex-direction: row;
  }
  .v2 .custom_buttons {
    flex-direction: row-reverse;
  }
  .mirrored .v2 .custom_buttons {
    flex-direction: row;
  }
  .v2 .alerts {
    flex-direction: row-reverse;
  }
  .mirrored .v2 .areas {
    flex-direction: row;
  }
  .v2 .buttons {
    flex-direction: row-reverse;
  }
  .mirrored .v2 .buttons {
    flex-direction: row;
  }
  .mirrored .v2 .bottom {
    right: 105px !important;
    left: unset;
  }
  .v2 .right {
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: calc(var(--row-size, 3) * 3px) 8px;
    top: unset;
    min-height: 24px;
    pointer-events: none;
  }
  .v2 .bottom {
    left: calc(var(--row-size, 3) * 15px + 55px);
    top: calc(var(--row-size, 3) * 5px + 4px);
    bottom: unset;
  }
  .v2 .bottom.row {
    top: calc(var(--row-size, 3) * 8px + 12px);
    left: calc(var(--row-size, 3) * 15px + 55px);
  }

  .v2 .name {
    margin-bottom: calc(var(--row-size, 3) * 1.5px + 1px);
  }
  .v2 .name.row {
    margin-bottom: 0px;
  }

  @supports (--row-size: 1) {
    .icon-container ha-icon {
      --mdc-icon-size: calc(var(--row-size, 3) * 20px);
    }
    .icon-container.v2 ha-icon {
      --mdc-icon-size: calc(var(--row-size, 3) * 15px);
      border-radius: 50%;
      display: flex;
      padding: 16px;
      color: var(--card-background-color);
    }
  }

  @media (max-width: 768px) {
    .name {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-6px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
`;
