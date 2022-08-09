import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { FormItem, Input, Modal, Radio, RadioGroup } from "@/components";
import { RadioInput } from "@/components/elements/radio/radio-components/radio-input";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormAssetInfo } from "../type";

export const ModalCreateAsset: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  setToggle,
}) => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormAssetInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const handleCreateAsset = (data: TFormAssetInfo) => {
    console.log(data);
  };

  return (
    <Modal
      reset={reset}
      toggle={{ setToggle }}
      title="Thêm tài sản"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Thêm",
        event: handleSubmit(handleCreateAsset),
      }}
    >
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

      <FormItem label="Số lượng" isRequired>
        <Controller
          control={control}
          name="quantity"
          render={({ field: { value = "1", onChange } }) => (
            <Input
              style="modal"
              type={"number"}
              value={value}
              handleSideEffect={(event) => {
                if (Number(event.target.value) < 0) {
                  onChange(0);
                  return { isDisableOnChange: true };
                }
                return { isDisableOnChange: false };
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
              style="modal"
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
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Ghi chú"
            />
          )}
        />
      </FormItem>
    </Modal>
  );
};
