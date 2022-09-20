import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  ModalMultipleTabs,
  ModalTab,
  PICK_FILE_MESSAGE,
  PickFile,
} from "@/components";
import { useAppDispatch } from "@/features";
import { createPropertyAsync } from "@/features/reducers/property-reducer";
import { THookModalProps } from "@/hooks";

import { PROPERTY_MESSAGE } from "../constant";
import { PropertyFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormPropertyInfo } from "../type";
import { FormItems } from "./property-form";

const _ModalCreateProperty: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  return (
    <ModalMultipleTabs
      toggle={toggle}
      size="lg"
      isShowing={isShowing}
      renderTabs={[
        {
          title: "Thêm 1 tài sản",
          children: <TabCreateAProperty />,
          key: "AddAnAsset",
        },
        {
          title: "Thêm nhiều tài sản",
          children: <TabCreateMultipleProperties />,
          key: "AddMultipleAsset",
        },
      ]}
    />
  );
};

const _TabCreateAProperty: React.FC = () => {
  const propsForm = useForm<IFormPropertyInfo>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = propsForm;
  const dispatch = useAppDispatch();

  const handleCreateAProperty = async (propertyData: IFormPropertyInfo) => {
    const propertyModel = PropertyFormMapper.toModel(propertyData);
    const result = await dispatch(createPropertyAsync(propertyModel));
    console.log(result);
    if (!result.payload) {
      toast.error(PROPERTY_MESSAGE.create.error);
      return;
    }
    toast.success(PROPERTY_MESSAGE.create.success);
    reset();
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateAProperty),
        isLoading: isSubmitting,
      }}
    >
      <FormItems formProps={propsForm} />
    </ModalTab>
  );
};

const _TabCreateMultipleProperties: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [message, setMessage] = useState<string>(
    PICK_FILE_MESSAGE.defaultExtension
  );

  const handleSubmitFile = () => {
    if (!selectedFile) {
      setMessage(PICK_FILE_MESSAGE.notPickFile);
      return;
    }
    setMessage(PICK_FILE_MESSAGE.defaultExtension);
    alert("Submitted!");
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmitFile,
        isLoading: false,
      }}
    >
      <PickFile
        message={message}
        selectedFile={selectedFile}
        setMessage={setMessage}
        setSelectedFile={setSelectedFile}
      />
    </ModalTab>
  );
};

export const ModalCreateProperty = memo(_ModalCreateProperty);
const TabCreateMultipleProperties = memo(_TabCreateMultipleProperties);
const TabCreateAProperty = memo(_TabCreateAProperty);
