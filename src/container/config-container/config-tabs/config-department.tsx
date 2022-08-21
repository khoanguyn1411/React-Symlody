import React from "react";

import {
  Button,
  DeleteAndEditField,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
} from "@/components";
import { useModal } from "@/hooks";

export const TabConfigDepartment = () => {
  const listTest = [
    {
      department: "Test department",
      totalMember: 123,
      dateCreated: "12/3/2022",
    },
    {
      department: "Test department",
      totalMember: 123,
      dateCreated: "12/3/2022",
    },

    {
      department: "Test department",
      totalMember: 123,
      dateCreated: "12/3/2022",
    },
    {
      department: "Test department",
      totalMember: 123,
      dateCreated: "12/3/2022",
    },
    {
      department: "Test department",
      totalMember: 123,
      dateCreated: "12/3/2022",
    },
  ];
  return (
    <div>
      <Table>
        <TableHead>
          <TableCellHead width="5rem" textAlign="center">
            STT
          </TableCellHead>
          <TableCellHead>Ban</TableCellHead>
          <TableCellHead width="10rem" textAlign="right">
            Tổng thành viên
          </TableCellHead>
          <TableCellHead width="8rem" textAlign="right">
            Ngày tạo
          </TableCellHead>
          <TableCellHead width="8rem" textAlign="center">
            Hành động
          </TableCellHead>
        </TableHead>
        <TableBody>
          {listTest.map((item, index) => (
            <TableRow key={index}>
              <TableCell width="5rem" textAlign="center">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600" />
                  <p>{item.department}</p>
                </div>
              </TableCell>
              <TableCell width="10rem" textAlign="right">
                {item.totalMember}
              </TableCell>
              <TableCell width="8rem" textAlign="right">
                {item.dateCreated}
              </TableCell>
              <TableCell width="8rem" textAlign="right">
                <div className="flex justify-center">
                  <DeleteAndEditField
                    title={"Xóa phòng ban?"}
                    handleEvent={{
                      edit: function (): void {
                        throw new Error("Function not implemented.");
                      },
                      delete: function (): void {
                        throw new Error("Function not implemented.");
                      },
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const ActionConfigDepartment: React.FC = () => {
  const { toggle, isShowing } = useModal();
  const handleToggleModal = () => {
    toggle.setToggle();
  };
  const handleCreateDepartment = () => {
    console.log("Demo test");
  };
  return (
    <>
      <Button
        prefix={<i className="mr-2 fas fa-plus-circle" />}
        onClick={handleToggleModal}
      >
        Tạo mới
      </Button>
      <Modal
        handleEvent={{
          event: handleCreateDepartment,
        }}
        size="lg"
        title={"Tạo phòng ban"}
        isShowing={isShowing}
        toggle={toggle}
      >
        <div>Demo phong ban</div>
      </Modal>
    </>
  );
};
