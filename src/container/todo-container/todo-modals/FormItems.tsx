import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { AppDatePicker, FormItem, Input, Select } from "@/components";
import { IMember } from "@/features/types";
import { FormService } from "@/utils";

import { IFormTodoInfo } from "../type";

type TProps = {
  data?: IMember;
  formProps: UseFormReturn<IFormTodoInfo>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  //   let dataForm: IFormTodoInfo = null;
  //   if (data) {
  //     dataForm = MemberFormMapper.fromModel(data);
  //   }

  //   const dispatch = useAppDispatch();
  //   const departmentStore = useAppSelector((state) => state.department);

  //   useEffect(() => {
  //     dispatch(getDepartmentAsync());
  //   }, [dispatch]);

  const {
    control,
    formState: { errors },
  } = formProps;

  return (
    <>
      <FormItem label="Tên công việc" isRequired error={errors?.name.message}>
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

      <FormItem label="Mức độ ưu tiên" isRequired error={errors?.name.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Select
              style="modal"
              value={value}
              onChange={onChange}
              list={[{ value: "Cao" }, { value: "Thấp" }]}
            />
          )}
        />
      </FormItem>

      <FormItem label="Tên công việc" isRequired error={errors?.name.message}>
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
