import React from "react";
import { toast } from "react-toastify";

import { Container, Table } from "@/components";
import { useAppDispatch } from "@/features";
import { deleteTaskAsync } from "@/features/reducers/task-reducer";
import { ITask } from "@/features/types";
import { useModal } from "@/hooks";

import { TODO_MESSAGES } from "../constant";
import { ModalEditTodo } from "../todo-modals";
import { TodoTableContent } from "./TodoTableContent";

type TProps = {
  isLoading: boolean;
};
export const TodoTable: React.FC<TProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const propsModalEdit = useModal<ITask>();

  const handleEditTodo = (task: ITask) => {
    propsModalEdit.toggle.setToggle();
    propsModalEdit.setData(task);
  };

  const handleDeleteTodo = async (task: ITask) => {
    const res = await dispatch(deleteTaskAsync(task.id));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success(TODO_MESSAGES.delete.success);
      return;
    }
    toast.error(TODO_MESSAGES.delete.error);
  };

  return (
    <Container.Body>
      <Table.Container isFullHeight>
        <Table.Head>
          <Table.CellHead isFirst width="5rem" textAlign="center">
            STT
          </Table.CellHead>
          <Table.CellHead>Công việc</Table.CellHead>
          <Table.CellHead textAlign="right" width="10rem">
            Ngày hết hạn
          </Table.CellHead>
          <Table.CellHead width="12rem">Trạng thái</Table.CellHead>
          <Table.CellHead width="14rem">Người được giao</Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>
        {/* TODO: Update actions later */}
        <TodoTableContent
          isLoading={isLoading}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </Table.Container>
      <ModalEditTodo {...propsModalEdit} />
    </Container.Body>
  );
};
