import { ReactNode } from "react";

import { GlobalTypes } from "@/utils";

import { AlignedPlacement } from "../portal/type";

export const STYLE = {
  modal: "modal",
  default: "default",
  none: "none",
} as const;

export type TStyle = typeof STYLE[keyof typeof STYLE];

export const STYLE_DISPLAY_WRAPPER_MAPS = {
  [STYLE.modal]: "bg-gray-100 rounded-md",
  [STYLE.none]: "",
  [STYLE.default]: "bg-white border border-gray-200",
} as const;

export const STYLE_LIST_WRAPPER_MAPS = {
  [STYLE.default]: "bg-white",
  [STYLE.modal]: "bg-white",
} as const;

export type TOptionProps<T extends Record<string, any> = undefined> = {
  label: string;
  value: string;
  objectValue?: T;
  suffix?: string | JSX.Element;
  prefix?: string | JSX.Element;
};

export type TSelectGeneralProps = {
  placeHolder?: string;
  style?: TStyle;
  isPortal?: boolean;
  className?: string;
  classNameDisplay?: string;
  classNameList?: string;
  placement?: AlignedPlacement;
  isNoPaddingY?: boolean;
};

export type TSelectDefaultProps = {
  list: string[];
  value: string;
  suffix?: string;
  onChange: (param: string) => void;
} & TSelectGeneralProps;

export type TSelectMultipleProps = {
  list: TOptionProps[];
  value: string[];
  onChange: (value: string[]) => void;
} & TSelectGeneralProps;

export type TSelectCustomProps = {
  isShowArrow?: boolean;
  renderListItem?: ReactNode;
  isShowContent?: boolean;
  wrapperSelectRef?: React.MutableRefObject<HTMLDivElement>;
  setIsShowContent?: GlobalTypes.ReactStateAction<boolean>;
} & TSelectGeneralProps;
