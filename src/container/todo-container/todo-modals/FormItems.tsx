import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  AppDatePicker,
  Editor,
  FormItem,
  Input,
  Select,
  SelectUser,
} from "@/components";

import { TodoPriorityIcon } from "../TodoPriorityIcon";
import { EPriority, IFormTodoInfo } from "../type";

type TProps = {
  data?: any;
  formProps: UseFormReturn<IFormTodoInfo>;
};

export const FormItems: React.FC<TProps> = ({ formProps }) => {
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
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <FormItem
            label="Mức độ ưu tiên"
            isRequired
            error={errors.priority?.message}
          >
            <Controller
              control={control}
              name="priority"
              defaultValue={EPriority.Normal}
              render={({ field: { value, onChange } }) => (
                <Select
                  style="modal"
                  value={value}
                  onChange={onChange}
                  list={[
                    {
                      prefix: <TodoPriorityIcon isPriority={false} />,
                      value: EPriority.Normal,
                    },
                    {
                      prefix: <TodoPriorityIcon isPriority />,
                      value: EPriority.High,
                    },
                  ]}
                />
              )}
            />
          </FormItem>
        </div>

        <div className="col-span-3">
          <FormItem
            label="Ngày hết hạn"
            isRequired
            error={errors.expiredDate?.message}
          >
            <Controller
              control={control}
              name="expiredDate"
              render={({ field: { value, onChange } }) => (
                <AppDatePicker
                  style="modal"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
        </div>
      </div>
      <FormItem
        label="Người được giao"
        isRequired
        error={errors.assignee?.message}
      >
        <Controller
          control={control}
          name="assignee"
          render={({ field: { value, onChange } }) => (
            <SelectUser
              placeholder="Người được giao"
              userId={value}
              setUserId={onChange}
            />
          )}
        />
      </FormItem>
      <FormItem
        label="Người theo dõi"
        isRequired
        error={errors.reporter?.message}
      >
        <Controller
          control={control}
          name="reporter"
          render={({ field: { value, onChange } }) => (
            <SelectUser
              placeholder="Người theo dõi"
              userId={value}
              setUserId={onChange}
            />
          )}
        />
      </FormItem>
      <FormItem label="Mô tả công việc" error={errors.description?.message}>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <Editor
              value={value}
              onChange={onChange}
              placeholder="Nhập mô tả cho công việc."
            />
          )}
        />
      </FormItem>
    </>
  );
};
