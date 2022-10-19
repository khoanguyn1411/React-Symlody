import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { FormItem, Input } from "@/components";

import { IFormTodoInfo } from "../type";

type TProps = {
  data?: any;
  formProps: UseFormReturn<IFormTodoInfo>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;

  return (
    <>
      <FormItem label="Tên công việc" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên công việc"
            />
          )}
        />
      </FormItem>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <FormItem
            label="Tên công việc"
            isRequired
            error={errors.name?.message}
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  style="modal"
                  value={value}
                  onChange={onChange}
                  placeholder="Tên công việc"
                />
              )}
            />
          </FormItem>
        </div>

        <div className="col-span-2">
          <FormItem
            label="Tên công việc"
            isRequired
            error={errors.name?.message}
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  style="modal"
                  value={value}
                  onChange={onChange}
                  placeholder="Tên công việc"
                />
              )}
            />
          </FormItem>
        </div>
      </div>
      <FormItem label="Tên công việc" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên công việc"
            />
          )}
        />
      </FormItem>
      <FormItem label="Tên công việc" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên công việc"
            />
          )}
        />
      </FormItem>
      <FormItem label="Tên công việc" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên công việc"
            />
          )}
        />
      </FormItem>
    </>
  );
};
