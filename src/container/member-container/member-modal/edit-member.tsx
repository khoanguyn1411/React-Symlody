import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync, updateMemberAsync } from "@/features/reducers";
import { IMember, IMemberUpdate } from "@/features/types";
import { THookModalProps } from "@/hooks";

import { MEMBER_MESSAGE } from "../constant";
import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./member-form";

export const ModalEditMember: React.FC<THookModalProps<IMember>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const propsForm = useForm<IFormMemberInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const memberStore = useAppSelector((state) => state.member);
  const departmentStore = useAppSelector((state) => state.department);

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = propsForm;

  const handleEditMember = async (editInfo: IFormMemberInfo) => {
    const memberModel: IMemberUpdate = MemberFormMapper.toModel(
      departmentStore.department,
      editInfo
    );
    const result = await dispatch(
      updateMemberAsync({ payload: memberModel, id: data.id })
    );
    if (!result.payload) {
      toast.error(MEMBER_MESSAGE.update.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.update.success);
    dispatch(getMembersAsync(memberStore.listQueryMember));
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
        isLoading: memberStore.pendingUpdateMember,
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
