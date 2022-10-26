import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import {
  convertSimpleToIconOptions,
  FormItem,
  ISelectOption,
  Modal,
  SelectControl,
} from "@/components";
import { APP_ERROR_MESSAGE } from "@/constants";
import { useAppSelector } from "@/features";
import { memberSelectors } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

import { PERMISSION_OPTIONS } from "./constants";
import { IConfigManagerForm } from "./types";

const schema: yup.SchemaOf<IConfigManagerForm> = yup.object().shape({
  userId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});

export const ModalEditPermission: React.FC<THookModalProps<IConfigInfo>> = ({
  isShowing,
  toggle,
  data,
}) => {
  const members = useAppSelector(memberSelectors.selectAll);

  const propsForm = useForm<IConfigManagerForm>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, dirtyFields, errors },
    reset,
  } = propsForm;

  const options: ISelectOption[] =
    members &&
    members.map((d) => ({
      icon: d.auth_account.first_name,
      label: d.auth_account.first_name + " " + d.auth_account.last_name,
      value: d.id.toString(),
    }));

  const USER_OPTIONS: ISelectOption[] = useMemo(() => {
    if (data) {
      return convertSimpleToIconOptions(options, true, true);
    }
  }, [data, options]);

  useEffect(() => {
    if (data) {
      reset({
        userId: data.id,
        type: data.groups.map((g) => g.name).includes("lead")
          ? "LEAD"
          : "MANAGER",
      });
    }
  }, [data, reset]);

  const handleUpdate = async () => {
    console.log("");
  };

  console.log(data, "--data");
  console.log(options, "--options");

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
          defaultValue={"MANAGER"}
          render={({ field: { value, onChange } }) => (
            <SelectControl
              name="type"
              placeholder={"Chức vụ"}
              selected={value}
              options={PERMISSION_OPTIONS}
              onValueChange={onChange}
            />
          )}
        />
      </FormItem>

      <FormItem label="Thành viên" isRequired error={errors.userId?.message}>
        <Controller
          control={control}
          name="userId"
          render={({ field: { value, onChange } }) => (
            <SelectControl
              name="userId"
              placeholder={"Thành viên"}
              isClearable
              selected={value.toString()}
              options={USER_OPTIONS}
              onValueChange={onChange}
            />
          )}
        />
      </FormItem>
    </Modal>
  );
};
