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
import { IConfigInfo } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

import { PERMISSION_OPTIONS } from "./constants";
import { IConfigManagerForm } from "./types";

const schema: yup.SchemaOf<IConfigManagerForm> = yup.object().shape({
  userIds: yup
    .array()
    .of(yup.string())
    .min(1, APP_ERROR_MESSAGE.REQUIRED)
    .required(APP_ERROR_MESSAGE.REQUIRED),
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});

export const ModalPermission: React.FC<THookModalProps<IConfigInfo[]>> = ({
  isShowing,
  toggle,
  data,
}) => {
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
    data &&
    data.map((d) => ({
      icon: d.email,
      label: d.first_name + " " + d.last_name,
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
        userIds: data.map((d) => d.id.toString()),
      });
    } else {
      reset({
        userIds: [],
      });
    }
  }, [data, reset]);

  const handleUpdate = async () => {
    console.log("");
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

      <FormItem
        label="Thành viên"
        isRequired
        error={(errors.userIds as any)?.message}
      >
        <Controller
          control={control}
          name="userIds"
          defaultValue={[]}
          render={({ field: { value, onChange } }) => (
            <SelectControl
              name="userIds"
              placeholder={"Thành viên"}
              isMulti
              isClearable
              selected={value}
              options={USER_OPTIONS}
              onValueChange={onChange}
            />
          )}
        />
      </FormItem>
    </Modal>
  );
};
