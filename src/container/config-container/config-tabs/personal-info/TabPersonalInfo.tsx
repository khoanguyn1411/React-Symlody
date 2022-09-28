import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { AppDatePicker, FormItem, Input } from "@/components";

import {
  ConfigSplitColumn,
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { schema } from "./shema";
import { IFormUserConfig } from "./type";

export const TabPersonalInfo: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormUserConfig>({ resolver: yupResolver(schema) });
  const handleEditPersonalInfo = () => {
    //TODO: Implement edit personal info feature of config module.
  };
  return (
    <ConfigTabContentContainer onSubmit={handleSubmit(handleEditPersonalInfo)}>
      <ConfigSplitColumn>
        <FormItem label="Email" isRequired error={errors.email?.message}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="nguyenvana@gmail.com"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.class?.message}>
          <Controller
            control={control}
            name="class"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input placeholder="Lớp" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            control={control}
            name="birthday"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <AppDatePicker value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="MSSV" isRequired error={errors.studentId?.message}>
          <Controller
            control={control}
            name="studentId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input placeholder="MSSV" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
          <Controller
            control={control}
            name="gender"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Giới tính"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Địa chỉ" isRequired error={errors.address?.message}>
          <Controller
            control={control}
            name="address"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input placeholder="Địa chỉ" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem
          label="Số điện thoại"
          isRequired
          error={errors.phone?.message}
        >
          <Controller
            control={control}
            name="phone"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Vd: 0909xxxxx"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Quê quán" isRequired error={errors.home?.message}>
          <Controller
            control={control}
            name="home"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input placeholder="Quê quán" value={value} onChange={onChange} />
            )}
          />
        </FormItem>
      </ConfigSplitColumn>
      <ConfigSubmitButton>Cập nhật</ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
