import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Avatar, FormItem, Modal, Select, SelectMultiple } from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { APP_ERROR_MESSAGE } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateConfigRoleUserAsync, userSelectors } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";
import { FormService } from "@/utils";

import {
  EPermissionOptions,
  MANAGE_OPTIONS,
  PERMISSION_OPTIONS,
  ROLE_PERMISSION_MESSAGE,
} from "./constants";
import { RolePermissionFormMapper } from "./mapper";
import { IConfigManagerForm } from "./types";

type TProps = {
  isShowing: boolean;
  toggle: TToggleModal;
  data: IConfigInfo;
};

const schema: yup.SchemaOf<IConfigManagerForm> = yup.object().shape({
  userId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  roleManager: yup.array().of(yup.string()),
});

export const ModalEditPermission: React.FC<TProps> = ({
  isShowing,
  toggle,
  data,
}) => {
  const userList = useAppSelector(userSelectors.selectAll);
  const dispatch = useAppDispatch();

  const propsForm = useForm<IConfigManagerForm>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, dirtyFields, errors },
    reset,
    getValues,
  } = propsForm;

  const user = userList.find((u) => u.id === getValues("userId"));

  useEffect(() => {
    if (data) {
      reset(RolePermissionFormMapper.fromModel(data));
    }
  }, [data, reset]);

  const handleUpdate = async (body: IConfigManagerForm) => {
    const bodyModel = RolePermissionFormMapper.toModel(body);
    const result = await dispatch(updateConfigRoleUserAsync(bodyModel));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(ROLE_PERMISSION_MESSAGE.update.success);
      toggle.setHidden();
      reset();
      return;
    }
    toast.error(ROLE_PERMISSION_MESSAGE.update.error);
  };

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
      heightContainer={320}
    >
      <FormItem label="Chức vụ" isRequired>
        <Controller
          control={control}
          name="type"
          defaultValue={EPermissionOptions.Manager}
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              list={PERMISSION_OPTIONS}
            />
          )}
        />
      </FormItem>

      {getValues("type") === EPermissionOptions.Manager && (
        <FormItem label="Tính năng" isRequired>
          <Controller
            control={control}
            name="roleManager"
            render={({ field: { value, onChange } }) => (
              <SelectMultiple
                placeHolder="Chọn tính năng"
                list={MANAGE_OPTIONS}
                value={value}
                style="modal"
                onChange={onChange}
              />
            )}
          />
        </FormItem>
      )}

      <FormItem label="Thành viên" isRequired error={errors.userId?.message}>
        <div className="flex items-center h-10 px-3 bg-gray-100 space-x-2 rounded-md">
          <Avatar src={user?.avatar} fullName={user?.full_name} />
          <span>{user?.full_name}</span>
        </div>
      </FormItem>
    </Modal>
  );
};
