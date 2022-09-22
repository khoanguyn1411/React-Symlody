import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateMemberAsync } from "@/features/reducers";
import { IMember, IMemberCreateUpdate } from "@/features/types";
import { THookModalProps } from "@/hooks";

import { MEMBER_MESSAGE } from "../constant";
import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./member-form";

const _ModalEditMember: React.FC<THookModalProps<IMember>> = ({
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
    formState: { dirtyFields, isSubmitting },
  } = propsForm;

  const departmentStore = useAppSelector((state) => state.department);
  const dispatch = useAppDispatch();

  const handleEditMember = useCallback(
    async (editInfo: IFormMemberInfo) => {
      const memberModel: IMemberCreateUpdate = MemberFormMapper.toModel(
        departmentStore.department,
        editInfo
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
    },
    [data, departmentStore.department, dispatch, toggle]
  );

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
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};

export const ModalEditMember = memo(_ModalEditMember);
