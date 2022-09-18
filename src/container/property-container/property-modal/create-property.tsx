import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  ModalMultipleTabs,
  ModalTab,
  PICK_FILE_MESSAGE,
  PickFile,
} from "@/components";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { IFormPropertyInfo } from "../type";
import { FormItems } from "./property-form";

export const ModalCreateProperty: React.FC<THookModalProps<undefined>> = ({
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
          children: <TabCreateAnProperty />,
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

const TabCreateAnProperty: React.FC = () => {
  const propsForm = useForm<IFormPropertyInfo>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = propsForm;

  const handleCreateAnProperty = async (data: IFormPropertyInfo) => {
    console.log(data);
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateAnProperty),
        isLoading: false,
      }}
    >
      <FormItems formProps={propsForm} />
    </ModalTab>
  );
};

const TabCreateMultipleProperties: React.FC = () => {
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
