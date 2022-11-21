import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Avatar,
  FormItem,
  Modal,
  Select,
  SelectMultiple,
  TItemListSelect,
} from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { useAppDispatch } from "@/features";
import { updateConfigRoleUserAsync } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";
import { FormService } from "@/utils";

import {
  EPermissionOptions,
  MANAGE_OPTIONS,
  PERMISSION_OPTIONS,
  ROLE_PERMISSION_MESSAGE,
} from "./constants";
import { RolePermissionFormMapper } from "./mapper";
import { schema } from "./schema";
import { IConfigManagerForm } from "./types";

type TProps = {
  isShowing: boolean;
  toggle: TToggleModal;
  data: IConfigInfo;
};

export const ModalEditPermission: React.FC<TProps> = ({
  isShowing,
  toggle,
  data,
}) => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<string>("");
  const propsForm = useForm<IConfigManagerForm>({
    resolver: yupResolver(schema),
  });
  const {
    control,
    formState: { isSubmitting, dirtyFields, errors },
    setValue,
    handleSubmit,
    reset,
  } = propsForm;

  const handleSetType = (item: TItemListSelect) => {
    setType(item.value);
  };
  const isManager = type === EPermissionOptions.Manager;

  useEffect(() => {
    if (data) {
      const formData = RolePermissionFormMapper.fromModel(data);
      setType(formData.type);
      reset(formData);
    }
  }, [data, reset]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const formData = RolePermissionFormMapper.fromModel(data);
    if (isManager) {
      setValue("roleManager", formData.roleManager);
      return;
    }
    setValue("roleManager", [""]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

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

  if (data == null) {
    return;
  }

  return (
    <Modal
      reset={reset}
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
      <div className="flex items-center mb-4 gap-3">
        <Avatar src={""} fullName={data.full_name} />
        <div className="flex flex-col">
          <span className="text-sm">{data.full_name}</span>
          <span className="text-xs">{data.email}</span>
        </div>
      </div>

      <FormItem label="Chức vụ" isRequired>
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              onChangeSideEffect={handleSetType}
              list={PERMISSION_OPTIONS}
            />
          )}
        />
      </FormItem>

      {isManager && (
        <FormItem
          label="Tính năng"
          isRequired
          error={(errors.roleManager as unknown as FieldError)?.message}
        >
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
    </Modal>
  );
};
