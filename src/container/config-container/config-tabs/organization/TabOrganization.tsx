import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { images } from "@/assets/images";
import { AvatarUpload, FormItem, Input } from "@/components";
import { useAppSelector } from "@/features";
import { FormService } from "@/utils";

import {
  ConfigSplitColumn,
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { schema } from "./schema";
import { IFormOrganizationConfig } from "./type";

export const TabOrganization: React.FC = () => {
  const { tenant } = useAppSelector((state) => state.department);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormOrganizationConfig>({ resolver: yupResolver(schema) });

  const [avatar, setAvatar] = useState("");

  const onResponse = (response: string, status: number) => {
    const result = JSON.parse(response);

    if (status === 200) {
      setAvatar(result?.[0].Location);
    }
  };

  const handleEditOrgInfo = () => {
    //TODO: Implement edit info feature of organization module.
  };

  const defaultValue =
    FormService.getDefaultValues<IFormOrganizationConfig>(tenant);

  if (!tenant) return null;

  return (
    <ConfigTabContentContainer onSubmit={handleSubmit(handleEditOrgInfo)}>
      <FormItem label="Ảnh đại diện tổ chức">
        <AvatarUpload
          char=""
          avatar={avatar || images.Logo}
          onResponse={onResponse}
        />
      </FormItem>
      <ConfigSplitColumn>
        <FormItem label="Tên tổ chức" isRequired error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
            defaultValue={defaultValue.get("name")}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Tên tổ chức"
                value={value}
                onChange={onChange}
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
                placeholder="Tên viết tẳt"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Địa chỉ mail"
          // isRequired error={errors.email?.message}
        >
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Địa chỉ mail"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Số điện thoại"
          // isRequired
          // error={errors.phone?.message}
        >
          <Controller
            control={control}
            name="phone"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Số điện thoại"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Trực thuộc trường"
          // isRequired
          // error={errors.schoolBelonged?.message}
        >
          <Controller
            control={control}
            name="schoolBelonged"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Trực thuộc trường"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Địa chỉ"
          // isRequired error={errors.address?.message}
        >
          <Controller
            control={control}
            name="address"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input placeholder="Địa chỉ" value={value} onChange={onChange} />
            )}
          />
        </FormItem>
      </ConfigSplitColumn>

      {/* <FormItem label="Giới thiệu tổ chức" error={errors.description?.message}>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Editor value={value} onChange={onChange} />
          )}
        />
      </FormItem> */}
      <ConfigSubmitButton>Lưu</ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
