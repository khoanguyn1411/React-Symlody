export const STYLE = {
  modal: "modal",
  default: "default",
} as const;

export type TStyle = typeof STYLE[keyof typeof STYLE];

export const STYLE_MAP = {
  [STYLE.modal]: "bg-gray-100 rounded-md",
  [STYLE.default]: "bg-white border border-gray-200",
} as const;
