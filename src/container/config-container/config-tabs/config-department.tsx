import React from "react";

import { Button, DeleteAndEditField, Modal, Table } from "@/components";
import { useModal } from "@/hooks";

export const TabConfigDepartment: React.FC = () => {
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
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="5rem" textAlign="center">
            STT
          </Table.CellHead>
          <Table.CellHead>Ban</Table.CellHead>
          <Table.CellHead width="10rem" textAlign="right">
            Tổng thành viên
          </Table.CellHead>
          <Table.CellHead width="8rem" textAlign="right">
            Ngày tạo
          </Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>
        <Table.Body>
          {listTest.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell width="5rem" textAlign="center">
                {index + 1}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600" />
                  <p>{item.department}</p>
                </div>
              </Table.Cell>
              <Table.Cell width="10rem" textAlign="right">
                {item.totalMember}
              </Table.Cell>
              <Table.Cell width="8rem" textAlign="right">
                {item.dateCreated}
              </Table.Cell>
              <Table.CellAction>
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
              </Table.CellAction>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Container>
    </div>
  );
};

export const ActionConfigDepartment: React.FC = () => {
  const { toggle, isShowing } = useModal();
  const handleToggleModal = () => {
    toggle.setToggle();
  };
  const handleCreateDepartment = () => {
    //TODO: Handle create department.
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
