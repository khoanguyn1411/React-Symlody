import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { FormItem, InputPassword } from "@/components";
import { useAppDispatch } from "@/features";
import { changePasswordAsync } from "@/features/reducers";
import { FormService } from "@/utils/funcs/form-service";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { CHANGE_PASSWORD_MESSAGE } from "./constant";
import { schema } from "./schema";
import { ChangePasswordForm } from "./type";

export const TabChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    setError,
    formState: { errors, isSubmitting, dirtyFields },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(schema),
    defaultValues: { newPassword: "", oldPassword: "", confirmPassword: "" },
  });

  const handleChangePassword = async (data: ChangePasswordForm) => {
    const response = await dispatch(changePasswordAsync(data));
    FormService.validateResponse({
      asyncThunk: changePasswordAsync,
      response,
      successMessage: CHANGE_PASSWORD_MESSAGE.success,
      errorMessage: CHANGE_PASSWORD_MESSAGE.error,
      onSuccess: () => {
        reset();
      },
      setError,
    });
  };

  return (
    <ConfigTabContentContainer onSubmit={handleSubmit(handleChangePassword)}>
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
