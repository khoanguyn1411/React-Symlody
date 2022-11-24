import classNames from "classnames";
import React from "react";

import { Avatar, Tooltip } from "@/components";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { ITask } from "@/features/types";
import { FormatService } from "@/utils";
import { generatePlaceholderEmptyValue } from "@/utils/services/generate-service";

import { UNASSIGNED_TEXT } from "../constant";
import { checkStatusOfExpiredDate, getTaskCommonInfo } from "../function";
import { TodoPriorityIcon } from "../TodoPriorityIcon";

export const TodoCard: React.FC<ITask> = (task) => {
  const userList = useAppSelector(userSelectors.selectAll);
  const { fullName, avatar, isUnassigned } = getTaskCommonInfo(userList, task);
  const statusOfExpiredDate = checkStatusOfExpiredDate(task);

  return (
    <div className="pb-2">
      <div
        className={classNames(
          "px-3 py-3 bg-white border cursor-pointer hover:bg-gray-50 transition-colors duration-100 rounded-md",
          {
            "border-gray-300": statusOfExpiredDate.is("in-future"),
            "border-yellow-500": statusOfExpiredDate.is("today"),
            "border-red-400": statusOfExpiredDate.is("in-past"),
          }
        )}
      >
        <div className="flex justify-between space-x-3">
          <h1>{task.title}</h1>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h2
            className={classNames({
              "text-yellow-500": statusOfExpiredDate.is("today"),
              "text-red-400": statusOfExpiredDate.is("in-past"),
            })}
          >
            {task.end_date
              ? FormatService.toDateString(task.end_date, "VN")
              : generatePlaceholderEmptyValue(task.end_date)}
          </h2>
          <div className="flex items-center space-x-3">
            <TodoPriorityIcon isPriority={task.isPriority} />
            <Tooltip
              space={8}
              content={isUnassigned ? UNASSIGNED_TEXT : fullName}
            >
              <Avatar
                src={avatar}
                fullName={fullName}
                isUnassigned={isUnassigned}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
