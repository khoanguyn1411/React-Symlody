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
            label="Mức độ ưu tiên"
            isRequired
            error={errors.name?.message}
          >
            <Controller
              control={control}
              name="priority"
              render={({ field: { value, onChange } }) => (
                <Select
                  style="modal"
                  value={value}
                  onChange={onChange}
                  list={[
                    {
                      prefix: <TodoPriorityIcon isPriority={false} />,
                      value: "Cao",
                    },
                    {
                      prefix: <TodoPriorityIcon isPriority />,
                      value: "Thấp",
                    },
                  ]}
                />
              )}
            />
          </FormItem>
        </div>

        <div className="col-span-2">
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
              inChargerId={value}
              setInChargerId={onChange}
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
              inChargerId={value}
              setInChargerId={onChange}
            />
          )}
        />
      </FormItem>
      <FormItem label="Mô tả công việc" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <Editor
              value={value}
              onChange={onChange}
              placeholder="Gõ @ để nhắc đến ai đó và thông báo cho họ về công việc này."
            />
          )}
        />
      </FormItem>
    </>
  );
};
