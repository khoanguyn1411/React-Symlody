import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import {
  getTasksAsync,
  taskSelectors,
  updateTaskAsync,
} from "@/features/reducers/task-reducer";
import { ETodoStatusId, ITask } from "@/features/types";
import { generatePlaceholderEmptyValue } from "@/utils/services/generate-service";

import { TODO_MESSAGES } from "../constant";
import { TodoSelectPriority, TodoSelectStatus } from "./todo-selects";

type TProps = {
  onEdit: (task: any) => void;
  onDelete: (task: any) => void;
  onRestore: (task: any) => void;
};

export const TodoTableContent: React.FC<TProps> = ({
  onDelete,
  onEdit,
  onRestore,
}) => {
  const userList = useAppSelector(userSelectors.selectAll);
  const isPending = false;
  const isCount0 = false;

  const handleEdit = (item: ITask) => () => {
    onEdit(item);
  };
  const handleDelete = (item) => () => {
    onDelete(item);
  };
  const handleRestore = (item) => () => {
    onRestore(item);
  };

  const tasks = useAppSelector(taskSelectors.selectAll);
  const dispatch = useAppDispatch();

  const getAssigneeBy = useMemo(
    () =>
      (item: ITask, getField: "name" | "avatar"): string => {
        const assignee = userList.find((user) => user.id === item.assignee.id);
        if (getField === "name") {
          return assignee.full_name;
        }
        return assignee.avatar;
      },
    [userList]
  );

  const handleChangeStatus = async (status: ETodoStatusId, task: ITask) => {
    const result = await dispatch(
      updateTaskAsync({
        id: task.id,
        payload: { ...task, status },
      })
    );
    if (result.meta.requestStatus === "rejected") {
      toast.error(TODO_MESSAGES.update.error);
      return;
    }
    toast.success(TODO_MESSAGES.update.success);
  };

  const handlePriorityChange = async (isPriority: boolean, task: ITask) => {
    const result = await dispatch(
      updateTaskAsync({
        id: task.id,
        payload: { ...task, isPriority },
      })
    );
    if (result.meta.requestStatus === "rejected") {
      toast.error(TODO_MESSAGES.update.error);
      return;
    }
    toast.success(TODO_MESSAGES.update.success);
  };

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);

  if (isPending) {
    return <Table.Skeleton colsNumber={6} />;
  }

  if (isCount0) {
    return <Table.NoData colsNumber={6} />;
  }

  return (
    <>
      <Table.Body>
        {userList.length > 0 &&
          tasks.map((item, index) => {
            return (
              <Table.Row key={index} index={index}>
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-4">
                    <span>{generatePlaceholderEmptyValue(item.title)}</span>
                    <TodoSelectPriority
                      task={item}
                      onPriorityChange={handlePriorityChange}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {generatePlaceholderEmptyValue(item.end_date)}
                </Table.Cell>
                <Table.Cell textAlign="left">
                  <TodoSelectStatus
                    task={item}
                    onStatusChange={handleChangeStatus}
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={getAssigneeBy(item, "avatar")}
                      fullName={getAssigneeBy(item, "name")}
                    />
                    <span>{getAssigneeBy(item, "name")}</span>
                  </div>
                </Table.Cell>
                <Table.CellAction>
                  <DeleteAndEditField
                    titleDelete="Xóa"
                    title="Xóa sự kiện?"
                    handleEvent={{
                      edit: handleEdit(item),
                      delete: handleDelete(item),
                      restore: handleRestore(item),
                    }}
                  />
                </Table.CellAction>
              </Table.Row>
            );
          })}
      </Table.Body>
    </>
  );
};
