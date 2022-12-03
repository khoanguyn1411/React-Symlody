import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  departmentSelectors,
  getDepartmentAsync,
  updateMemberAsync,
} from "@/features/reducers";
import { IMember, IMemberCreateUpdate, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
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
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = propsForm;

  const departmentStore = useAppSelector((state) => state.department);
  const departmentList = useAppSelector(departmentSelectors.selectAll);
  const departmentCount = useAppSelector(departmentSelectors.selectTotal);

  const dispatch = useAppDispatch();
  const hasPermission = withPermission([RolesID.Lead, RolesID.MemberManager]);

  const handleEditMember = hasPermission(async (editInfo: IFormMemberInfo) => {
    const memberModel = MemberFormMapper.toModel({
      departmentModel: departmentList,
      formData: editInfo,
      isArchived: data.is_archived,
    });

    let _memberModel: IMemberCreateUpdate;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...authAccountWithoutEmail } = memberModel.auth_account;

    if (editInfo.email === data.auth_account.email) {
      _memberModel = { ...memberModel, auth_account: authAccountWithoutEmail };
    } else {
      _memberModel = memberModel;
    }

    const res = await dispatch(
      updateMemberAsync({
        payload: _memberModel,
        id: data.id,
        isRestore: false,
      })
    );
    if (updateMemberAsync.rejected.match(res)) {
      const error = res.payload;
      if (error.detail.auth_account.email) {
        setError("email", { message: "Email này đã được đăng ký." });
        return;
      }
      toast.error(MEMBER_MESSAGE.create.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.update.success);
    toggle.setHidden();
  });

  useEffect(() => {
    if (isShowing && departmentCount === 0) {
      dispatch(getDepartmentAsync());
    }
  }, [departmentCount, dispatch, isShowing]);

  useEffect(() => {
    if (data) {
      reset(MemberFormMapper.fromModel(data));
    }
  }, [data, reset]);

  return (
    <Modal
      isLoading={departmentStore.pending}
      toggle={toggle}
      title="Chỉnh sửa thành viên"
      widthContainer={640}
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditMember),
        isLoading: isSubmitting,
        isDisable: !isDirty,
      }}
    >
      <FormItems formProps={propsForm} />
    </Modal>
  );
};
