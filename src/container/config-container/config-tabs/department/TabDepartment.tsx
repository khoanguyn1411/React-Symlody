import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ButtonCreate, Modal, Table } from "@/components";
import { useAppDispatch } from "@/features";
import {
  createDepartmentAsync,
  deleteDepartmentAsync,
  getDepartmentAsync,
} from "@/features/reducers";
import { Department, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { useModal } from "@/hooks";
import { FormService } from "@/utils/funcs/form-service";

import { DEPARTMENT_MESSAGE } from "./constants";
import { FormItems } from "./FormItems";
import { ModalEditDepartment } from "./ModalEditDepartment";
import { schema } from "./schema";
import { TabDepartmentTableContent } from "./TabDepartmentTableContent";
import { DepartmentForm } from "./types";

export const TabConfigDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const propsModalEditDepartment = useModal<Department>();

  useEffect(() => {
    dispatch(getDepartmentAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = withPermission([RolesID.Lead, RolesID.SystemAdmin])(
    (departmentData: Department) => {
      if (departmentData) {
        propsModalEditDepartment.setData(departmentData);
        propsModalEditDepartment.toggle.setShow();
      }
    }
  );

  const handleDelete = withPermission([RolesID.Lead, RolesID.SystemAdmin])(
    async (departmentData: Department) => {
      if (departmentData && departmentData.id) {
        const result = await dispatch(deleteDepartmentAsync(departmentData.id));
        if (deleteDepartmentAsync.rejected.match(result)) {
          toast.error(DEPARTMENT_MESSAGE.delete.error);
          return;
        }
        toast.success(DEPARTMENT_MESSAGE.delete.success);
      }
    }
  );

  return (
    <>
      <Table.Container isFullHeight>
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
  const propsForm = useForm<DepartmentForm>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = propsForm;

  const { toggle, isShowing } = useModal({ isHotkeyOpen: true });
  const handleToggleModal = () => {
    toggle.setToggle();
  };

  const handleCreateDepartment = async (data: DepartmentForm) => {
    const result = await dispatch(createDepartmentAsync(data));
    if (createDepartmentAsync.rejected.match(result)) {
      if (result.payload) {
        const errors = result.payload.httpError;
        FormService.generateErrors({ errors, setError });
        return;
      }
      toast.error(DEPARTMENT_MESSAGE.create.error);
      return;
    }
    toast.success(DEPARTMENT_MESSAGE.create.success);
    reset();
    toggle.setHidden();
  };

  return (
    <>
      <ButtonCreate onClick={handleToggleModal}>Tạo mới</ButtonCreate>
      <Modal
        reset={reset}
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
