import React from "react";

import { DeleteAndEditField, Table } from "@/components";

import { MOCK_DATA_TODO } from "./constant";
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
  const isPending = false;
  const isCount0 = false;

  const handleEdit = (item) => () => {
    onEdit(item);
  };
  const handleDelete = (item) => () => {
    onDelete(item);
  };
  const handleRestore = (item) => () => {
    onRestore(item);
  };

  if (isPending) {
    return <Table.Skeleton colsNumber={6} />;
  }

  if (isCount0) {
    return <Table.NoData colsNumber={6} />;
  }

  return (
    <>
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
