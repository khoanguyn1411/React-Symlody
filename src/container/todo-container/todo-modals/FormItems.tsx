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
import { EPriority, IFormTodoInfo } from "../type";

type TProps = {
  mode: "edit" | "create";
  formProps: UseFormReturn<IFormTodoInfo>;
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
        <FormItem label="Tên công việc" isRequired error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
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
              error={errors.priority?.message}
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
            <FormItem label="Ngày hết hạn" error={errors.expiredDate?.message}>
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

        <FormItem label="" error={errors.isNotifyEmail?.message}>
          <Controller
            control={control}
            name="isNotifyEmail"
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
