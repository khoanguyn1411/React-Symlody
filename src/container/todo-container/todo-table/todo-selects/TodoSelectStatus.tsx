import classNames from "classnames";
import React, { useState } from "react";

import { Select } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { Task, TodoStatusId } from "@/features/types";
import { generateArrayFromEnum } from "@/utils/services/generate-service";

import { TODO_STATUS_MAP_FROM_ID } from "../../mapper";
import { COLOR_MAP } from "./type";

type TProps = {
  task: Task;
  onStatusChange: (status: TodoStatusId, task: Task) => void;
};

export const TodoSelectStatus: React.FC<TProps> = ({
  task,
  onStatusChange,
}) => {
  const [_status, _setStatus] = useState<TOptionProps<null, TodoStatusId>>({
    label: TODO_STATUS_MAP_FROM_ID[task.status],
    value: task.status,
  });

  const handleChangeStatus = (status: TOptionProps<null, TodoStatusId>) => {
    onStatusChange(status.value, task);
  };
  return (
    <Select
      placement="bottom-left"
      setSelectValueControlled={_setStatus}
      selectValueControlled={_status}
      onChangeSideEffect={handleChangeStatus}
      classNameDisplay="flex items-center justify-center"
      classNameList="w-24 bg-white"
      style="none"
      isShowArrow
      list={generateArrayFromEnum(TodoStatusId).map((item) => ({
        value: item,
        label: TODO_STATUS_MAP_FROM_ID[item],
      }))}
      renderOption={(option, isChosen) => (
        <button
          className={classNames(
            COLOR_MAP[option.value],
            { "bg-primary-50": isChosen },
            "px-2 py-1 justify-start w-full flex hover:bg-primary-50 transition-colors duration-200"
          )}
        >
          {option.label}
        </button>
      )}
    >
      <div
        className={classNames(
          COLOR_MAP[_status.value],
          "flex font-medium items-center space-x-3"
        )}
      >
        <li className="text-[6px] fas fa-circle" />
        <span>{_status.label}</span>
      </div>
    </Select>
  );
};
