import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  FormItem,
  Input,
  Modal,
  ModalMultipleTabs,
  ModalTab,
  Radio,
  RadioGroup,
  TextArea,
} from "@/components";
import { RadioInput } from "@/components/elements/radio/radio-components/radio-input";
import {
  MESSAGE_DEFAULT_EXTENSION,
  MESSAGE_NOT_PICK_FILE,
  MESSAGE_WRONG_EXTENSION,
} from "@/container/member-container/member-modal/constants";
import { THookModalProps } from "@/hooks";
import { isCorrectExtension } from "@/utils";
import { formatCurrency, formatToNormalNumber } from "@/utils/format";

import { schema } from "../schema";
import { TFormAssetInfo } from "../type";

export const ModalCreateAsset: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  setToggle,
}) => {
  const { reset } = useForm<TFormAssetInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const handleCreateAsset = (data: TFormAssetInfo) => {
    console.log(data);
  };

  return (
    <ModalMultipleTabs
      reset={reset}
      toggle={{ setToggle }}
      size="lg"
      isShowing={isShowing}
      renderTabs={[
        { title: "Thêm 1 tài sản", children: <TabCreateAnAsset /> },
        { title: "Thêm nhiều tài sản", children: <TabCreateMultipleAssets /> },
      ]}
    />
  );
};

const TabCreateAnAsset: React.FC = () => {
  const propsForm = useForm<TFormAssetInfo>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = propsForm;

  const handleCreateMember = async (data: TFormAssetInfo) => {
    console.log(data);
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: false,
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

      <FormItem label="Số lượng" isRequired error={errors.quantity?.message}>
        <Controller
          control={control}
          name="quantity"
          defaultValue="1"
          render={({ field: { value, onChange } }) => (
            <Input
              style="modal"
              type={"number"}
              value={value}
              handleSideEffect={(event) => {
                if (
                  Number(event.target.value) &&
                  Number(event.target.value) < 1
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

      <FormItem label="Đơn giá" isRequired error={errors.price?.message}>
        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange } }) => (
            <Input
              handleSideEffect={(event) => {
                const value = event.target.value;
                const splitValue = formatToNormalNumber(value);
                if (value) {
                  if (isNaN(Number(splitValue))) {
                    return { newValue: "" };
                  }
                  const valueFormatted = formatCurrency(Number(splitValue));
                  return { newValue: valueFormatted };
                }
                return { newValue: value };
              }}
              style="modal"
              type={"text"}
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
            <TextArea
              style="modal"
              value={value}
              onChange={onChange}
              placeholder="Ghi chú"
            />
          )}
        />
      </FormItem>
    </ModalTab>
  );
};

const TabCreateMultipleAssets: React.FC = () => {
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
