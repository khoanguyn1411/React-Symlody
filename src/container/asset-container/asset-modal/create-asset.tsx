import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { ModalMultipleTabs, ModalTab, TMethodModals } from "@/components";
import { PickFile } from "@/components/others";
import { MESSAGE_DEFAULT_EXTENSION, MESSAGE_NOT_PICK_FILE } from "@/constants";

import { schema } from "../schema";
import { TFormAssetInfo } from "../type";
import { FormItems } from "./asset-form";
type TProps = {
  modalRef: React.MutableRefObject<TMethodModals<undefined>>;
};
export const ModalCreateAsset: React.FC<TProps> = ({ modalRef }) => {
  return (
    <ModalMultipleTabs
      ref={modalRef}
      size="lg"
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
  const { handleSubmit } = propsForm;

  const handleCreateAsset = async (data: TFormAssetInfo) => {
    console.log(data);
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateAsset),
        isLoading: false,
      }}
    >
      <FormItems formProps={propsForm} />
    </ModalTab>
  );
};

const TabCreateMultipleAssets: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [message, setMessage] = useState<string>(MESSAGE_DEFAULT_EXTENSION);

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
