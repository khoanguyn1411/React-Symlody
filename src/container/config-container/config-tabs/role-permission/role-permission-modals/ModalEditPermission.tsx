import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Avatar, Modal } from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { useAppDispatch } from "@/features";
import { updateConfigRoleUserAsync } from "@/features/reducers";
import { UserShort } from "@/features/types";
import { FormService } from "@/utils/funcs/form-service";

import { ROLE_PERMISSION_MESSAGE } from "../constants";
import { rolePermissionFormMapper } from "../mapper";
import { FormItems } from "../role-permission-form/FormItems";
import { schema } from "../schema";
import { RolePermissionForm } from "../types";

type TProps = {
  isShowing: boolean;
  toggle: TToggleModal;
  data: UserShort;
};

export const ModalEditPermission: React.FC<TProps> = ({
  isShowing,
  toggle,
  data,
}) => {
  const dispatch = useAppDispatch();
  const propsForm = useForm<RolePermissionForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    setError,
    formState: { isSubmitting, dirtyFields },
    handleSubmit,
    reset,
  } = propsForm;

  useEffect(() => {
    if (data) {
      const formData = rolePermissionFormMapper.fromModel(data);
      reset(formData);
    }
  }, [data, reset, isShowing]);

  const handleUpdate = async (body: RolePermissionForm) => {
    const bodyModel = rolePermissionFormMapper.toModel(body);
    const response = await dispatch(
      updateConfigRoleUserAsync({
        body: bodyModel,
        id: data.id,
        avatarUrl: data.avatarUrl,
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

  if (data == null) {
    return;
  }

  return (
    <Modal
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleUpdate),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
      }}
      title={"Phân quyền"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <div className="flex items-center mb-4 space-x-2">
        <Avatar src={data.avatarUrl} fullName={data.fullName} />
        <div className="flex flex-col">
          <span className="font-medium">{data.fullName}</span>
          <span className="text-xs text-gray-400">{data.email}</span>
        </div>
      </div>
      <FormItems mode="edit" formProps={propsForm} />
    </Modal>
  );
};
