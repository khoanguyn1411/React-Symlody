import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getDepartmentAsync, updateMemberAsync } from "@/features/reducers";
import { IMember, IMemberCreateUpdate } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

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
    formState: { isSubmitting, dirtyFields },
  } = propsForm;

  const departmentStore = useAppSelector((state) => state.department);
  const dispatch = useAppDispatch();

  const handleEditMember = async (editInfo: IFormMemberInfo) => {
    const memberModel = MemberFormMapper.toModel(
      departmentStore.departments,
      editInfo,
      data.is_archived
    );

    let _memberModel: IMemberCreateUpdate;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...authAccountWithoutEmail } = memberModel.auth_account;

    if (editInfo.email === data.auth_account.email) {
      _memberModel = { ...memberModel, auth_account: authAccountWithoutEmail };
    } else {
      _memberModel = memberModel;
    }

    const result = await dispatch(
      updateMemberAsync({
        payload: _memberModel,
        id: data.id,
        isRestore: false,
      })
    );
    if (!result.payload.result) {
      toast.error(MEMBER_MESSAGE.update.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.update.success);
    toggle.setHidden();
  };

  useEffect(() => {
    if (isShowing && departmentStore.departments.length === 0) {
      dispatch(getDepartmentAsync());
    }
  }, [departmentStore.departments.length, dispatch, isShowing]);

  return (
    <Modal
      isLoading={departmentStore.pending}
      toggle={toggle}
      title="Chỉnh sửa thành viên"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditMember),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
