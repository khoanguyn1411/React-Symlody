import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { AppDatePicker, FormItem, Input, Modal, Select } from "@/components";
import { TModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormMemberInfo } from "../type";

export const ModalCreateMember: React.FC<TModalProps> = ({
  isShowing,
  setHidden,
  setShow,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormMemberInfo>({ resolver: yupResolver(schema) });

  const handleCreateMember = (data: TFormMemberInfo) => {
    console.log(data);
  };

  return (
    <Modal
      resetForm={reset}
      toggle={{ setShow, setHidden }}
      title="Tạo thành viên"
      size="md"
      isShowing={isShowing}
      handleEvent={{
        title: "Thêm thành viên",
        event: handleSubmit(handleCreateMember),
      }}
    >
      <FormItem label="Họ và tên" isRequired error={errors.fullName?.message}>
        <Controller
          control={control}
          name="fullName"
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
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                list={["Nam", "Nữ"]}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Chọn giới tính"
              />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <AppDatePicker style="modal" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Ban" isRequired error={errors.department?.message}>
          <Controller
            control={control}
            name="department"
            render={({ field: { value, onChange } }) => (
              <Select
                list={["Ban điều hành", "Ban chấp hành"]}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Chọn ban"
              />
            )}
          />
        </FormItem>

        <FormItem label="Vị trí" isRequired error={errors.role?.message}>
          <Controller
            control={control}
            name="role"
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Vị trí"
              />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.class?.message}>
          <Controller
            control={control}
            name="class"
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
      </div>

      <FormItem label="Email" isRequired error={errors.email?.message}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Email"
            />
          )}
        />
      </FormItem>

      <FormItem label="Số điện thoại" isRequired error={errors.phone?.message}>
        <Controller
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

      <FormItem label="Quê quán" isRequired error={errors.home?.message}>
        <Controller
          control={control}
          name="home"
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
    </Modal>
  );
};
