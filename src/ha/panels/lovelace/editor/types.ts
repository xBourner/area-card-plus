import type { ActionConfig } from "../../../data/lovelace";

export interface EditorTarget extends EventTarget {
  value?: string;
  index?: number;
  checked?: boolean;
  configValue?: string;
  type?: HTMLInputElement["type"];
  config: ActionConfig;
}

export interface SubElementEditorConfig {
  index?: number;
  saveElementConfig?: (elementConfig: any) => void;
  context?: any;
  type: "header" | "footer" | "row" | "feature" | "element" | "heading-badge";
}
