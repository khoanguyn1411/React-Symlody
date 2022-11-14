import classNames from "classnames";
import React, { useState } from "react";

import { SelectCustom } from "@/components";
import { ETodoStatusId, ITask } from "@/features/types";

import { TODO_STATUS_MAP_FROM_ID } from "../../type";
import { COLOR_MAP } from "./type";

type TProps = {
  task: ITask;
  onStatusChange: (status: ETodoStatusId, task: ITask) => void;
};

export const TodoSelectStatus: React.FC<TProps> = ({
  task,
  onStatusChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [_status, _setStatus] = useState<ETodoStatusId>(task.status);

  const handleChangeStatus = (status: ETodoStatusId) => () => {
    setIsShowContent(false);
    _setStatus(status);
    onStatusChange(status, task);
  };
  return (
    <SelectCustom
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
      placement="bottom-left"
      classNameDisplay="flex items-center justify-center"
      classNameList="w-24 bg-white"
      style="none"
      isShowArrow
      renderListItem={
        <div className="flex flex-col">
          {Object.values(ETodoStatusId).map((item, index) => (
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
    </SelectCustom>
  );
};
