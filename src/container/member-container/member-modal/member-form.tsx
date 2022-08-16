import React from "react";
import { Controller, FieldError, UseFormReturn } from "react-hook-form";

import {
  AppDatePicker,
  FormItem,
  Input,
  Select,
  SelectMultiple,
} from "@/components";
import { IMember } from "@/features/types/member-type";
import { FormService } from "@/utils";

import { getListRole } from "../constant";
import { MemberMapper } from "../mapper";
import { TFormMemberInfo } from "../type";

type TProps = {
  data?: IMember;
  formProps: UseFormReturn<TFormMemberInfo, any>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  let dataForm: TFormMemberInfo = null;
  if (data) {
    dataForm = MemberMapper.toFormValue(data);
  }

  const {
    control,
    formState: { errors },
  } = formProps;

  const defaultValue = FormService.getDefaultValues<TFormMemberInfo>(dataForm);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-5">
        <FormItem label="Họ" isRequired error={errors.lastName?.message}>
          <Controller
            control={control}
            name="lastName"
            defaultValue={defaultValue.get("lastName")}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Họ"
              />
            )}
          />
        </FormItem>
        <FormItem label="Tên" isRequired error={errors.firstName?.message}>
          <Controller
            control={control}
            name="firstName"
            defaultValue={defaultValue.get("firstName")}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Tên"
              />
            )}
          />
        </FormItem>
        <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
          <Controller
            control={control}
            defaultValue={defaultValue.get("gender")}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                list={["Nam", "Nữ"]}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Giới tính"
              />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            defaultValue={defaultValue.get("birthday")}
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
            defaultValue={defaultValue.get("class")}
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

        <FormItem label="MSSV" isRequired error={errors.studentId?.message}>
          <Controller
            control={control}
            name="studentId"
            defaultValue={defaultValue.get("studentId")}
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
            defaultValue={defaultValue.get("email")}
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
            defaultValue={defaultValue.get("phone")}
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
          defaultValue={defaultValue.get("department")}
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
          defaultValue={(defaultValue.get("role") as unknown as string[], [])}
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
          defaultValue={defaultValue.get("address")}
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
          defaultValue={defaultValue.get("home")}
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
