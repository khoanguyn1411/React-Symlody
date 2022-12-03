import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormItem, Input, Loading } from "@/components";
import { UploadedAvatar } from "@/components/elements/uploaded/avatar/UploadedAvatar";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateTenantAsync } from "@/features/reducers";
import { ITenant, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { useEffectSkipFirstRender } from "@/hooks";
import { FormService } from "@/utils";

import {
  ConfigSplitColumn,
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { ORGANIZATION_MESSAGES } from "./constant";
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

  const getDefaultValue = (rest: ITenant): IFormOrganizationConfig => {
    return {
      ...rest,
      logo: undefined,
      email: tenant.email ?? "",
      phone_number: tenant.phone_number ?? "",
      school: tenant.school ?? "",
      address: tenant.address ?? "",
    };
  };

  const {
    control,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
    handleSubmit,
  } = useForm<IFormOrganizationConfig>({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValue(tenant),
  });

  const handleEditOrgInfo = withPermission([RolesID.Lead, RolesID.SystemAdmin])(
    async (data: IFormOrganizationConfig) => {
      const result = await dispatch(
        updateTenantAsync({ id: tenant.id, body: data })
      );
      if (!result.payload) {
        toast.error(ORGANIZATION_MESSAGES.update.error);
        return;
      }
      toast.success(ORGANIZATION_MESSAGES.update.success);
      reset(getDefaultValue(result.payload));
    }
  );

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
              alt="Logo tổ chức"
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
