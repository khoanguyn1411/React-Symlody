import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, DeleteAndEditField, Modal, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  createDepartmentAsync,
  deleteDepartmentAsync,
  getDepartmentAsync,
} from "@/features/reducers";
import { IDepartment } from "@/features/types";
import { withPermission } from "@/hoc";
import { useModal } from "@/hooks";

import { DEPARTMENT_MESSAGE } from "./constants";
import { FormItems } from "./FormItems";
import { ModalEditDepartment } from "./ModalEditDepartment";
import { schema } from "./schema";
import { IFormDepartment } from "./types";

dayjs.extend(localizedFormat);

export const TabConfigDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const departmentState = useAppSelector((state) => state.department);
  const propsModalEditDepartment = useModal<IDepartment>();

  useEffect(() => {
    dispatch(getDepartmentAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = withPermission([1, 2])((id: number) => {
    const department = departmentState.departments.find((d) => d.id === id);
    if (department) {
      propsModalEditDepartment.setData(department);
      propsModalEditDepartment.toggle.setShow();
    }
  });

  const handleDelete = withPermission([1, 2])(async (id: number) => {
    if (id) {
      const result = await dispatch(deleteDepartmentAsync(id));
      if (!result) {
        toast.error("Xoá phòng ban không thành công");
        return;
      }
      toast.success("Xoá phòng ban thành công");
    }
  });

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
                  <p>{item.name}</p>
                </div>
              </Table.Cell>
              <Table.Cell width="10rem" textAlign="center">
                {item.member_count}
              </Table.Cell>
              <Table.Cell width="8rem" textAlign="right">
                {dayjs(item.created_date).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.CellAction>
                <DeleteAndEditField
                  title={
                    item?.member_count > 0
                      ? "Bạn cần chuyển thành viên sang phòng ban khác trước khi xoá!"
                      : "Bạn có chắc muốn xoá phòng ban?"
                  }
                  titleDelete="Xóa"
                  disableSubmit={item?.member_count > 0}
                  handleEvent={{
                    edit: function (): void {
                      handleEdit(item.id);
                    },
                    delete: function (): void {
                      handleDelete(item.id);
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
  const dispatch = useAppDispatch();
  const propsForm = useForm<IFormDepartment>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = propsForm;

  const { toggle, isShowing } = useModal();
  const handleToggleModal = () => {
    toggle.setToggle();
  };

  const handleCreateDepartment = async (data: IFormDepartment) => {
    //TODO: Handle create department.
    const result = await dispatch(createDepartmentAsync(data));
    if (!result.payload) {
      toast.error(DEPARTMENT_MESSAGE.create.error);
      return;
    }
    toast.success(DEPARTMENT_MESSAGE.create.success);
    reset();
    toggle.setHidden();
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
