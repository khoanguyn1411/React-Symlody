import classNames from "classnames";
import React, { useState } from "react";

import { SelectBase } from "@/components";
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
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [_status, _setStatus] = useState<TodoStatusId>(task.status);

  const handleChangeStatus = (status: TodoStatusId) => () => {
    setIsShowContent(false);
    _setStatus(status);
    onStatusChange(status, task);
  };
  return (
    <SelectBase
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
      placement="bottom-left"
      classNameDisplay="flex items-center justify-center"
      classNameList="w-24 bg-white"
      style="none"
      isShowArrow
      renderListItem={
        <div className="flex flex-col">
          {generateArrayFromEnum(TodoStatusId).map((item, index) => (
            <button
              onClick={handleChangeStatus(item)}
              key={index}
              className={classNames(
                COLOR_MAP[item],
                { "bg-primary-50": item === _status },
                "px-2 py-1 justify-start flex hover:bg-primary-50 transition-colors duration-200"
              )}
            >
              {TODO_STATUS_MAP_FROM_ID[item]}
            </button>
          ))}
        </div>
      }
    >
      <button
        className={classNames(
          COLOR_MAP[_status],
          "flex font-medium items-center space-x-3"
        )}
      >
        <li className="text-[6px] fas fa-circle" />
        <span>{TODO_STATUS_MAP_FROM_ID[_status]}</span>
      </button>
    </SelectBase>
  );
};
