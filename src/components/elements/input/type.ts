export const STYLE = {
  modal: "modal",
  default: "default",
  disable: "disable",
  none: "none",
} as const;

export const STYLE_INPUT_DEFAULT = {
  [STYLE.modal]: "bg-gray-100 border-gray-200 text-black",
  [STYLE.default]: "border border-gray-200 text-black",
  [STYLE.none]: "bg-transparent",
} as const;

export const STYLE_INPUT_TEXT_AREA = {
  [STYLE.modal]: "bg-gray-100",
  [STYLE.default]: "border-[1.5px]",
} as const;

export type TStyle = typeof STYLE[keyof typeof STYLE];

type TSideEffect = {
  newValue: string;
};
export type TInputGeneralProps = {
  value: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  style?: TStyle;
  className?: string;
  disable?: boolean;
  onChange: (value: string) => void;
  onInputSideEffect?: (value: string) => TSideEffect;
};

export type TInputDefaultProps = {
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & TInputGeneralProps;

export type TInputTextAreaProps = {
  otherProps?: React.InputHTMLAttributes<HTMLTextAreaElement>;
  height?: string;
} & TInputGeneralProps;

export type TInputUnderLine = {
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
  label?: string;
} & TInputGeneralProps;
