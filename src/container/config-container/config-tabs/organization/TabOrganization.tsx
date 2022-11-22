import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormItem, Input, Loading } from "@/components";
import { UploadedAvatar } from "@/components/elements/uploaded/avatar/UploadedAvatar";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateTenantAsync } from "@/features/reducers";
import { ERolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { useEffectSkipFirstRender } from "@/hooks";
import { FormService } from "@/utils";

import {
  ConfigSplitColumn,
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { schema } from "./schema";
import { IFormOrganizationConfig } from "./type";

export const TabOrganization: React.FC = () => {
  const { tenant, pendingTenant } = useAppSelector((state) => state.config);
  if (pendingTenant || !tenant) {
    return <Loading />;
  }
  return <_TabOrganization />;
};

export const _TabOrganization: React.FC = () => {
  const { tenant } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [defaultImageLink, setDefaultImageLink] = useState<string>(
    tenant.logo ?? ""
  );

  const {
    control,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
    handleSubmit,
  } = useForm<IFormOrganizationConfig>({
    resolver: yupResolver(schema),
    defaultValues: { ...tenant, logo: undefined },
  });

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
    reset({ ...result.payload, logo: undefined });
  });

  useEffectSkipFirstRender(() => {
    if (tenant) {
      setDefaultImageLink(tenant.logo);
    }
  }, [reset, tenant]);

  return (
    <ConfigTabContentContainer>
      <FormItem label="Ảnh đại diện tổ chức">
        <Controller
          control={control}
          name="logo"
          render={({ field: { value, onChange } }) => (
            <UploadedAvatar
              defaultImageLink={defaultImageLink}
              file={value}
              setFile={onChange}
            />
          )}
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
