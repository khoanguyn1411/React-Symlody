import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  FormItem,
  Input,
  PickImage,
  RadioGroup,
  SelectUser,
  TextArea,
} from "@/components";
import { FormatService } from "@/utils";

import { IFormPropertyInfo } from "../type";

type TProps = {
  formProps: UseFormReturn<IFormPropertyInfo, any>;
};

export const FormItems: React.FC<TProps> = ({ formProps }) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = formProps;

  const handleInputPriceSideEffect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const splitValue = FormatService.removeFormatCurrency(value);
    if (value) {
      if (isNaN(FormatService.toNumber(splitValue))) {
        return { newValue: "" };
      }
      const valueFormatted = FormatService.toCurrency(
        FormatService.toNumber(splitValue)
      );
      return { newValue: valueFormatted };
    }
    return { newValue: value };
  };

  const handleQuantityChangeSideEffect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      FormatService.toNumber(event.target.value) &&
      FormatService.toNumber(event.target.value) < 1
    ) {
      return { newValue: "1" };
    }
    return { newValue: event.target.value };
  };

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
              type="number"
              value={value}
              onInputSideEffect={handleQuantityChangeSideEffect}
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
          render={({ field: { value, onChange } }) => (
            <Input
              onInputSideEffect={handleInputPriceSideEffect}
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
        error={errors.inChargeId?.message}
      >
        <Controller
          control={control}
          name="inChargeId"
          render={({ field: { value, onChange } }) => {
            return (
              <SelectUser
                placeholder="Người chịu trách nhiệm"
                selectedUserId={value}
                setSelectedUserId={onChange}
              />
            );
          }}
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
          render={({ field: { value, onChange } }) => {
            return (
              <RadioGroup
                isHaveOther
                listNormalRadios={["CLB"]}
                activeValue={value}
                setActiveValue={onChange}
              />
            );
          }}
        />
      </FormItem>
      <FormItem label="Hình ảnh / Video">
        <Controller
          control={control}
          name="image"
          render={({ field: { value, onChange } }) => (
            <PickImage
              file={value}
              defaultImageLink={getValues().imageLink}
              setFile={onChange}
            />
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
              height={"120px"}
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
