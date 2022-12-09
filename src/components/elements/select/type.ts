import { ReactNode } from "react";

import { GlobalTypes } from "@/utils";
import { PrimitiveType } from "@/utils/types";

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

export type TOptionProps<
  T extends Record<string, any> = undefined,
  E extends PrimitiveType = string
> = {
  label: string;
  value: E;
  objectValue?: T;
  suffix?: string | JSX.Element;
  prefix?: string | JSX.Element;
};

export type TSelectCustomProps = {
  placeHolder?: ReactNode;
  style?: TStyle;
  isPortal?: boolean;
  className?: string;
  classNameDisplay?: string;
  classNameList?: string;
  placement?: AlignedPlacement;
  isNoPaddingY?: boolean;

  isShowArrow?: boolean;
  isNonePadding?: boolean;
  renderListItem?: ReactNode;
  isShowContent?: boolean;
  wrapperSelectRef?: React.MutableRefObject<HTMLDivElement>;
  setIsShowContent?: GlobalTypes.ReactStateAction<boolean>;
};
