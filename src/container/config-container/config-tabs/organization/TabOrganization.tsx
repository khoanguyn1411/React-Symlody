import { yupResolver } from "@hookform/resolvers/yup";
import { PreviewItem } from "@rpldy/upload-preview";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { images } from "@/assets/images";
import { AvatarUpload, FormItem, Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateTenantAsync } from "@/features/reducers";
import { ERolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { FormService } from "@/utils";

import {
  ConfigSplitColumn,
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { schema } from "./schema";
import { IFormOrganizationConfig } from "./type";

export const TabOrganization: React.FC = () => {
  const { tenant } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
    handleSubmit,
  } = useForm<IFormOrganizationConfig>({
    resolver: yupResolver(schema),
    defaultValues: tenant,
  });

  const [avatar, setAvatar] = useState(tenant?.logo);

  const onResponse = (previews: PreviewItem) => {
    setAvatar(previews?.url);
  };

  const handleEditOrgInfo = withPermission([
    ERolesID.Lead,
    ERolesID.SystemAdmin,
  ])(async (data: IFormOrganizationConfig) => {
    const result = await dispatch(
      updateTenantAsync({ id: tenant.id, body: { ...data } })
    );
    if (!result.payload) {
      toast.error("Cập nhật thông tin tổ chức không thành công");
      return;
    }
    toast.success("Cập nhật thông tin tổ chức thành công");
    reset(result.payload);
  });

  if (!tenant) {
    return;
  }

  return (
    <ConfigTabContentContainer>
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
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Tên viết tẳt"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Địa chỉ mail">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Địa chỉ mail"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Số điện thoại">
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Số điện thoại"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Trực thuộc trường">
          <Controller
            control={control}
            name="school"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Trực thuộc trường"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Địa chỉ">
          <Controller
            control={control}
            name="address"
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
          render={({ field: { value, onChange } }) => (
            <Editor value={value} onChange={onChange} />
          )}
        />
      </FormItem> */}
      <ConfigSubmitButton
        isShowLoading={isSubmitting}
        disable={!FormService.isDirtyFields(dirtyFields)}
        onSubmit={handleSubmit(handleEditOrgInfo)}
      >
        Lưu
      </ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
