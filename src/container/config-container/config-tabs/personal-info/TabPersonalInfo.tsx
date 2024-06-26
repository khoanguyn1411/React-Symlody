import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  AppDatePicker,
  FormItem,
  Input,
  Select,
  SelectSearch,
  UploadedAvatar,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { updateProfileAsync } from "@/features/reducers";
import { Gender } from "@/features/types/models/gender";
import { FormService } from "@/utils/funcs/form-service";
import { isTextIncludedIn } from "@/utils/funcs/is-text-included-in";

import {
  ConfigSubmitButton,
  ConfigTabContentContainer,
} from "../../config-components";
import { PERSONAL_INFO_MESSAGES, PROVINCES_LIST } from "./constants";
import { personalInfoFormMapper } from "./mapper";
import { schema } from "./shema";
import { PersonalInfoForm } from "./type";

export const TabPersonalInfo: React.FC = () => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [defaultImageLink, setDefaultImageLink] = useState<string>(
    currentUser.avatarUrl ?? ""
  );

  const {
    control,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
    setError,
    handleSubmit,
  } = useForm<PersonalInfoForm>({
    resolver: yupResolver(schema),
    defaultValues: personalInfoFormMapper.fromModel(currentUser),
  });

  const handleEditPersonalInfo = async (data: PersonalInfoForm) => {
    const response = await dispatch(
      updateProfileAsync(personalInfoFormMapper.toModel(data))
    );
    FormService.validateResponse({
      asyncThunk: updateProfileAsync,
      response,
      successMessage: PERSONAL_INFO_MESSAGES.update.success,
      errorMessage: PERSONAL_INFO_MESSAGES.update.error,
      onSuccess: (result) => {
        const formData = personalInfoFormMapper.fromModel(result);
        reset({ ...formData, avatar: undefined });
      },
      setError,
    });
  };

  useEffect(() => {
    setDefaultImageLink(currentUser.avatarUrl);
  }, [currentUser]);

  return (
    <ConfigTabContentContainer>
      <FormItem label="Ảnh đại diện" isRequired error={errors.avatar?.message}>
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value, onChange } }) => (
            <UploadedAvatar
              alt="Ảnh đại diện"
              isUserAvatar
              fullName={currentUser.fullName}
              defaultImageLink={defaultImageLink}
              file={value}
              setFile={onChange}
            />
          )}
        />
      </FormItem>
      <div className="grid grid-cols-3 gap-3">
        <FormItem label="Họ" isRequired error={errors.lastName?.message}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Họ"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
        <FormItem label="Tên" isRequired error={errors.firstName?.message}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Tên"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
        <FormItem label="Email" isRequired error={errors.email?.message}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChange={onChange}
                disable
              />
            )}
          />
        </FormItem>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FormItem label="Ngày sinh" error={errors.dob?.message}>
          <Controller
            control={control}
            name="dob"
            render={({ field: { value, onChange } }) => (
              <AppDatePicker
                isDefault2000
                value={value}
                style="modal"
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" error={errors.className?.message}>
          <Controller
            control={control}
            name="className"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Lớp"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="MSSV" error={errors.studentId?.message}>
          <Controller
            control={control}
            name="studentId"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="MSSV"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                list={[
                  { value: Gender.Male, label: Gender.Male },
                  { value: Gender.Female, label: Gender.Female },
                ]}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Giới tính"
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
                placeholder="Số điện thoại"
                value={value}
                style="modal"
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
                placeholder="Địa chỉ"
                style="modal"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>

        <FormItem label="Quê quán" error={errors.homeTown?.message}>
          <Controller
            control={control}
            name="homeTown"
            render={({ field: { value, onChange } }) => (
              <SelectSearch
                onSearchChange={(searchValue, setCurrentList) =>
                  setCurrentList(
                    PROVINCES_LIST.filter((item) =>
                      isTextIncludedIn(item.label, searchValue)
                    )
                  )
                }
                onOptionChange={(option, setInputValue) => {
                  setInputValue(option.label);
                }}
                list={PROVINCES_LIST}
                style="modal"
                value={value}
                onChange={onChange}
                searchPlaceholder="Vị trí"
              />
            )}
          />
        </FormItem>
      </div>
      <ConfigSubmitButton
        disable={!FormService.isDirtyFields(dirtyFields)}
        isShowLoading={isSubmitting}
        onSubmit={handleSubmit(handleEditPersonalInfo)}
      >
        Cập nhật
      </ConfigSubmitButton>
    </ConfigTabContentContainer>
  );
};
