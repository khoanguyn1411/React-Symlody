import React from "react";

import { DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { departmentSelectors } from "@/features/reducers";
import { IDepartment } from "@/features/types";
import { FormatService } from "@/utils";

import { DEPARTMENT_MESSAGE } from "./constants";

type TProps = {
  onEdit: (department: IDepartment) => void;
  onDelete: (department: IDepartment) => void;
};

export const TabDepartmentTableContent: React.FC<TProps> = ({
  onEdit,
  onDelete,
}) => {
  const departmentStore = useAppSelector((state) => state.department);
  const departmentList = useAppSelector(departmentSelectors.selectAll);
  const departmentCount = useAppSelector(departmentSelectors.selectTotal);

  if (departmentStore.pending) {
    return <Table.Skeleton colsNumber={5} />;
  }
  if (departmentCount === 0) {
    return <Table.NoData colsNumber={5} />;
  }
  return (
    <Table.Body>
      {departmentList.map((item, index) => {
        const hasMember = item.member_count > 0;
        return (
          <Table.Row key={`${item.id}-${index}`}>
            <Table.Cell width="5rem" textAlign="center">
              {index + 1}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-4">
                <p>{item.name}</p>
              </div>
            </Table.Cell>

            <Table.Cell width="10rem" textAlign="center">
              {item.member_count}
            </Table.Cell>
            <Table.Cell width="8rem" textAlign="right">
              {FormatService.toDateString(item.created_date, "VN")}
            </Table.Cell>
            <Table.CellAction>
              <DeleteAndEditField
                title={
                  hasMember
                    ? DEPARTMENT_MESSAGE.title.needToMoveMembers
                    : DEPARTMENT_MESSAGE.title.confirmDelete
                }
                titleDelete="Xóa"
                disableSubmit={hasMember}
                handleEvent={{
                  edit: function (): void {
                    onEdit(item);
                  },
                  delete: function (): void {
                    onDelete(item);
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
