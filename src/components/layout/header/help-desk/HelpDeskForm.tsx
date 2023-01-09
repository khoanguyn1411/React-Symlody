import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { Editor, FormItem, Input, Select } from "@/components/elements";
import { HelpDesk, HelpDeskCategories } from "@/features/types";
import { enumToArray } from "@/utils/funcs/enum-to-array";

type Props = {
  formProps: UseFormReturn<HelpDesk>;
};

export const HelpDeskForm: React.FC<Props> = ({ formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;
  return (
    <>
      <FormItem label="Tiêu đề" isRequired error={errors.title?.message}>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tiêu đề"
            />
          )}
        />
      </FormItem>

      <FormItem label="Kiểu góp ý" error={errors.category?.message}>
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <Select
              style="modal"
              value={value}
              onChange={onChange}
              placeHolder="Kiểu góp ý"
              list={enumToArray(HelpDeskCategories).map((item) => ({
                value: item,
                label: item,
              }))}
            />
          )}
        />
      </FormItem>

      <FormItem label="Nội dung góp ý" error={errors.content?.message}>
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <Editor
              value={value}
              onChange={onChange}
              placeholder="Viết nội dung góp ý tại đây ..."
            />
          )}
        />
      </FormItem>
    </>
  );
};
