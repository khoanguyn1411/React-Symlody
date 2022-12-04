import React, { useState } from "react";

import { SelectCustom } from "@/components";
import { Task } from "@/features/types";

import { TodoPriorityIcon } from "../../TodoPriorityIcon";
import { PRIORITY_LIST } from "../constant";

type TProps = {
  task: Task;
  onPriorityChange: (isPriority: boolean, task: Task) => void;
};

export const TodoSelectPriority: React.FC<TProps> = ({
  task,
  onPriorityChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [_isPriority, _setIsPriority] = useState<boolean>(task.isPriority);

  const handleChangePriority = (isPriority: boolean) => () => {
    setIsShowContent(false);
    _setIsPriority(isPriority);
    onPriorityChange(isPriority, task);
  };
  return (
    <SelectCustom
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
      placement="bottom-right"
      classNameDisplay="flex items-center justify-center"
      classNameList="w-10 bg-white"
      style="none"
      isShowArrow
      renderListItem={PRIORITY_LIST.map((item, index) => (
        <div
          className="flex items-center justify-center w-full px-2 py-1 mx-auto hover:bg-primary-50 duration-200 transition-colors"
          key={index}
        >
          <TodoPriorityIcon
            onClick={handleChangePriority(item)}
            isPriority={item}
          />
        </div>
      ))}
    >
      <TodoPriorityIcon isPriority={_isPriority} />
    </SelectCustom>
  );
};
