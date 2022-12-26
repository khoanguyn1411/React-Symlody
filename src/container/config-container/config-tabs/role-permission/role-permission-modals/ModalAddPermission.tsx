import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateConfigRoleUserAsync, userSelectors } from "@/features/reducers";
import { FormService } from "@/utils/funcs/form-service";

import { ROLE_PERMISSION_MESSAGE } from "../constants";
import { rolePermissionFormMapper } from "../mapper";
import { FormItems } from "../role-permission-form/FormItems";
import { schema } from "../schema";
import { RolePermissionForm } from "../types";

type TProps = {
  isShowing: boolean;
  toggle: TToggleModal;
};

export const ModalAddPermission: React.FC<TProps> = ({ isShowing, toggle }) => {
  const propsForm = useForm<RolePermissionForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: { roleManager: [] },
  });
  const {
    setError,
    formState: { isSubmitting, dirtyFields },
    handleSubmit,
    reset,
  } = propsForm;

  const dispatch = useAppDispatch();
  const userList = useAppSelector(userSelectors.selectAll);

  const handleAddPermission = async (body: RolePermissionForm) => {
    const bodyModel = rolePermissionFormMapper.toModel(body);

    const response = await dispatch(
      updateConfigRoleUserAsync({
        body: bodyModel,
        id: body.userId,
        avatarUrl: userList.find((user) => user.id === body.userId).avatarUrl,
      })
    );
    FormService.validateResponse({
      asyncThunk: updateConfigRoleUserAsync,
      response,
      successMessage: ROLE_PERMISSION_MESSAGE.update.success,
      errorMessage: ROLE_PERMISSION_MESSAGE.update.error,
      onSuccess: () => {
        toggle.setHidden();
        reset();
      },
      setError,
    });
  };
  return (
    <Modal
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleAddPermission),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
      }}
      title={"Phân quyền"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <FormItems mode="add" formProps={propsForm} />
    </Modal>
  );
};
