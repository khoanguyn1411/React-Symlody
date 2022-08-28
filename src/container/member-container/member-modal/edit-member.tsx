import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateMemberAsync } from "@/features/reducers";
import { IMember, IMemberUpdate } from "@/features/types";
import { THookModalProps } from "@/hooks";

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

  const isLoading = useAppSelector((state) => state.member.pendingUpdateMember);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = propsForm;

  const handleEditMember = async (editInfo: IFormMemberInfo) => {
    const memberModel: IMemberUpdate = MemberFormMapper.toModel(editInfo);
    const result = await dispatch(
      updateMemberAsync({ payload: memberModel, id: data.id })
    );
    if (result.payload) {
      toast.success(
        `Cập nhật thành viên ${
          editInfo.firstName + " " + editInfo.lastName
        } thành công.`
      );
      return;
    }
    toast.error(
      `Cập nhật thành viên ${
        editInfo.firstName + " " + editInfo.lastName
      } thất bại.`
    );
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
        isLoading: isLoading,
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
