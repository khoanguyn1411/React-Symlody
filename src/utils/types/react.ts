import React, { ReactNode } from "react";
export type FCPropsWithChildren<T> = React.FC<T & { children?: ReactNode }>;
export type FCChildren = React.FC<{ children: ReactNode }>;
export type ReactStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

// Button types of React.
export type ReactButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ReactButtonClickEvent = React.MouseEvent<
  HTMLButtonElement,
  MouseEvent
>;
export type ReactButtonCommonEvents =
  React.MouseEventHandler<HTMLButtonElement>;
/** ------------------------------------------------------------ */
