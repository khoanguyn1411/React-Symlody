import classNames from "classnames";
import React, { useEffect, useLayoutEffect } from "react";
import { toast } from "react-toastify";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import {
  getTasksAsync,
  getTasksByAssignee,
  taskSelectors,
  updateTaskAsync,
} from "@/features/reducers/task-reducer";
import { ETodoStatusId, ITask } from "@/features/types";
import { compareDateWithToday } from "@/utils/services/compare-service";

import {
  generateGetTaskFieldFn,
  TODO_MESSAGES,
  UNASSIGNED_TEXT,
} from "../constant";
import { TodoFormMapper } from "../mapper";
import { TodoSelectPriority, TodoSelectStatus } from "./todo-selects";

type TProps = {
  onEdit: (task: any) => void;
  onDelete: (task: any) => void;
  onRestore: (task: any) => void;
  isLoading: boolean;
};

export const TodoTableContent: React.FC<TProps> = ({
  onDelete,
  onEdit,
  onRestore,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(userSelectors.selectAll);
  const taskStore = useAppSelector((state) => state.task);
  const taskList = useAppSelector(taskSelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);

  const taskInfo = generateGetTaskFieldFn(userList);

  const handleEdit = (item: ITask) => () => {
    onEdit(item);
  };
  const handleDelete = (item) => () => {
    onDelete(item);
  };
  const handleRestore = (item) => () => {
    onRestore(item);
  };

  useEffect(() => {
    dispatch(getTasksByAssignee({ taskList, userList }));
  }, [
    dispatch,
    taskList,
    taskStore.listQueryTask.selected_member_list,
    userList,
  ]);

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
  };
  useLayoutEffect(() => {
    const { department_id } = taskStore.listQueryTask;
    dispatch(getTasksAsync({ department_id }));
  }, [currentUser.organization.id, dispatch, taskStore.listQueryTask]);

  if (isLoading || taskStore.pending) {
    return <Table.Skeleton colsNumber={6} />;
  }

  if (taskStore.listTasksByAssignee.length === 0) {
    return <Table.NoData colsNumber={6} />;
  }

  return (
    <>
      <Table.Body>
        {taskStore.listTasksByAssignee.map((item, index) => {
          const itemTable = TodoFormMapper.toTableView(item);
          const warningType = compareDateWithToday(item.end_date);
          return (
            <Table.Row key={index} index={index}>
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-4">
                  <TodoSelectPriority
                    task={item}
                    onPriorityChange={handlePriorityChange}
                  />
                  <span className="ellipsis-text-1">{itemTable.title}</span>
                </div>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <span
                  className={classNames({
                    "text-yellow-500": warningType === "today",
                    "text-red-400": warningType === "in-past",
                  })}
                >
                  {itemTable.expiredDate}
                </span>
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
                    src={taskInfo.get(item, "avatar")}
                    fullName={taskInfo.get(item, "name")}
                    isUnassigned={taskInfo.get(item, "name") === ""}
                  />
                  <span>
                    {taskInfo.get(item, "name") === ""
                      ? UNASSIGNED_TEXT
                      : taskInfo.get(item, "name")}
                  </span>
                </div>
              </Table.Cell>
              <Table.CellAction>
                <DeleteAndEditField
                  titleDelete="Xóa"
                  title="Xóa công việc?"
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
