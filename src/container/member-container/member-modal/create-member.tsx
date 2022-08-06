import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  AppDatePicker,
  Button,
  FormItem,
  Input,
  ModalMultipleTabs,
  ModalTab,
  Select,
  SelectMultiple,
} from "@/components";
import { getListRole } from "@/constants";
import { useAppDispatch } from "@/features";
import { createMemberAsync, getMembersAsync } from "@/features/reducers";
import { THookModalProps } from "@/hooks";

import { MemberMapper } from "../mapper";
import { schema } from "../schema";
import { TFormMemberInfo } from "../type";

const TabCreateAMember: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormMemberInfo>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateMember = async (data: TFormMemberInfo) => {
    setIsLoading(true);
    const memberDto = MemberMapper.toDto(data);
    const res = await dispatch(createMemberAsync(memberDto));
    if (!res.payload) {
      toast.error("Tạo thành viên thất bại");
      return;
    }
    setIsLoading(false);
    dispatch(getMembersAsync());
    reset();
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: isLoading,
      }}
      resetForm={reset}
    >
      <FormItem label="Họ và tên" isRequired error={errors.fullName?.message}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Họ và tên"
            />
          )}
        />
      </FormItem>
      <div className="grid grid-cols-2 gap-x-5">
        <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                list={["Nam", "Nữ"]}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Chọn giới tính"
              />
            )}
          />
        </FormItem>

        <FormItem label="Ngày sinh" isRequired error={errors.birthday?.message}>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <AppDatePicker style="modal" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <FormItem label="Lớp" isRequired error={errors.class?.message}>
          <Controller
            control={control}
            name="class"
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Lớp"
              />
            )}
          />
        </FormItem>

        <FormItem label="MSSV" isRequired error={errors.id?.message}>
          <Controller
            control={control}
            name="id"
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="MSSV"
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
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Email"
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Số điện thoại"
          isRequired
          error={errors.phone?.message}
        >
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Số điện thoại"
              />
            )}
          />
        </FormItem>
      </div>

      <FormItem label="Ban" isRequired error={errors.department?.message}>
        <Controller
          control={control}
          name="department"
          render={({ field: { value, onChange } }) => (
            <Select
              list={["Ban điều hành", "Ban chấp hành"]}
              style="modal"
              value={value}
              onChange={onChange}
              placeHolder="Chọn ban"
            />
          )}
        />
      </FormItem>

      <FormItem
        label="Vị trí"
        isRequired
        error={(errors.role as unknown as FieldError)?.message}
      >
        <Controller
          control={control}
          name="role"
          render={({ field: { value = [], onChange } }) => {
            return (
              <SelectMultiple
                list={getListRole()}
                style="modal"
                value={value}
                onChange={onChange}
                placeHolder="Chọn vị trí"
              />
            );
          }}
        />
      </FormItem>

      <FormItem label="Địa chỉ" isRequired error={errors.address?.message}>
        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Địa chỉ"
            />
          )}
        />
      </FormItem>

      <FormItem label="Quê quán" isRequired error={errors.home?.message}>
        <Controller
          control={control}
          name="home"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Quê quán"
            />
          )}
        />
      </FormItem>
    </ModalTab>
  );
};

const TabCreateMultipleMembers: React.FC = () => {
  return (
    <ModalTab
      handleEvent={{
        event: function (): void {
          alert("Submitted!");
        },
        isLoading: false,
      }}
      resetForm={undefined}
    >
      <div className="flex flex-col items-center justify-center px-3 pb-5 mt-5 border-2 border-gray-400 border-dashed pt-18 dashed-border rounded-md">
        <p className="text-lg text-center">
          Kéo và thả file vào đây để <br /> bắt đầu tải lên
        </p>
        <div className="flex items-center w-2/3 mt-4 gap-3">
          <div className="flex-1 bg-black h-[1px]" />
          <span>HOẶC</span>
          <div className="flex-1 bg-black h-[1px]" />
        </div>
        <Button className="px-5 mt-4">Chọn file</Button>
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <span>
            <i className="far fa-link" />
          </span>
          <span className="ml-3 font-semibold underline cursor-pointer">
            Danhsachthanhvien.xslx
          </span>
        </div>
        <span className="cursor-pointer">
          <i className="far fa-times"></i>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 mb-5">
        <span className="italic">Hệ thống chỉ nhận file .xslx</span>
        <span className="mt-1 font-semibold underline cursor-pointer text-primary-800">
          Tải file mẫu (.xslx)
        </span>
      </div>
    </ModalTab>
  );
};

export const ModalCreateMember: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  setToggle,
}) => {
  return (
    <ModalMultipleTabs
      renderTabs={[
        {
          title: "Tạo thành viên",
          children: <TabCreateAMember />,
        },
        {
          title: "Tạo nhiều thành viên",
          children: <TabCreateMultipleMembers />,
        },
      ]}
      isShowing={isShowing}
      size="lg"
      toggle={{ setToggle }}
    />
  );
};
