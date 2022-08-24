import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  FormItem,
  Input,
  PickImageVideo,
  RadioGroup,
  TextArea,
} from "@/components";
import { FormatService, FormService } from "@/utils";

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
  const defaultValue = FormService.getDefaultValues<TFormAssetInfo>(data);
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
          defaultValue={defaultValue.get("assetName")}
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
          defaultValue={defaultValue.get("quantity")}
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              type="number"
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

      <FormItem label="Đơn giá">
        <Controller
          control={control}
          name="price"
          defaultValue={defaultValue.get("price")}
          render={({ field: { value, onChange } }) => (
            <Input
              handleSideEffect={(event) => {
                const value = event.target.value;
                const splitValue = FormatService.toNormalNumber(value);
                if (value) {
                  if (isNaN(Number(splitValue))) {
                    return { newValue: "" };
                  }
                  const valueFormatted = FormatService.toCurrency(
                    Number(splitValue)
                  );
                  return { newValue: valueFormatted };
                }
                return { newValue: value };
              }}
              style="modal"
              type="text"
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
          defaultValue={defaultValue.get("inCharge")}
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
          defaultValue={defaultValue.get("owner")}
          name="owner"
          render={({ field: { value, onChange } }) => {
            return (
              <RadioGroup
                isHaveOther
                listNormalRadios={["Câu lạc bộ"]}
                activeValue={value}
                setActiveValue={onChange}
              />
            );
          }}
        />
      </FormItem>

      <FormItem label="Hình ảnh / Video">
        <PickImageVideo />
      </FormItem>

      <FormItem label="Ghi chú">
        <Controller
          control={control}
          name="note"
          defaultValue={defaultValue.get("note")}
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
