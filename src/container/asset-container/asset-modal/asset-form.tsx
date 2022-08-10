import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  FormItem,
  Input,
  Radio,
  RadioGroup,
  RadioInput,
  TextArea,
} from "@/components";
import { formatCurrency, formatToNormalNumber } from "@/utils/format";

import { TFormAssetInfo } from "../type";

type TProps = {
  data?: TFormAssetInfo;
  formProps: UseFormReturn<TFormAssetInfo, any>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;
  return (
    <>
      <FormItem
        label="Tên tài sản"
        isRequired
        error={errors.assetName?.message}
      >
        <Controller
          control={control}
          name="assetName"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Tên tài sản"
            />
          )}
        />
      </FormItem>

      <FormItem label="Số lượng" isRequired error={errors.quantity?.message}>
        <Controller
          control={control}
          name="quantity"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              type={"number"}
              value={value}
              handleSideEffect={(event) => {
                if (
                  Number(event.target.value) &&
                  Number(event.target.value) < 1
                ) {
                  return { newValue: "1" };
                }
                return { newValue: event.target.value };
              }}
              onChange={onChange}
              placeholder="Số lượng"
            />
          )}
        />
      </FormItem>

      <FormItem label="Đơn giá" isRequired error={errors.price?.message}>
        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange } }) => (
            <Input
              handleSideEffect={(event) => {
                const value = event.target.value;
                const splitValue = formatToNormalNumber(value);
                if (value) {
                  if (isNaN(Number(splitValue))) {
                    return { newValue: "" };
                  }
                  const valueFormatted = formatCurrency(Number(splitValue));
                  return { newValue: valueFormatted };
                }
                return { newValue: value };
              }}
              style="modal"
              type={"text"}
              value={value}
              onChange={onChange}
              placeholder="Đơn giá"
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Người chịu trách nhiệm"
        isRequired
        error={errors.inCharge?.message}
      >
        <Controller
          control={control}
          name="inCharge"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Người chịu trách nhiệm"
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Chủ sở hữu tài sản"
        isRequired
        error={errors.owner?.message}
      >
        <Controller
          control={control}
          name="owner"
          render={({ field: { value, onChange } }) => (
            <RadioGroup activeValue={value} setActiveValue={onChange}>
              <Radio value={"Câu lạc bộ"} />
              <RadioInput value={"Khác"} />
            </RadioGroup>
          )}
        />
      </FormItem>

      <FormItem label="Ghi chú">
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <TextArea
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Ghi chú"
            />
          )}
        />
      </FormItem>
    </>
  );
};
