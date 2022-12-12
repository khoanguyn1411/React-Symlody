import classNames from "classnames";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import {
  filterTaskByAssignee,
  getTasksAsync,
  taskSelectors,
  updateTaskAsync,
} from "@/features/reducers/task-reducer";
import { Task, TodoStatusId } from "@/features/types";

import { TODO_MESSAGES } from "../constant";
import { checkStatusOfExpiredDate } from "../function";
import { todoViewMapper } from "../mapper";
import { TodoSelectPriority, TodoSelectStatus } from "./todo-selects";

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
  const taskList = useAppSelector(taskSelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [currentInteractiveTask, setCurrentInteractiveTask] =
    useState<Task["id"]>();

  const handleEdit = (item: Task) => () => {
    onEdit(item);
  };
  const handleDelete = (item: Task) => () => {
    setCurrentInteractiveTask(item.id);
    onDelete(item);
  };

  const handleChangeStatus = async (status: TodoStatusId, task: Task) => {
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

  useEffect(() => {
    dispatch(filterTaskByAssignee());
  }, [
    dispatch,
    taskList,
    taskStore.filterParamsTask.selectedMemberList,
    userList,
  ]);

  useLayoutEffect(() => {
    const { departmentId } = taskStore.filterParamsTask;
    if (!departmentId) {
      return;
    }
    dispatch(
      getTasksAsync({
        ...taskStore.filterParamsTask,
        departmentId: departmentId ?? currentUser.department.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, taskStore.filterParamsTask.departmentId]);

  if (isLoading || taskStore.pending) {
    return <Table.Skeleton colsNumber={6} />;
  }

  if (taskStore.currentListTask.length === 0) {
    return <Table.NoData colsNumber={6} />;
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
