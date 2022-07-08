import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";

type TProps = {
  data: string;
};

export const Dropdown: React.FC<TProps> = ({ data }) => {
  return (
    <Menu>
      <MenuHandler></MenuHandler>
      <MenuList>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
        <MenuItem>4</MenuItem>
      </MenuList>
    </Menu>
  );
};
