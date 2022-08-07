import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import React, { useRef, useState } from "react";
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
import { isCorrectExtension } from "@/utils";

import { MemberMapper } from "../mapper";
import { schema } from "../schema";
import { TFormMemberInfo } from "../type";
import {
  MESSAGE_DEFAULT_EXTENSION,
  MESSAGE_NOT_PICK_FILE,
  MESSAGE_WRONG_EXTENSION,
} from "./constants";

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
                placeHolder="Giới tính"
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
                placeholder="Vd: abc@gmail.com"
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
              placeHolder="Ban"
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
                placeHolder="Vị trí"
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

      <FormItem
        isNoSpace
        label="Quê quán"
        isRequired
        error={errors.home?.message}
      >
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
  const inputFileRef = useRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [dragCounter, setDragCounter] = useState<number>(0);
  const [message, setMessage] = useState<string>(MESSAGE_DEFAULT_EXTENSION);
  const handlePickFile = () => {
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handlePickedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files) {
      setMessage(MESSAGE_DEFAULT_EXTENSION);
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragCounter(dragCounter + 1);
      setIsDragActive(true);
    } else if (event.type === "dragleave") {
      setDragCounter(dragCounter - 1);
      if (dragCounter > 0) return;
      setIsDragActive(false);
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    if (!isCorrectExtension(event.dataTransfer.files[0].name)) {
      setMessage(MESSAGE_WRONG_EXTENSION);
      return;
    }
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      setMessage(MESSAGE_DEFAULT_EXTENSION);
      return;
    }
  };
  const handleSubmitFile = () => {
    if (!selectedFile) {
      setMessage(MESSAGE_NOT_PICK_FILE);
      return;
    }
    setMessage(MESSAGE_DEFAULT_EXTENSION);
    alert("Submitted!");
  };

  return (
    <ModalTab
      otherActions={{
        onDragEnter: handleDrag,
        onDrop: handleDrop,
        onDragOver: handleDrag,
        onDragLeave: handleDrag,
      }}
      handleEvent={{
        event: handleSubmitFile,
        isLoading: false,
      }}
    >
      <div
        className={classNames(
          "flex flex-col items-center justify-center border-gray-400 px-3 pb-5 mt-3 border-2 border-dashed dashed-border rounded-md",
          isDragActive && "bg-gray-100"
        )}
      >
        <span className="my-4 text-4xl text-primary-800">
          <i className="far fa-file-upload"></i>
        </span>
        {!isDragActive && (
          <p className="text-lg text-center">
            Kéo và thả file vào đây để <br /> bắt đầu tải lên.
          </p>
        )}
        {isDragActive && (
          <p className="text-lg text-center">Thả file vào đây.</p>
        )}
        <div className="flex items-center w-2/3 mt-4 gap-3">
          <div className="flex-1 bg-black h-[1px]" />
          <span>HOẶC</span>
          <div className="flex-1 bg-black h-[1px]" />
        </div>
        <Button className="px-5 mt-4" onClick={handlePickFile}>
          Chọn file
        </Button>
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          className="hidden"
          ref={inputFileRef}
          onChange={handlePickedFile}
        />
      </div>
      {selectedFile && (
        <div className="flex justify-between mt-3">
          <div className="w-5/6">
            <p className="items-center block truncate cursor-pointer">
              <i className="max-w-full mr-3  fas fa-link" />
              {selectedFile.name}
            </p>
          </div>

          <span
            aria-hidden
            onClick={handleRemoveFile}
            className="text-black cursor-pointer hover:text-red-500 transition-all duration-300"
          >
            <i className="fas fa-trash"></i>
          </span>
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-6 mb-5">
        <span
          className={classNames(
            "italic w-3/4 text-center",
            message !== MESSAGE_DEFAULT_EXTENSION && "text-red-500"
          )}
        >
          {message}
        </span>
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
