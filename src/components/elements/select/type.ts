export const STYLE = {
  modal: "modal",
  default: "default",
} as const;

export const STYLE_DISPLAY_WRAPPER_MAPS = {
  [STYLE.modal]: "bg-gray-100 rounded-md",
  [STYLE.default]: "bg-white border border-gray-200",
} as const;

export const STYLE_LIST_WRAPPER_MAPS = {
  [STYLE.default]: "bg-white",
  [STYLE.modal]: "bg-gray-50",
} as const;

export type TStyle = typeof STYLE[keyof typeof STYLE];

export type TSelectGeneralProps = {
  list: readonly string[];
  placeHolder?: string;
  style?: TStyle;
  isPortal?: boolean;
  className?: string;
  classNameDisplay?: string;
};

export type TSelectDefaultProps = {
  value: string;
  suffix?: string;
  onChange: (param: string) => void;
} & TSelectGeneralProps;

export type TSelectMultipleProps = {
  value: readonly string[];
  onChange: (value: readonly string[]) => void;
} & TSelectGeneralProps;
