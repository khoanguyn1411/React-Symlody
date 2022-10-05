import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, DeleteAndEditField, Modal, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getDepartmentAsync } from "@/features/reducers";
import { IDepartment } from "@/features/types";
import { useModal } from "@/hooks";

import { FormItems } from "./FormItems";
import { ModalEditDepartment } from "./ModalEditDepartment";
import { schema } from "./schema";
import { IFormDepartment } from "./types";

export const TabConfigDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const departmentState = useAppSelector((state) => state.department);
  const propsModalEditDepartment = useModal<IDepartment>();

  useEffect(() => {
    dispatch(getDepartmentAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (id: number) => {
    const department = departmentState.departments.find((d) => d.id === id);
    if (department) {
      propsModalEditDepartment.setData(department);
      propsModalEditDepartment.toggle.setShow();
    }
  };

  return (
    <>
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
          {departmentState.departments.map((item, index) => (
            <Table.Row key={`${item.id}-${index}`}>
              <Table.Cell width="5rem" textAlign="center">
                {index + 1}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600" />
                  <p>{item.name}</p>
                </div>
              </Table.Cell>
              <Table.Cell width="10rem" textAlign="right">
                10
              </Table.Cell>
              <Table.Cell width="8rem" textAlign="right">
                10
              </Table.Cell>
              <Table.CellAction>
                <DeleteAndEditField
                  title={"Xóa phòng ban?"}
                  handleEvent={{
                    edit: function (): void {
                      handleEdit(item.id);
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

      <ModalEditDepartment {...propsModalEditDepartment} />
    </>
  );
};

export const ActionConfigDepartment: React.FC = () => {
  const propsForm = useForm<IFormDepartment>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,

    formState: { isSubmitting },
  } = propsForm;

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
          title: "Tạo",
          event: handleSubmit(handleCreateDepartment),
          isLoading: isSubmitting,
          isDisable: false,
        }}
        size="lg"
        title={"Tạo phòng ban"}
        isShowing={isShowing}
        toggle={toggle}
      >
        <FormItems formProps={propsForm} />
      </Modal>
    </>
  );
};
