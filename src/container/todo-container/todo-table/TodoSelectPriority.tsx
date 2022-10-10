import classNames from "classnames";
import React, { useState } from "react";

import { Icon } from "@/assets/icons";
import { SelectCustom } from "@/components";

import { PRIORITY_LIST } from "./constant";
import { TPriority } from "./type";

type TProps = {
  isPriority: boolean;
};

export const TodoSelectPriority: React.FC<TProps> = ({ isPriority }) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [_isPriority, _setIsPriority] = useState<boolean>(isPriority);

  const handleChangePriority = (item: TPriority) => () => {
    setIsShowContent(false);
    _setIsPriority(item.isPriority);
  };
  return (
    <SelectCustom
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
      placement="bottom-right"
      classNameDisplay="flex items-center justify-center"
      classNameList="w-24 bg-white"
      style="none"
      isShowArrow
      renderListItem={PRIORITY_LIST.map((item, index) => (
        <button
          onClick={handleChangePriority(item)}
          className="flex items-center justify-center px-2 py-1 hover:bg-primary-50 duration-200 transition-colors space-x-2"
          key={index}
        >
          <span>{item.icon}</span>
          <span
            className={classNames(
              item.isPriority ? "text-warning-500" : "text-primary-800",
              "font-medium"
            )}
          >
            {item.isPriority ? "Priority" : "Normal"}
          </span>
        </button>
      ))}
    >
      <button>
        {_isPriority ? (
          <Icon.ArrowUp size="small" customColor="warning" />
        ) : (
          <Icon.Hamburger2 size="small" />
        )}
      </button>
    </SelectCustom>
  );
};
