import React, { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { FormItem, Input, PickImage, RadioGroup, TextArea } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync, memberSelectors } from "@/features/reducers";
import { IProperty } from "@/features/types";
import { FormatService, FormService } from "@/utils";

import { PropertyFormMapper } from "../mapper";
import { PropertyOwnerSelect } from "../property-owner-select";
import { IFormPropertyInfo } from "../type";

type TProps = {
  data?: IProperty;
  formProps: UseFormReturn<IFormPropertyInfo, any>;
};

export const FormItems: React.FC<TProps> = ({ data, formProps }) => {
  let dataForm: IFormPropertyInfo = null;
  if (data) {
    dataForm = PropertyFormMapper.fromModel(data);
  }
  const dispatch = useAppDispatch();
  const memberList = useAppSelector(memberSelectors.selectAll);
  const memberStore = useAppSelector((state) => state.member);
  useEffect(() => {
    if (
      memberList.length > 0 &&
      memberStore.listQueryMember.is_archived == null
    ) {
      return;
    }
    dispatch(getMembersAsync(memberStore.listQueryMember));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    formState: { errors },
  } = formProps;

  const defaultValue =
    FormService.getDefaultValues<IFormPropertyInfo>(dataForm);
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
              onInputSideEffect={(event) => {
                if (
                  FormatService.toNumber(event.target.value) &&
                  FormatService.toNumber(event.target.value) < 1
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
              onInputSideEffect={(event) => {
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

      <FormItem label="Người chịu trách nhiệm" isRequired>
        <PropertyOwnerSelect />
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
              setFile={onChange}
              defaultImageLink={defaultValue.get("imageLink")}
            />
          )}
        />
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
