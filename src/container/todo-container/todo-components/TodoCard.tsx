import React from "react";

import { Icon } from "@/assets/icons";
import { Avatar } from "@/components";
import { IMember } from "@/features/types";

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
  assignee,
}) => {
  return (
    <div className="p-2 bg-white shadow-lg cursor-pointer hover:bg-gray-50 transition-colors duration-100 rounded-md">
      <h1>{title}</h1>
      <div className="flex items-center justify-between mt-3">
        <h2 className="">{date}</h2>
        <div className="flex items-center space-x-3">
          <Icon.DoubleArrowUp size="small" />
          <Avatar fullName={""} />
        </div>
      </div>
    </div>
  );
};
