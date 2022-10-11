import classNames from "classnames";
import React, { useState } from "react";

import { SelectCustom } from "@/components";

import { TodoPriorityIcon } from "../../TodoPriorityIcon";
import { EPriority } from "../../type";
import { PRIORITY_LIST } from "../constant";

type TProps = {
  isPriority: boolean;
};

export const TodoSelectPriority: React.FC<TProps> = ({ isPriority }) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [_isPriority, _setIsPriority] = useState<boolean>(isPriority);

  const handleChangePriority = (isPriority: boolean) => () => {
    setIsShowContent(false);
    _setIsPriority(isPriority);
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
          className="flex items-center justify-start w-full px-2 py-1 hover:bg-primary-50 duration-200 transition-colors space-x-2"
          key={index}
        >
          <TodoPriorityIcon isPriority={item} />
          <span
            className={classNames(
              item ? "text-secondary-500" : "text-yellow-400",
              "font-medium"
            )}
          >
            {item ? EPriority.High : EPriority.Normal}
          </span>
        </button>
      ))}
    >
      <TodoPriorityIcon isPriority={_isPriority} />
    </SelectCustom>
  );
};
