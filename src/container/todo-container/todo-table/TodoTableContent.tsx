import React from "react";

import { DeleteAndEditField, Table } from "@/components";

import { MOCK_DATA_TODO } from "./constant";
import { TodoSelectPriority, TodoSelectStatus } from "./todo-selects";

export const TodoTableContent: React.FC = () => {
  const isPending = false;
  const isCount0 = false;

  if (isPending) {
    return <Table.Skeleton colsNumber={6} />;
  }

  if (isCount0) {
    return <Table.NoData colsNumber={6} />;
  }

  return (
    <Table.Body>
      {MOCK_DATA_TODO.map((item, index) => {
        return (
          <Table.Row key={index} index={index}>
            <Table.Cell textAlign="center">{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="flex space-x-4">
                <span>{item.job}</span>
                <TodoSelectPriority isPriority={item.isPriority} />
              </div>
            </Table.Cell>
            <Table.Cell textAlign="right">{item.expiredDate}</Table.Cell>
            <Table.Cell textAlign="left">
              <TodoSelectStatus status={item.status} />
            </Table.Cell>
            <Table.Cell>{item.assignee}</Table.Cell>
            <Table.CellAction>
              <DeleteAndEditField
                titleDelete="Xóa"
                title="Xóa sự kiện?"
                handleEvent={{
                  edit: function (): void {
                    throw new Error("Function not implemented.");
                  },
                  delete: function (): void {
                    throw new Error("Function not implemented.");
                  },
                  restore: function (): void {
                    throw new Error("Function not implemented.");
                  },
                }}
              />
            </Table.CellAction>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};
