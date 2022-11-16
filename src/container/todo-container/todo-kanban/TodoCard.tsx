import classNames from "classnames";
import React, { useMemo } from "react";

import { Avatar, Tooltip } from "@/components";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { ITask } from "@/features/types";
import { FormatService } from "@/utils";
import { compareDateWithToday } from "@/utils/services/compare-service";
import { generatePlaceholderEmptyValue } from "@/utils/services/generate-service";

import { TodoPriorityIcon } from "../TodoPriorityIcon";

export const TodoCard: React.FC<ITask> = (task) => {
  const userList = useAppSelector(userSelectors.selectAll);
  const borderCardType = compareDateWithToday(task.end_date);
  const getAssigneeBy = useMemo(
    () =>
      (item: ITask, getField: "name" | "avatar"): string => {
        const assignee = userList.find((user) => user.id === item.assignee.id);
        if (assignee == null) {
          return "";
        }
        if (getField === "name") {
          return assignee.full_name;
        }
        return assignee.avatar;
      },
    [userList]
  );
  return (
    <div className="pb-2">
      <div
        className={classNames(
          "px-3 py-3 bg-white border cursor-pointer hover:bg-gray-50 transition-colors duration-100 rounded-md",
          {
            "border-gray-300": borderCardType === "in-future",
            "border-yellow-500": borderCardType === "today",
            "border-red-400": borderCardType === "in-past",
          }
        )}
      >
        <div className="flex justify-between space-x-3">
          <h1>{task.title}</h1>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h2
            className={classNames({
              "text-yellow-500": borderCardType === "today",
              "text-red-400": borderCardType === "in-past",
            })}
          >
            {task.end_date
              ? FormatService.toDateString(task.end_date, "VN")
              : generatePlaceholderEmptyValue(task.end_date)}
          </h2>
          <div className="flex items-center space-x-3">
            <TodoPriorityIcon isPriority={task.isPriority} />
            <Tooltip space={8} content={getAssigneeBy(task, "name")}>
              <Avatar
                src={getAssigneeBy(task, "avatar")}
                fullName={getAssigneeBy(task, "name")}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
