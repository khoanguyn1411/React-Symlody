import classNames from "classnames";
import React from "react";

import { Icon } from "@/assets/icons";
import { Avatar, Button } from "@/components";
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
    <div className="pb-3">
      <div className="px-2 py-3 bg-white cursor-pointer drop-shadow-md hover:bg-gray-50 transition-colors duration-100 rounded-md">
        <div className="flex justify-between space-x-3">
          <h1>{title}</h1>
          <Button isIconOnly style="none">
            <Icon.Dots3 />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h2 className={classNames({ "text-primary-800 font-medium": true })}>
            {date}
          </h2>
          <div className="flex items-center space-x-3">
            {isPriority ? (
              <Icon.ArrowUp customColor="warning" size="small" />
            ) : (
              <Icon.Hamburger2 size="small" />
            )}
            <Avatar fullName={""} />
          </div>
        </div>
      </div>
    </div>
  );
};
