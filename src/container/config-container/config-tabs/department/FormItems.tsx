import { Controller, UseFormReturn } from "react-hook-form";

import { FormItem, Input } from "@/components";

import { IFormDepartment } from "./types";

type TProps = {
  formProps: UseFormReturn<IFormDepartment>;
};

export const FormItems: React.FC<TProps> = ({ formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;

  return (
    <>
      <FormItem label="Tên ban" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên ban"
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Tên viết tắt"
        isRequired
        error={errors.abbreviation_name?.message}
      >
        <Controller
          control={control}
          name="abbreviation_name"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên viết tắt"
            />
          )}
        />
      </FormItem>
    </>
  );
};
