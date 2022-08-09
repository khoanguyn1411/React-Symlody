import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import classNames from "classnames";
import React from "react";

import { TMenuProps, TPropsDropdownDefault } from "../type";

export const Dropdown: React.FC<TPropsDropdownDefault> = ({
  menus,
  widthContainer,
  placement = "bottom-start",
  children,
  onClickMenu,
}) => {
  const handleClickMenu = (key: string) => () => {
    onClickMenu && onClickMenu(key);
  };

  return (
    <Menu placement={placement}>
      <MenuHandler>
        <div className="cursor-pointer">{children}</div>
      </MenuHandler>
      <MenuList
        className={classNames(
          `rounded-md shadow-none bg-white border px-0 py-2`,
          widthContainer
        )}
      >
        {menus.map((item: TMenuProps, index: number) => (
          <MenuItem
            key={index}
            onClick={handleClickMenu(item.key)}
            className={classNames(
              "rounded-none bg-white w-full hover:bg-gray-100 text-black hover:text-primary-800 transition-all duration-300"
            )}
          >
            {item.prefix}
            {item.key}
            {item.suffix}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};