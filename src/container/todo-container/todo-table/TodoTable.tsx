import React from "react";

import { Container, Table } from "@/components";
import { ITask } from "@/features/types";
import { useModal } from "@/hooks";

import { ModalEditTodo } from "../todo-modals";
import { TodoTableContent } from "./TodoTableContent";

type TProps = {
  isLoading: boolean;
};
export const TodoTable: React.FC<TProps> = ({ isLoading }) => {
  const propsModalEdit = useModal<ITask>();

  const handleEditTodo = (task: ITask) => {
    propsModalEdit.toggle.setToggle();
    propsModalEdit.setData(task);
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
          <Table.CellHead width="12rem">Người được giao</Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>
        {/* TODO: Update actions later */}
        <TodoTableContent
          isLoading={isLoading}
          onEdit={handleEditTodo}
          onDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
          onRestore={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Table.Container>
      <ModalEditTodo {...propsModalEdit} />
    </Container.Body>
  );
};
