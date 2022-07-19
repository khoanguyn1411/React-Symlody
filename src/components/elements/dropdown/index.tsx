import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Select,
} from "@material-tailwind/react";
import classNames from "classnames";
import React, { useState } from "react";

type TProps = {
  data: string[];
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  placeHolder?: string;
  className?: string;
  widthClass?: string;
};

export const Dropdown: React.FC<TProps> = ({
  data,
  selectedValue,
  setSelectedValue,
  placeHolder,
  className,
  widthClass,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const handleSetSelected = (item: string) => {
    return () => {
      setSelectedValue(item);
      setIsOpenDropdown(false);
    };
  };
  return (
    <div className={classNames(className, widthClass)}>
      <Menu
        open={isOpenDropdown}
        handler={() => setIsOpenDropdown(!isOpenDropdown)}
      >
        <MenuHandler>
          <button
            placeholder="SD"
            className="flex justify-between w-full p-2 bg-white border border-primary-800 rounded-md"
          >
            {selectedValue ?? placeHolder}{" "}
            <span>
              <i
                className={classNames(
                  "fas fa-angle-down duration-300 transition-transform text-base",
                  {
                    "transform -rotate-180": isOpenDropdown,
                  }
                )}
              />
            </span>
          </button>
        </MenuHandler>
        <MenuList className={classNames(`p-0 rounded-none`, widthClass)}>
          {data.map((item: string, index: number) => (
            <MenuItem
              key={index}
              onClick={handleSetSelected(item)}
              className={classNames(
                "rounded-none hover:bg-primary-100",
                item === selectedValue && "bg-primary-200"
              )}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};
