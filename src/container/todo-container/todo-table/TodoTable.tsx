import React from "react";

import { Container, Table } from "@/components";

import { TableTodoContent } from "./TableTodoContent";

export const TodoTable: React.FC = () => {
  return (
    <Container.Body>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="5rem" textAlign="center">
            STT
          </Table.CellHead>
          <Table.CellHead>Công việc</Table.CellHead>
          <Table.CellHead width="10rem">Ngày hết hạn</Table.CellHead>
          <Table.CellHead width="16rem">Trạng thái</Table.CellHead>
          <Table.CellHead width="12rem">Người được giao</Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>
        {/* TODO: Update actions later */}
        <TableTodoContent />
      </Table.Container>
    </Container.Body>
  );
};
