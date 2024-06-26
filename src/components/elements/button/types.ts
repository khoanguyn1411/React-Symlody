import { ReactNode } from "react";

import { AppReact } from "@/utils/types";

export const STYLE_MAPS = {
  none: "h-[fit-content]",
  default: "bg-primary-800 hover:bg-primary-900 text-white",
  outline:
    "border-primary-800 bg-white text-primary-800 border hover:bg-primary-50",
  disable: "bg-gray-400 text-white cursor-not-allowed",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  text: "text-gray-500 border-gray-400 hover:bg-gray-50 border",
} as const;

export const SIZE_MAPS = {
  small: "h-8",
  default: "h-10",
  large: "h-12",
  none: "",
} as const;

export const BLOCK = {
  true: "w-full",
} as const;

export type TPropsButton = {
  className?: string;
  type?: "button" | "submit" | "reset";
  isIconOnly?: boolean;
  prefix?: ReactNode | null;
  isShowLoading?: boolean | null;
  style?: keyof typeof STYLE_MAPS;
  size?: keyof typeof SIZE_MAPS;
  disable?: boolean;
  block?: boolean;
  otherProps?: AppReact.Button.Props;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
