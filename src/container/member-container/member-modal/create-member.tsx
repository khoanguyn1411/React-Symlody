import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  AppDatePicker,
  FormItem,
  Input,
  Modal,
  Select,
  SelectMultiple,
} from "@/components";
import { getListRole } from "@/constants";
import { useAppDispatch } from "@/features";
import { createMemberAsync, getMembersAsync } from "@/features/reducers";
import { TModalProps } from "@/hooks";

import { MemberMapper } from "../mapper";
import { schema } from "../schema";
import { TFormMemberInfo } from "../type";

export const ModalCreateMember: React.FC<TModalProps<undefined>> = ({
  isShowing,
  setToggle,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormMemberInfo>({ resolver: yupResolver(schema) });

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateMember = async (data: TFormMemberInfo) => {
    setIsLoading(true);
    const memberDto = MemberMapper.toDto(data);
    const res = await dispatch(createMemberAsync(memberDto));
    if (!res.payload) {
      toast.error("Tạo thành viên thất bại");
      return;
    }
    setIsLoading(false);
    dispatch(getMembersAsync());
    reset();
  };
  return (
    <Modal
      resetForm={reset}
      toggle={{ setToggle }}
      title="Tạo thành viên"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: isLoading,
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

        <FormItem
          label="Số điện thoại"
          isRequired
          error={errors.phone?.message}
        >
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
      </div>

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
                placeHolder="Chọn vị trí"
              />
            );
          }}
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
