import classNames from "classnames";
import React, { useState } from "react";

import { Select } from "@/components";
import { Option } from "@/components/elements/select/type";
import { Task, TASK_STATUS_FROM_ID_TO_READABLE } from "@/features/types";
import { enumToArray } from "@/utils/funcs/enum-to-array";

import { COLOR_MAP } from "./type";

type TProps = {
  task: Task;
  onStatusChange: (status: Task.StatusIds, task: Task) => void;
};

export const TodoSelectStatus: React.FC<TProps> = ({
  task,
  onStatusChange,
}) => {
  const [_status, _setStatus] = useState<Option<null, Task.StatusIds>>({
    label: TASK_STATUS_FROM_ID_TO_READABLE[task.status],
    value: task.status,
  });

  const handleChangeStatus = (status: Option<null, Task.StatusIds>) => {
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
      list={enumToArray(Task.StatusIds).map((item) => ({
        value: item,
        label: TASK_STATUS_FROM_ID_TO_READABLE[item],
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
