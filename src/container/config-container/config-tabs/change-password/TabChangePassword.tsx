import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormItem, InputPassword } from "@/components";
import { SelectTest } from "@/components/elements/select/select-custom-new/SelectTest";
import { TOptionProps } from "@/components/elements/select/type";
import { useAppDispatch } from "@/features";
import { changePasswordAsync } from "@/features/reducers";
import { FormService } from "@/utils";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { CHANGE_PASSWORD_MESSAGE } from "./constant";
import { schema } from "./schema";
import { IFormChangePassword } from "./type";

export const TabChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors, isSubmitting, dirtyFields },
    handleSubmit,
    reset,
  } = useForm<IFormChangePassword>({
    resolver: yupResolver(schema),
    defaultValues: { newPassword: "", oldPassword: "", confirmPassword: "" },
  });

  const handleChangePassword = async (data: IFormChangePassword) => {
    const result = await dispatch(changePasswordAsync(data));
    if (changePasswordAsync.rejected.match(result)) {
      toast.error(CHANGE_PASSWORD_MESSAGE.error);
      return;
    }
    toast.success(CHANGE_PASSWORD_MESSAGE.success);
    reset();
  };
  const listTest: TOptionProps<{ test: string; fun: number }>[] = [
    {
      label: "label 1",
      value: "test1",
    },
    {
      label: "label 2",
      value: "test2",
    },
  ];
  return (
    <ConfigTabContentContainer onSubmit={handleSubmit(handleChangePassword)}>
      <SelectTest
        isMultiple
        placeHolder="Test"
        isShowArrow
        list={listTest}
      ></SelectTest>
      <FormItem
        label="Mật khẩu hiện tại"
        isRequired
        error={errors.oldPassword?.message}
      >
        <Controller
          control={control}
          name="oldPassword"
          render={({ field: { value, onChange } }) => (
            <InputPassword
              placeholder="Mật khẩu hiện tại"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
      <FormItem
        label="Mật khẩu mới"
        isRequired
        error={errors.newPassword?.message}
      >
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { value, onChange } }) => (
            <InputPassword
              placeholder="Mật khẩu mới"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
      <FormItem
        label="Xác nhận mật khẩu"
        isRequired
        error={errors.confirmPassword?.message}
      >
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <InputPassword
              placeholder="Xác nhận mật khẩu"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
      <ConfigSubmitButton
        type="submit"
        disable={!FormService.isDirtyFields(dirtyFields)}
        isShowLoading={isSubmitting}
      >
        Cập nhật
      </ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
