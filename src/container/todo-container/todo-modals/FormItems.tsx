import classNames from "classnames";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  AppDatePicker,
  CheckboxGroup,
  Editor,
  FormItem,
  Select,
  SelectUser,
  TextArea,
} from "@/components";

import { TodoPriorityIcon } from "../TodoPriorityIcon";
import { Priority, TodoForm } from "../type";

type TProps = {
  mode: "edit" | "create";
  formProps: UseFormReturn<TodoForm>;
};

export const FormItems: React.FC<TProps> = ({ mode, formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;
  const isEditMode = mode === "edit";
  return (
    <div className={classNames(isEditMode && "grid grid-cols-2 gap-5")}>
      <div>
        <FormItem
          label="Tên công việc"
          isRequired
          error={errors.title?.message}
        >
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <TextArea
                height={"40px"}
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Tên công việc"
              />
            )}
          />
        </FormItem>
        {isEditMode && (
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
        )}
      </div>
      <div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <FormItem
              label="Mức độ ưu tiên"
              isRequired
              error={errors.isPriority?.message}
            >
              <Controller
                control={control}
                name="isPriority"
                render={({ field: { value, onChange } }) => (
                  <Select
                    style="modal"
                    value={value}
                    onChange={onChange}
                    list={[
                      {
                        prefix: <TodoPriorityIcon isPriority={false} />,
                        value: false,
                        label: Priority.Normal,
                      },
                      {
                        prefix: <TodoPriorityIcon isPriority />,
                        label: Priority.High,
                        value: true,
                      },
                    ]}
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="col-span-3">
            <FormItem label="Ngày hết hạn" error={errors.endDate?.message}>
              <Controller
                control={control}
                name="endDate"
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
                selectedUserId={value}
                setSelectedUserId={onChange}
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
                selectedUserId={value}
                setSelectedUserId={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="" error={errors.isSentEmail?.message}>
          <Controller
            control={control}
            name="isSentEmail"
            render={({ field: { value, onChange } }) => {
              return (
                <CheckboxGroup
                  list={[
                    { label: "Thông báo qua email", value: "isEmailNotify" },
                  ]}
                  isOnlyOne
                  selectedItems={value}
                  setSelectedItems={onChange}
                />
              );
            }}
          />
        </FormItem>
        {!isEditMode && (
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
        )}
      </div>
    </div>
  );
};
