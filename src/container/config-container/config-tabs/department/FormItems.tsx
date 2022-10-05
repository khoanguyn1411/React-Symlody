import { Controller, UseFormReturn } from "react-hook-form";

import { FormItem, Input } from "@/components";
import { IDepartment } from "@/features/types";
import { FormService } from "@/utils";

import { IFormDepartment } from "./types";

type TProps = {
  data?: IDepartment;
  formProps: UseFormReturn<IFormDepartment>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;

  const defaultValue = FormService.getDefaultValues<IFormDepartment>(data);

  return (
    <>
      <FormItem label="Tên ban" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          defaultValue={defaultValue.get("name")}
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
          defaultValue={defaultValue.get("abbreviation_name")}
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
