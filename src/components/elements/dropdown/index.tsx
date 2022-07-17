import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import classNames from "classnames";
import React, { useState } from "react";

type TProps = {
  data: string[];
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  placeHolder: string;
};

export const Dropdown: React.FC<TProps> = ({
  data,
  selectedValue,
  setSelectedValue,
  placeHolder,
}) => {
  const handleSetSelected = (item: string) => {
    return () => setSelectedValue(item);
  };
  return (
    <Menu>
      <MenuHandler>
        <button
          placeholder="SD"
          className="flex justify-between p-2 bg-white border border-primary-800 w-60 rounded-md"
        >
          {selectedValue ?? placeHolder}{" "}
          <span>
            <i
              className={classNames(
                "fas fa-angle-down duration-300 transition-transform text-base",
                {
                  "transform -rotate-180": true,
                }
              )}
            />
          </span>
        </button>
      </MenuHandler>
      <MenuList className="p-0 rounded-none w-60">
        {data.map((item: string, index: number) => (
          <MenuItem
            key={index}
            onClick={handleSetSelected(item)}
            className={classNames(
              "w-full rounded-none hover:bg-primary-100",
              item === selectedValue && "bg-primary-200"
            )}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
