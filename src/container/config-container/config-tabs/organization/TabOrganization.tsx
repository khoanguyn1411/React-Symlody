import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AppForm, FormItem, Input, Loading } from "@/components";
import { UploadedAvatar } from "@/components/elements/uploaded/avatar/UploadedAvatar";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateOrganizationAsync } from "@/features/reducers";
import { Organization, Roles } from "@/features/types";
import { FormService } from "@/utils/funcs/form-service";

import {
  ConfigSplitColumn,
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { ORGANIZATION_MESSAGES } from "./constant";
import { schema } from "./schema";
import { OrganizationForm } from "./type";

export const TabOrganization: React.FC = () => {
  const { organization, pendingOrganization } = useAppSelector(
    (state) => state.config
  );
  if (pendingOrganization || !organization) {
    return <Loading />;
  }
  return <_TabOrganization />;
};

export const _TabOrganization: React.FC = () => {
  const { organization, errorsOrganization } = useAppSelector(
    (state) => state.config
  );
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [defaultImageLink, setDefaultImageLink] = useState<string>(
    organization.logo ?? ""
  );

  const getDefaultValue = (rest: Organization): OrganizationForm => {
    return {
      name: rest.name ?? "",
      abbreviationName: rest.abbreviationName ?? "",
      email: rest.email ?? "",
      phoneNumber: rest.phoneNumber ?? "",
      school: rest.school ?? "",
      address: rest.address ?? "",
      logo: undefined,
    };
  };

  const {
    control,
    formState: { errors, isSubmitting, dirtyFields },
    setError,
    reset,
    handleSubmit,
  } = useForm<OrganizationForm>({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValue(organization),
  });

  const shouldPreventEdit = !currentUser.isRole([
    Roles.Lead,
    Roles.SystemAdmin,
  ]);

  const handleEditOrgInfo = async (data: OrganizationForm) => {
    const result = await dispatch(
      updateOrganizationAsync({ id: organization.id, body: data })
    );
    if (updateOrganizationAsync.rejected.match(result)) {
      return;
    }
    toast.success(ORGANIZATION_MESSAGES.update.success);
    reset(getDefaultValue(result.payload));
  };

  useEffect(() => {
    if (organization) {
      setDefaultImageLink(organization.logo);
    }
  }, [reset, organization]);

  return (
    <ConfigTabContentContainer>
      <AppForm
        toastErrorMessage={ORGANIZATION_MESSAGES.update.error}
        errors={errorsOrganization}
        setError={setError}
      >
        <FormItem label="Ảnh đại diện tổ chức" error={errors.logo?.message}>
          <Controller
            control={control}
            name="logo"
            render={({ field: { value, onChange } }) => (
              <UploadedAvatar
                isDisable={shouldPreventEdit}
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
                  disable={shouldPreventEdit}
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
            error={errors.abbreviationName?.message}
          >
            <Controller
              control={control}
              name="abbreviationName"
              render={({ field: { value, onChange } }) => (
                <Input
                  disable={shouldPreventEdit}
                  placeholder="Tên viết tẳt"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>

          <FormItem label="Địa chỉ mail" error={errors.email?.message}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  disable={shouldPreventEdit}
                  placeholder="Địa chỉ mail"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>

          <FormItem label="Số điện thoại" error={errors.phoneNumber?.message}>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value, onChange } }) => (
                <Input
                  disable={shouldPreventEdit}
                  placeholder="Số điện thoại"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>

          <FormItem label="Trực thuộc trường" error={errors.school?.message}>
            <Controller
              control={control}
              name="school"
              render={({ field: { value, onChange } }) => (
                <Input
                  disable={shouldPreventEdit}
                  placeholder="Trực thuộc trường"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>

          <FormItem label="Địa chỉ" error={errors.address?.message}>
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <Input
                  disable={shouldPreventEdit}
                  placeholder="Địa chỉ"
                  value={value}
                  onChange={onChange}
                />
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
      </AppForm>
    </ConfigTabContentContainer>
  );
};
