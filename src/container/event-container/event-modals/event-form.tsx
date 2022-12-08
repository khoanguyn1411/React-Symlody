import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { AppDatePicker, FormItem, Input, Select } from "@/components";
import { generateArrayFromEnum } from "@/utils/services/generate-service";

import { EEventStatus } from "../constant";
import { TFormEventInfo } from "../type";
type TProps = {
  formProps: UseFormReturn<TFormEventInfo>;
};

export const FormItems: React.FC<TProps> = ({ formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;
  return (
    <>
      <FormItem
        label="Tên sự kiện"
        isRequired
        error={errors.eventName?.message}
      >
        <Controller
          control={control}
          name="eventName"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên sự kiện"
            />
          )}
        />
      </FormItem>
      <FormItem
        label="Thời gian bắt đầu"
        isRequired
        error={errors.startTime?.message}
      >
        <Controller
          control={control}
          name="startTime"
          render={({ field: { value, onChange } }) => (
            <AppDatePicker
              isTimePicker
              style="modal"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Thời gian kết thúc"
        isRequired
        error={errors.endTime?.message}
      >
        <Controller
          control={control}
          name="endTime"
          render={({ field: { value, onChange } }) => (
            <AppDatePicker
              isTimePicker
              style="modal"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Địa điểm tổ chức"
        isRequired
        error={errors.place?.message}
      >
        <Controller
          control={control}
          name="place"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Địa điểm tổ chức"
            />
          )}
        />
      </FormItem>

      <FormItem label="Trạng thái" isRequired error={errors.status?.message}>
        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              style="modal"
              onChange={onChange}
              list={generateArrayFromEnum(EEventStatus).map((item) => ({
                value: item,
                label: item,
              }))}
              placeHolder="Trạng thái"
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Ban nắm chính"
        isRequired
        error={errors.department?.message}
      >
        <Controller
          control={control}
          name="department"
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              style="modal"
              onChange={onChange}
              list={["AD", "HR"].map((item) => ({
                value: item,
                label: item,
              }))}
              placeHolder="Ban nắm chính"
            />
          )}
        />
      </FormItem>

      {/* <FormItem label="Mô tả sự kiện" error={errors.description?.message}>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <TextArea
              value={value}
              style="modal"
              onChange={onChange}
              placeholder="Mô tả sự kiện"
            />
          )}
        />
      </FormItem> */}
    </>
  );
};
