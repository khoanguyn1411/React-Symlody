import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AppDatePicker, FormItem, Input, Select } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateMemberAsync } from "@/features/reducers";
import { IMember } from "@/features/types";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { PERSONAL_INFO_MESSAGES, PROVINCES_LIST } from "./constants";
import { PersonalInfoFormMapper } from "./mapper";
import { schema } from "./shema";
import { IFormUserConfig } from "./type";

export const TabPersonalInfo: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
  } = useForm<IFormUserConfig>({
    resolver: yupResolver(schema),
    defaultValues: PersonalInfoFormMapper.fromProfile(user),
  });

  const handleEditPersonalInfo = async (data: IFormUserConfig) => {
    const result = await dispatch(
      updateMemberAsync({
        payload: PersonalInfoFormMapper.toModel(data),
        id: user.profile_id,
        isRestore: false,
      })
    );
    if (result.meta.requestStatus !== "rejected") {
      toast.success(PERSONAL_INFO_MESSAGES.update.success);
      reset(
        PersonalInfoFormMapper.fromMember(result.payload.result as IMember)
      );
      return;
    }
    toast.error(PERSONAL_INFO_MESSAGES.update.error);
  };
  return (
    <ConfigTabContentContainer>
      <div className="grid grid-cols-3 gap-3">
        <FormItem label="Họ" isRequired error={errors.firstName?.message}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Họ"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
        <FormItem label="Tên" isRequired error={errors.lastName?.message}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Tên"
                style="modal"
                value={value}
                onChange={onChange}
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
                placeholder="Email"
                value={value}
                onChange={onChange}
                disable
              />
            )}
          />
        </FormItem>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <AppDatePicker value={value} style="modal" onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.class?.message}>
          <Controller
            control={control}
            name="class"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Lớp"
                style="modal"
                value={value}
                onChange={onChange}
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
                placeholder="MSSV"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
          <Controller
            control={control}
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
                placeholder="Số điện thoại"
                value={value}
                style="modal"
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
                placeholder="Địa chỉ"
                style="modal"
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
      </div>
      <ConfigSubmitButton
        disable={!isDirty}
        isShowLoading={isSubmitting}
        onSubmit={handleSubmit(handleEditPersonalInfo)}
      >
        Cập nhật
      </ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
