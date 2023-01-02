import classNames from "classnames";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { updateTaskAsync } from "@/features/reducers/task-reducer";
import { Task } from "@/features/types";

import { TODO_MESSAGES } from "../constant";
import { checkStatusOfExpiredDate } from "../function";
import { todoViewMapper } from "../mapper";
import { useTodoFilter } from "../useTodoFilter";
import { TodoSelectPriority, TodoSelectStatus } from "./todo-selects";

const TABLE_COLUMNS_NUMBER = 6;

type TProps = {
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  isLoading: boolean;
};

export const TodoTableContent: React.FC<TProps> = ({
  onDelete,
  onEdit,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(userSelectors.selectAll);
  const taskStore = useAppSelector((state) => state.task);

  useTodoFilter();

  const [currentInteractiveTask, setCurrentInteractiveTask] =
    useState<Task["id"]>();

  const handleEdit = (item: Task) => () => {
    onEdit(item);
  };
  const handleDelete = (item: Task) => () => {
    setCurrentInteractiveTask(item.id);
    onDelete(item);
  };

  const handleChangeStatus = async (status: Task.StatusIds, task: Task) => {
    const result = await dispatch(
      updateTaskAsync({
        id: task.id,
        payload: { ...task, status },
      })
    );
    if (updateTaskAsync.rejected.match(result)) {
      toast.error(TODO_MESSAGES.update.error);
      return;
    }
  };

  const handlePriorityChange = async (isPriority: boolean, task: Task) => {
    const result = await dispatch(
      updateTaskAsync({
        id: task.id,
        payload: { ...task, isPriority },
      })
    );
    if (updateTaskAsync.rejected.match(result)) {
      toast.error(TODO_MESSAGES.update.error);
      return;
    }
  };

  if (isLoading || taskStore.pending) {
    return <Table.Skeleton colsNumber={TABLE_COLUMNS_NUMBER} />;
  }

  if (taskStore.currentListTask.length === 0) {
    return <Table.NoData colsNumber={TABLE_COLUMNS_NUMBER} />;
  }

  return (
    <>
      <Table.Body>
        {taskStore.currentListTask.map((task, index) => {
          const itemTable = todoViewMapper.fromModel(userList, task);
          const statusOfExpiredDate = checkStatusOfExpiredDate(task);
          const isShowLoadingDelete =
            taskStore.pendingDeleteTask && task.id === currentInteractiveTask;
          return (
            <Table.Row key={task.id} index={index}>
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-4">
                  <TodoSelectPriority
                    task={task}
                    onPriorityChange={handlePriorityChange}
                  />
                  <span className="ellipsis-text-1" title={itemTable.title}>
                    {itemTable.title}
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <span
                  className={classNames({
                    "text-yellow-500": statusOfExpiredDate.is("today"),
                    "text-red-400": statusOfExpiredDate.is("in-past"),
                  })}
                >
                  {itemTable.expiredDate}
                </span>
              </Table.Cell>
              <Table.Cell textAlign="left">
                <TodoSelectStatus
                  task={task}
                  onStatusChange={handleChangeStatus}
                />
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={itemTable.avatar}
                    fullName={itemTable.fullName}
                    isUnassigned={itemTable.isUnassigned}
                  />
                  <span>{itemTable.fullName}</span>
                </div>
              </Table.Cell>
              <Table.CellAction>
                <DeleteAndEditField
                  titleDelete="Xóa"
                  isShowLoading={isShowLoadingDelete}
                  title="Xóa công việc?"
                  handleEvent={{
                    edit: handleEdit(task),
                    delete: handleDelete(task),
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
