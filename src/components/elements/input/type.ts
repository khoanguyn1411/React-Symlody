export const STYLE = {
  modal: "modal",
  default: "default",
  disable: "disable",
} as const;

export const STYLE_INPUT_DEFAULT = {
  [STYLE.modal]: "bg-gray-100",
  [STYLE.default]: "border",
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
};

export type TInputDefaultProps = {
  onInputSideEffect?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => TSideEffect;
} & TInputGeneralProps;

export type TInputTextAreaProps = {
  onInputSideEffect?: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => TSideEffect;
} & TInputGeneralProps;

export type TInputUnderLine = {
  onInputSideEffect?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => TSideEffect;
  label?: string;
} & TInputGeneralProps;
