import { ReactNode } from "react";

export const COLOR_MAPS_ICON = {
  default: "text-primary-800",
  primary: "text-white",
  gray: "text-gray-400",
  warning: "text-warning-400",
  info: "text-blue-400",
  text: "text-font-main",
  "text-primary": "text-primary-400",
  success: "text-white",
  transparent: "text-transparent",
} as const;
export const SIZE_MAPS_ICON = {
  small: "w-4 h-4",
  medium: "w-[1.15rem] h-[1.15rem]",
  default: "w-5 h-5",
  large: "w-8 h-8",
} as const;

export interface TIconWrapperProps extends React.SVGProps<SVGSVGElement> {
  children: ReactNode;
  size?: keyof typeof SIZE_MAPS_ICON;
  customColor?: keyof typeof COLOR_MAPS_ICON;
}

export type TIconProps = Omit<TIconWrapperProps, "children">;
