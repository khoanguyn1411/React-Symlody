import React from "react";
import { toast } from "react-toastify";

import { Container, Table } from "@/components";
import { useAppDispatch } from "@/features";
import { deleteTaskAsync } from "@/features/reducers/task-reducer";
import { Task } from "@/features/types";
import { useModal } from "@/hooks";

import { TODO_MESSAGES } from "../constant";
import { ModalEditTodo } from "../todo-modals";
import { TodoTableContent } from "./TodoTableContent";

type TProps = {
  isLoading: boolean;
};
export const TodoTable: React.FC<TProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const propsModalEdit = useModal<Task>();

  const handleEditTodo = (task: Task) => {
    propsModalEdit.toggle.setToggle();
    propsModalEdit.setData(task);
  };

  const handleDeleteTodo = async (task: Task) => {
    const res = await dispatch(deleteTaskAsync(task.id));
    if (deleteTaskAsync.fulfilled.match(res)) {
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
