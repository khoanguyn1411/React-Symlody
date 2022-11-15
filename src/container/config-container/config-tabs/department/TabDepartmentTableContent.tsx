import React from "react";

import { DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { IDepartment } from "@/features/types";
import { FormatService } from "@/utils";

type TProps = {
  onEdit: (department: IDepartment) => void;
  onDelete: (department: IDepartment) => void;
};

export const TabDepartmentTableContent: React.FC<TProps> = ({
  onEdit,
  onDelete,
}) => {
  const departmentStore = useAppSelector((state) => state.department);
  if (departmentStore.pending) {
    return <Table.Skeleton colsNumber={5} />;
  }
  if (
    departmentStore.departments.length === 0 ||
    departmentStore.departments == null
  ) {
    return <Table.NoData colsNumber={5} />;
  }
  return (
    <Table.Body>
      {departmentStore.departments.map((item, index) => (
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
                item.member_count > 0
                  ? "Bạn cần chuyển thành viên sang phòng ban khác trước khi xoá!"
                  : "Bạn có chắc muốn xoá phòng ban?"
              }
              titleDelete="Xóa"
              disableSubmit={item?.member_count > 0}
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
      ))}
    </Table.Body>
  );
};
