import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormItem, InputPassword } from "@/components";
import { useAppDispatch } from "@/features";
import { changePasswordAsync } from "@/features/reducers";
import { FormService } from "@/utils";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
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
    defaultValues: { new_password: "", old_password: "", confirm_password: "" },
  });

  const handleChangePassword = async (data: IFormChangePassword) => {
    const result = await dispatch(changePasswordAsync(data));
    if (result.meta.requestStatus !== "fulfilled") {
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
        error={errors.old_password?.message}
      >
        <Controller
          control={control}
          name="old_password"
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
        error={errors.new_password?.message}
      >
        <Controller
          control={control}
          name="new_password"
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
        error={errors.confirm_password?.message}
      >
        <Controller
          control={control}
          name="confirm_password"
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
