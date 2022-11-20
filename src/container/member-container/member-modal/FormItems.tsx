import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { AppDatePicker, FormItem, Input, Select } from "@/components";
import { useAppSelector } from "@/features";
import { departmentSelectors } from "@/features/reducers/department-reducer";
import { IMember } from "@/features/types";
import { FormService } from "@/utils";

import { MemberFormMapper } from "../mapper";
import { IFormMemberInfo } from "../type";

type TProps = {
  data?: IMember;
  formProps: UseFormReturn<IFormMemberInfo>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  let dataForm: IFormMemberInfo = null;
  if (data) {
    dataForm = MemberFormMapper.fromModel(data);
  }

  const departmentStore = useAppSelector((state) => state.department);
  const departmentList = useAppSelector(departmentSelectors.selectAll);

  const {
    control,
    formState: { errors },
  } = formProps;

  const defaultValue = FormService.getDefaultValues<IFormMemberInfo>(dataForm);

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
                list={[{ value: "Nam" }, { value: "Nữ" }]}
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
              list={departmentList.map((item) => ({
                value: item.name,
              }))}
              isLoading={departmentStore.pending}
              style={"modal"}
              value={value}
              placeHolder="Ban"
              onChange={onChange}
            />
          )}
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
