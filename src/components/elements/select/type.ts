import { ReactNode } from "react";

import { AppReact, Primitive, RecordObject } from "@/utils/types";

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
  [STYLE.modal]: "bg-gray-50",
} as const;

export type TOptionProps<
  T extends RecordObject = null,
  E extends Primitive = string
> = {
  label: string;
  value: E;
  objectValue?: T;
  suffix?: string | JSX.Element;
  prefix?: string | JSX.Element;
};

export type TSelectBaseProps = {
  placeHolder?: ReactNode;
  style?: TStyle;
  maxHeight?: number;
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
  setIsShowContent?: AppReact.State.Dispatch<boolean>;
};
