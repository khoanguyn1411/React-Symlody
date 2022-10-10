import React from "react";

import { Container, Table } from "@/components";

import { TodoTableContent } from "./TodoTableContent";

export const TodoTable: React.FC = () => {
  return (
    <Container.Body>
      <Table.Container>
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
        <TodoTableContent />
      </Table.Container>
    </Container.Body>
  );
};
