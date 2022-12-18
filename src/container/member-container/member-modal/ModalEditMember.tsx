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
import { Member, MemberCreation, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils/funcs/form-service";

import { MEMBER_MESSAGE } from "../constant";
import { memberFormMapper } from "../mapper";
import { schema } from "../schema";
import { MemberForm } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditMember: React.FC<THookModalProps<Member>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const propsForm = useForm<MemberForm>({
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

  const handleEditMember = hasPermission(async (editInfo: MemberForm) => {
    const memberModel = memberFormMapper.toModel({
      departmentModel: departmentList,
      formData: editInfo,
      isArchived: data.isArchived,
    });

    let _memberModel: MemberCreation;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...authAccountWithoutEmail } = memberModel.authAccount;

    if (editInfo.authAccount.email === data.authAccount.email) {
      _memberModel = { ...memberModel, authAccount: authAccountWithoutEmail };
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
      const errors = res.payload;
      if (errors) {
        FormService.generateErrors({
          errors,
          customMessage: { "authAccount.email": "Email này đã được đăng ký." },
          setError,
        });
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
      reset(memberFormMapper.fromModel(data));
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
