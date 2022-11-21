import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Modal, Table } from "@/components";
import { useAppDispatch } from "@/features";
import {
  createDepartmentAsync,
  deleteDepartmentAsync,
  getDepartmentAsync,
} from "@/features/reducers";
import { ERolesID, IDepartment } from "@/features/types";
import { withPermission } from "@/hoc";
import { useModal } from "@/hooks";

import { DEPARTMENT_MESSAGE } from "./constants";
import { FormItems } from "./FormItems";
import { ModalEditDepartment } from "./ModalEditDepartment";
import { schema } from "./schema";
import { TabDepartmentTableContent } from "./TabDepartmentTableContent";
import { IFormDepartment } from "./types";

export const TabConfigDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const propsModalEditDepartment = useModal<IDepartment>();

  useEffect(() => {
    dispatch(getDepartmentAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = withPermission([ERolesID.Lead, ERolesID.SystemAdmin])(
    (departmentData: IDepartment) => {
      if (departmentData) {
        propsModalEditDepartment.setData(departmentData);
        propsModalEditDepartment.toggle.setShow();
      }
    }
  );

  const handleDelete = withPermission([ERolesID.Lead, ERolesID.SystemAdmin])(
    async (departmentData: IDepartment) => {
      if (departmentData && departmentData.id) {
        const result = await dispatch(deleteDepartmentAsync(departmentData.id));
        if (!result) {
          toast.error("Xoá phòng ban không thành công");
          return;
        }
        toast.success("Xoá phòng ban thành công");
      }
    }
  );

  return (
    <>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="5rem" textAlign="center">
            STT
          </Table.CellHead>
          <Table.CellHead>Tên Ban</Table.CellHead>

          <Table.CellHead width="10rem" textAlign="right">
            Tổng thành viên
          </Table.CellHead>
          <Table.CellHead width="8rem" textAlign="right">
            Ngày tạo
          </Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>
        <TabDepartmentTableContent
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
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
