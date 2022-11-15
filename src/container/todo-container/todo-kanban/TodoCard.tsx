import React, { useMemo } from "react";

import { Avatar } from "@/components";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { ETodoStatus, IMember, ITask } from "@/features/types";
import { FormatService } from "@/utils";

import { TodoPriorityIcon } from "../TodoPriorityIcon";

export type TTodoCardProps = {
  title: string;
  date: string;
  isPriority: boolean;
  assignee?: IMember;
  status?: ETodoStatus;
};

export const TodoCard: React.FC<ITask> = (task) => {
  const userList = useAppSelector(userSelectors.selectAll);
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
    <div className="pb-3">
      <div className="px-3 py-3 bg-white border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-100 rounded-md">
        <div className="flex justify-between space-x-3">
          <h1>{task.title}</h1>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h2>{FormatService.toDate(task.end_date, "VN")}</h2>
          <div className="flex items-center space-x-3">
            <TodoPriorityIcon isPriority={task.isPriority} />
            <Avatar
              src={getAssigneeBy(task, "avatar")}
              fullName={getAssigneeBy(task, "name")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
