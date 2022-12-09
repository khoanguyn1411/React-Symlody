import React, { useState } from "react";

import { Select } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { Task } from "@/features/types";

import { TodoPriorityIcon } from "../../TodoPriorityIcon";
import { PRIORITY_LIST_OPTIONS } from "../constant";

type TProps = {
  task: Task;
  onPriorityChange: (isPriority: boolean, task: Task) => void;
};

export const TodoSelectPriority: React.FC<TProps> = ({
  task,
  onPriorityChange,
}) => {
  const [_isPriority, _setIsPriority] = useState<TOptionProps>({
    label: task.isPriority.toString(),
    value: task.isPriority.toString(),
  });

  const isPriority = (type: string) => {
    return type === "true";
  };

  const handlePriorityChange = (option: TOptionProps) => {
    onPriorityChange(isPriority(option.value), task);
  };

  return (
    <Select
      placement="bottom-right"
      setSelectValueControlled={_setIsPriority}
      selectValueControlled={_isPriority}
      classNameDisplay="flex items-center justify-center"
      classNameList="w-10 bg-white"
      style="none"
      isShowArrow
      onChangeSideEffect={handlePriorityChange}
      list={PRIORITY_LIST_OPTIONS}
      renderOption={(option) => {
        return (
          <div className="flex items-center justify-center w-full px-2 py-1 mx-auto hover:bg-primary-50 duration-200 transition-colors">
            <TodoPriorityIcon isPriority={isPriority(option.value)} />
          </div>
        );
      }}
    >
      <TodoPriorityIcon
        isPriority={isPriority(_isPriority ? _isPriority.value : "false")}
      />
    </Select>
  );
};
