import classNames from "classnames";
import React from "react";

import { Avatar } from "@/components";
import { IMember } from "@/features/types";

import { TodoPriorityIcon } from "../TodoPriorityIcon";
import { ETodoStatus } from "../type";

export type TTodoCardProps = {
  title: string;
  date: string;
  isPriority: boolean;
  assignee?: IMember;
  status?: ETodoStatus;
};

export const TodoCard: React.FC<TTodoCardProps> = ({
  title,
  date,
  isPriority,
}) => {
  return (
    <div className="pb-3">
      <div className="px-3 py-3 bg-white border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-100 rounded-md">
        <div className="flex justify-between space-x-3">
          <h1>{title}</h1>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h2 className={classNames("")}>{date}</h2>
          <div className="flex items-center space-x-3">
            <TodoPriorityIcon isPriority={isPriority} />
            <Avatar fullName={""} />
          </div>
        </div>
      </div>
    </div>
  );
};
