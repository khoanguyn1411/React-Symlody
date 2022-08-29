import { ReactNode } from "react";

export type size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

// General type of modal.
export type TToggleModal = {
  setShow?: () => void;
  setHidden?: () => void;
  setToggle?: () => void;
};

export type TEventModal = {
  title?: string;
  isLoading?: boolean;
  isDisable?: boolean;
  event: () => void;
};

export type TPropsModalGeneral = {
  size?: size;
  isShowing: boolean;
  closeWhenClickOutside?: boolean;
  toggle: TToggleModal;
  reset?: () => void;
};

// Types of modal multiple tabs.
export type TPropsModalMultipleTabs = {
  renderTabs: readonly TTabs[];
} & TPropsModalGeneral;

export type TTabs = {
  title: string;
  key: string;
  children: ReactNode;
};

export type TPropsModalTab = {
  handleEvent: TEventModal;
  children: ReactNode;
  otherActions?: React.DOMAttributes<HTMLFormElement>;
};

// Types of modal default.
export type TPropsModalDefault = {
  handleEvent?: TEventModal;
  title: string;
  children: ReactNode;
} & TPropsModalGeneral;
