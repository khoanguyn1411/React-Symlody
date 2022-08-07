import React from "react";
import { Controller, FieldError, UseFormReturn } from "react-hook-form";

import {
  AppDatePicker,
  FormItem,
  Input,
  Select,
  SelectMultiple,
} from "@/components";
import { getListRole } from "@/constants";
import { IMember } from "@/features/types/member-type";

import { MemberMapper } from "../mapper";
import { TFormMemberInfo } from "../type";

type TProps = {
  data?: IMember;
  formProps: UseFormReturn<TFormMemberInfo, any>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;

  const getDefaultValue = (defaultValue: any, key: keyof TFormMemberInfo) => {
    if (data) {
      const dataForm = MemberMapper.toFormValue(data);
      return dataForm[key];
    }
    return defaultValue;
  };

  return (
    <>
      <FormItem label="Họ và tên" isRequired error={errors.fullName?.message}>
        <Controller
          control={control}
          name="fullName"
          defaultValue={getDefaultValue("", "fullName")}
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Họ và tên"
            />
          )}
        />
      </FormItem>
      <div className="grid grid-cols-2 gap-x-5">
        <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
          <Controller
            control={control}
            defaultValue={getDefaultValue("", "gender")}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                list={["Nam", "Nữ"]}
                style="modal"
                value={Number(value) === 1 ? "Nam" : "Nữ"}
                onChange={onChange}
                placeHolder="Giới tính"
              />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            defaultValue={getDefaultValue("", "birthday")}
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <AppDatePicker style="modal" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.class?.message}>
          <Controller
            control={control}
            name="class"
            defaultValue={getDefaultValue("", "class")}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Lớp"
              />
            )}
          />
        </FormItem>

        <FormItem label="MSSV" isRequired error={errors.id?.message}>
          <Controller
            control={control}
            name="id"
            defaultValue={getDefaultValue("", "id")}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="MSSV"
              />
            )}
          />
        </FormItem>

        <FormItem label="Email" isRequired error={errors.email?.message}>
          <Controller
            control={control}
            name="email"
            defaultValue={getDefaultValue("", "email")}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Vd: abc@gmail.com"
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Số điện thoại"
          isRequired
          error={errors.phone?.message}
        >
          <Controller
            defaultValue={getDefaultValue("", "phone")}
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Số điện thoại"
              />
            )}
          />
        </FormItem>
      </div>

      <FormItem label="Ban" isRequired error={errors.department?.message}>
        <Controller
          control={control}
          name="department"
          defaultValue={getDefaultValue("", "department")}
          render={({ field: { value, onChange } }) => (
            <Select
              list={["AD", "HR"]}
              style="modal"
              value={value}
              onChange={onChange}
              placeHolder="Ban"
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Vị trí"
        isRequired
        error={(errors.role as unknown as FieldError)?.message}
      >
        <Controller
          control={control}
          name="role"
          defaultValue={getDefaultValue([], "role")}
          render={({ field: { value, onChange } }) => {
            return (
              <SelectMultiple
                list={getListRole()}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Vị trí"
              />
            );
          }}
        />
      </FormItem>

      <FormItem label="Địa chỉ" isRequired error={errors.address?.message}>
        <Controller
          control={control}
          name="address"
          defaultValue={getDefaultValue("", "address")}
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Địa chỉ"
            />
          )}
        />
      </FormItem>

      <FormItem label="Quê quán" isRequired error={errors.home?.message}>
        <Controller
          control={control}
          name="home"
          defaultValue={getDefaultValue("", "home")}
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Quê quán"
            />
          )}
        />
      </FormItem>
    </>
  );
};
