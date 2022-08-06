import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";

import {
  AppDatePicker,
  FormItem,
  Input,
  Modal,
  Select,
  SelectMultiple,
} from "@/components";
import { getListRole } from "@/constants";
import { IMember } from "@/features/types/member-type";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormMemberInfo } from "../type";

export const ModalEditMember: React.FC<THookModalProps<IMember>> = ({
  data,
  isShowing,
  setToggle,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormMemberInfo>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditMember = (editInfo: TFormMemberInfo) => {
    setIsLoading(true);
    console.log(editInfo);
  };
  if (data == null) {
    return;
  }
  return (
    <Modal
      resetForm={reset}
      toggle={{ setToggle }}
      title="Chỉnh sửa thành viên"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditMember),
        isLoading: isLoading,
      }}
    >
      <FormItem label="Họ và tên" isRequired error={errors.fullName?.message}>
        <Controller
          control={control}
          name="fullName"
          render={({
            field: { value = data.auth_account.last_name, onChange },
          }) => (
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
            name="gender"
            render={({ field: { value = data.gender, onChange } }) => (
              <Select
                list={["Nam", "Nữ"]}
                style="modal"
                value={value === 1 ? "Nam" : "Nữ"}
                onChange={onChange}
                placeHolder="Giới tính"
              />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { value = data.dob, onChange } }) => (
              <AppDatePicker style="modal" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.class?.message}>
          <Controller
            control={control}
            name="class"
            render={({ field: { value = data.class_name, onChange } }) => (
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
            render={({ field: { value = data.student_id, onChange } }) => (
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
            render={({
              field: { value = data.auth_account.email, onChange },
            }) => (
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
            control={control}
            name="phone"
            render={({ field: { value = data.phone_number, onChange } }) => (
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
          render={({ field: { value = data.department.name, onChange } }) => (
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
          render={({ field: { value = [], onChange } }) => {
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
          render={({ field: { value = data.address, onChange } }) => (
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
          render={({ field: { value = data.home_town, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Quê quán"
            />
          )}
        />
      </FormItem>
    </Modal>
  );
};
