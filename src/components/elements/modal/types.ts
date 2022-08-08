import { size } from "@material-tailwind/react/types/components/dialog";
import { ReactNode } from "react";

// General type of modal.
export type TToggleModal = {
  setShow?: () => void;
  setHidden?: () => void;
  setToggle?: () => void;
};

export type TEventModal = {
  title?: string;
  event: () => void;
  isLoading?: boolean;
  isDisable?: boolean;
};

export type TPropsModalGeneral = {
  size?: size;
  isShowing: boolean;
  closeWhenClickOutside?: boolean;
  toggle: TToggleModal;
};

// Types of modal multiple tabs.
export type TPropsModalMultipleTabs = {
  renderTabs: TTabs[];
} & TPropsModalGeneral;

export type TTabs = {
  title: string;
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
