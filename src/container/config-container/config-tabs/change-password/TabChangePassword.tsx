import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AuthApi } from "@/api";
import { FormItem, InputPassword } from "@/components";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { schema } from "./shema";
import { IFormChangePassword } from "./type";

export const TabChangePassword: React.FC = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IFormChangePassword>({ resolver: yupResolver(schema) });

  const handleChangePassword = async (data: IFormChangePassword) => {
    // TODO: Implement change password feature.
    const result = await AuthApi.changePassword({
      old_password: data.currentPassword,
      new_password: data.newPassword,
    });
    if (result.kind !== "ok") {
      toast.error("Đổi mật khẩu không thành công");
      return;
    }
    toast.success("Đổi mật khẩu thành công");
    reset();
  };
  return (
    <ConfigTabContentContainer onSubmit={handleSubmit(handleChangePassword)}>
      <FormItem
        label="Mật khẩu hiện tại"
        isRequired
        error={errors.currentPassword?.message}
      >
        <Controller
          control={control}
          name="currentPassword"
          defaultValue=""
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
          defaultValue=""
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
        error={errors.confirmNewPassword?.message}
      >
        <Controller
          control={control}
          name="confirmNewPassword"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <InputPassword
              placeholder="Xác nhận mật khẩu"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
      <ConfigSubmitButton isSubmitting={isSubmitting}>
        Cập nhật
      </ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
