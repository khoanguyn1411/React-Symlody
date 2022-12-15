// Replace onMouseEnter with onMouseOver and onMouseLeave with onMouseOut because the strange behavior of onMouseLeave and onMouseOver
// (they sometimes not trigger the event).
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Icon } from "@/assets/icons";
import { Avatar, Dropdown, TItemListSelect, Tooltip } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { deleteTaskAsync } from "@/features/reducers/task-reducer";
import { Task } from "@/features/types";

import { TODO_MESSAGES } from "../constant";
import { checkStatusOfExpiredDate } from "../function";
import { todoViewMapper } from "../mapper";
import { TodoPriorityIcon } from "../TodoPriorityIcon";

export const TodoCard: React.FC<Task> = (task) => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(userSelectors.selectAll);
  const taskViewInfo = todoViewMapper.fromModel(userList, task);
  const statusOfExpiredDate = checkStatusOfExpiredDate(task);

  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isListShow, setIsListShow] = useState(false);

  const handleMouseEnter = () => {
    setIsShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setIsShowDropdown(false);
  };

  const handleListClose = () => {
    setIsListShow(false);
  };

  const handleListOpen = () => {
    setIsListShow(true);
  };

  const handleDropdownSelection = async (item: TItemListSelect) => {
    if (item.key === "delete") {
      const res = await dispatch(deleteTaskAsync(task.id));
      if (deleteTaskAsync.fulfilled.match(res)) {
        toast.success(TODO_MESSAGES.delete.success);
        return;
      }
      toast.error(TODO_MESSAGES.delete.error);
    }
  };

  return (
    <div className="pb-2">
      <div
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        className={classNames(
          "px-3 py-3 bg-white border cursor-pointer hover:bg-gray-50 transition-colors duration-100 rounded-md",
          {
            "border-gray-300 border-b-2": statusOfExpiredDate.is("in-future"),
            "border-yellow-500": statusOfExpiredDate.is("today"),
            "border-red-400": statusOfExpiredDate.is("in-past"),
          }
        )}
      >
        <div className="flex justify-between space-x-3">
          <h1>{task.title}</h1>
          <Dropdown
            className={classNames("transition-all", {
              "opacity-0": !isShowDropdown && !isListShow,
              "opacity-100": isShowDropdown,
            })}
            onListHidden={handleListClose}
            onListShow={handleListOpen}
            onChange={handleDropdownSelection}
            placement="bottom-right"
            widthContainer="150px"
            listSetting={[{ key: "delete", value: "Xóa" }]}
          >
            <span
              className={classNames(
                "block py-0.5 px-2 border-gray-300 border transition-all rounded-sm hover:bg-gray-300",
                {
                  "bg-gray-300": isListShow,
                  "bg-gray-200": !isListShow,
                }
              )}
            >
              <Icon.Dots3 size="small" />
            </span>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h2
            className={classNames({
              "text-yellow-500": statusOfExpiredDate.is("today"),
              "text-red-400": statusOfExpiredDate.is("in-past"),
            })}
          >
            {taskViewInfo.expiredDate}
          </h2>
          <div className="flex items-center space-x-3">
            <TodoPriorityIcon isPriority={task.isPriority} />
            <Tooltip space={8} content={taskViewInfo.fullName}>
              <Avatar
                src={taskViewInfo.avatar}
                fullName={taskViewInfo.fullName}
                isUnassigned={taskViewInfo.isUnassigned}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
