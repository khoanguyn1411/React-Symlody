import classNames from "classnames";
import React, { ReactNode, useState } from "react";

import { DropdownGeneral } from "../dropdown-components";
type TProps = {
  children: ReactNode;
  listSetting: {
    prefix?: ReactNode;
    list: string[];
    suffix?: ReactNode;
  };
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<TProps> = ({
  children,
  listSetting,
  onChange,
}) => {
  const [isShowContent, setIsShowContent] = useState(false);
  const handleClickItem = (item: string) => () => {
    setIsShowContent(false);
    onChange(item);
  };
  return (
    <DropdownGeneral
      display={children}
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
    >
      {listSetting.list.map((item: string, index: number) => (
        <li
          key={index}
          aria-hidden="true"
          onClick={handleClickItem(item)}
          className={classNames(
            "py-1 px-2 hover:bg-primary-100 cursor-pointer transition-all duration-70"
          )}
        >
          {listSetting.prefix}
          <h1>{item}</h1>
          {listSetting.suffix}
        </li>
      ))}
    </DropdownGeneral>
  );
};
