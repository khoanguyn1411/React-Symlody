import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { assertErrorField } from "@/utils/services/form-service";
import { generateErrorMessageFromErrorArray } from "@/utils/services/generate-service";

import {
  EPermissionOptions,
  MANAGE_OPTIONS,
  PERMISSION_LIST,
  PERMISSION_OPTIONS,
  ROLE_PERMISSION_ERROR_TO_READABLE_STRING,
  ROLE_PERMISSION_MESSAGE,
  ROLE_PERMISSION_TO_NOTE,
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
    handleSubmit,
    reset,
  } = propsForm;

  const isManager = type === EPermissionOptions.Manager;

  useEffect(() => {
    if (data) {
      const formData = RolePermissionFormMapper.fromModel(data);
      setType(formData.type);
      reset(formData);
    }
  }, [data, reset, isShowing]);

  const handleSetType = (item: TItemListSelect) => {
    setType(item.value);
  };

  const handleUpdate = async (body: IConfigManagerForm) => {
    const bodyModel = RolePermissionFormMapper.toModel(body);
    const result = await dispatch(updateConfigRoleUserAsync(bodyModel));
    if (updateConfigRoleUserAsync.fulfilled.match(result)) {
      toast.success(ROLE_PERMISSION_MESSAGE.update.success);
      toggle.setHidden();
      reset();
      return;
    }
    if (result.payload == null) {
      toast.error(ROLE_PERMISSION_MESSAGE.update.error);
      return;
    }
    const { detail } = result.payload;
    const readableError = generateErrorMessageFromErrorArray(
      detail as string[],
      ROLE_PERMISSION_ERROR_TO_READABLE_STRING
    );
    toast.error(readableError);
    return;
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
    >
      <div className="flex items-center mb-4 space-x-2">
        <Avatar src={""} fullName={data.full_name} />
        <div className="flex flex-col">
          <span className="font-medium">{data.full_name}</span>
          <span className="text-xs text-gray-400">{data.email}</span>
        </div>
      </div>

      <FormItem label="Chức vụ" isRequired>
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              style="modal"
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
          error={assertErrorField(errors.roleManager)?.message}
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
      <ul>
        {PERMISSION_LIST.map((permission) => (
          <li className="ml-5 text-gray-500 list-disc" key={permission}>
            <span className="font-semibold">{permission}:</span>{" "}
            {ROLE_PERMISSION_TO_NOTE[permission]}.
          </li>
        ))}
      </ul>
    </Modal>
  );
};
