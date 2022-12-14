import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { AppDatePicker, FormItem, Input, Select } from "@/components";
import { PROVINCES_LIST } from "@/container/config-container/config-tabs/personal-info/constants";
import { useAppSelector } from "@/features";
import { departmentSelectors } from "@/features/reducers/department-reducer";
import { Gender } from "@/features/types/models/gender";

import { MemberForm } from "../type";

type TProps = {
  formProps: UseFormReturn<MemberForm>;
};

export const FormItems: React.FC<TProps> = ({ formProps }) => {
  const departmentList = useAppSelector(departmentSelectors.selectAll);

  const {
    control,
    formState: { errors },
  } = formProps;

  return (
    <>
      <div className="grid grid-cols-2 gap-x-5">
        <FormItem
          label="Họ"
          isRequired
          error={errors.authAccount?.lastName?.message}
        >
          <Controller
            control={control}
            name="authAccount.lastName"
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
        <FormItem
          label="Tên"
          isRequired
          error={errors.authAccount?.firstName?.message}
        >
          <Controller
            control={control}
            name="authAccount.firstName"
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
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                list={[
                  { value: Gender.Male, label: Gender.Male },
                  { value: Gender.Female, label: Gender.Female },
                ]}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Giới tính"
              />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.dob?.message}>
          <Controller
            control={control}
            name="dob"
            render={({ field: { value, onChange } }) => (
              <AppDatePicker
                isDefault1990
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.className?.message}>
          <Controller
            control={control}
            name="className"
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

        <FormItem
          label="Email"
          isRequired
          error={errors.authAccount?.email?.message}
        >
          <Controller
            control={control}
            name="authAccount.email"
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
          error={errors.phoneNumber?.message}
        >
          <Controller
            control={control}
            name="phoneNumber"
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
          render={({ field: { value, onChange } }) => (
            <Select
              list={departmentList.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
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

      <FormItem label="Quê quán" isRequired error={errors.homeTown?.message}>
        <Controller
          control={control}
          name="homeTown"
          render={({ field: { value, onChange } }) => (
            <Select
              list={PROVINCES_LIST}
              style="modal"
              value={value}
              onChange={onChange}
              placeHolder="Vị trí"
            />
          )}
        />
      </FormItem>
    </>
  );
};
