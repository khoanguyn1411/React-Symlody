import { placement } from "@material-tailwind/react/types/components/menu";

// General type of dropdown
export type TMenuProps = {
  key: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
};

export type TPropsDropdownGeneral = {
  menus: TMenuProps[];
  placeHolder?: string;
  widthContainer?: string;
  placement?: placement;
  onClickMenu: (key: string) => void;
};

// Type of dropdown default
export type TPropsDropdownDefault = {
  children: React.ReactNode;
} & TPropsDropdownGeneral;

// Type of dropdown compound
export type TPropsDropdownCompound = {
  onClickButton: () => void;
  hiddenAfterClick?: boolean;
} & TPropsDropdownGeneral;
