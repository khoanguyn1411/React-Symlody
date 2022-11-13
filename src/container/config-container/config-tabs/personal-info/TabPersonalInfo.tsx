import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { MemberApi } from "@/api";
import { AppDatePicker, FormItem, Input, SelectControl } from "@/components";
import { provinces } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateProfile } from "@/features/reducers";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { GENDER_OPTIONS } from "./constants";
import { schema } from "./shema";
import { IFormUserConfig } from "./type";

export const TabPersonalInfo: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const PROVINCES = provinces.map((p) => ({
    value: p.city,
    label: p.province,
  }));

  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<IFormUserConfig>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        class: user?.class_name,
        studentId: user?.student_id,
        birthday: user.dob,
        phone: user?.phone_number,
        home: user?.home_town,
        address: user?.address,
        gender: user?.gender.toString(),
      });
    }
  }, [reset, user]);
  const handleEditPersonalInfo = async (data: IFormUserConfig) => {
    //TODO: Implement edit personal info feature of config module.
    const result = await MemberApi.updateMember(user.id, {
      gender: Number(data.gender),
      home_town: data.home,
      phone_number: data.phone,
      student_id: data.studentId,
      class_name: data.class,
      address: data.address,

      auth_account: {
        // email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
      },
      avatar: undefined,
      dob: dayjs(data.birthday).format("YYYY-MM-DD").toString(),
      department_id: undefined,
      is_archived: undefined,
    });
    if (result.kind === "ok") {
      toast.success("Cập nhật thông tin thành công");
      dispatch(
        updateProfile({
          id: user.id,
          gender: Number(data.gender),
          home_town: data.home,
          phone_number: data.phone,
          student_id: data.studentId,
          class_name: data.class,
          address: data.address,
          first_name: data.firstName,
          last_name: data.lastName,
          dob: data.birthday,
          email: data.email,
        })
      );
    }
  };
  return (
    <ConfigTabContentContainer>
      <div className="grid grid-cols-3 gap-3">
        <FormItem label="Họ" isRequired error={errors.firstName?.message}>
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <SelectControl
                name="gender"
                options={GENDER_OPTIONS}
                selected={value}
                onValueChange={(e) => onChange(e.target.value)}
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <SelectControl
                name="home"
                options={PROVINCES}
                selected={value}
                placeholder="Quê quán"
                onValueChange={(e) => onChange(e.target.value)}
              />
            )}
          />
        </FormItem>
      </div>
      <ConfigSubmitButton
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(handleEditPersonalInfo)}
      >
        Cập nhật
      </ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
