import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateMemberAsync } from "@/features/reducers";
import { IMember } from "@/features/types";
import { THookModalProps } from "@/hooks";

import { MEMBER_MESSAGE } from "../constant";
import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditMember: React.FC<THookModalProps<IMember>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const propsForm = useForm<IFormMemberInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = propsForm;

  const departmentStore = useAppSelector((state) => state.department);
  const dispatch = useAppDispatch();

  const handleEditMember = async (editInfo: IFormMemberInfo) => {
    const memberModel = MemberFormMapper.toModel(
      departmentStore.departments,
      editInfo,
      data.is_archived
    );
    const result = await dispatch(
      updateMemberAsync({
        payload: memberModel,
        id: data.id,
        isRestore: false,
      })
    );
    if (!result.payload) {
      toast.error(MEMBER_MESSAGE.update.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.update.success);
    toggle.setHidden();
  };

  return (
    <Modal
      toggle={toggle}
      title="Chỉnh sửa thành viên"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditMember),
        isLoading: isSubmitting,
        isDisable: !isDirty,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
