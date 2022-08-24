import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormAssetInfo } from "../type";
import { FormItems } from "./asset-form";

export const ModalEditAsset: React.FC<THookModalProps<TFormAssetInfo>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const propsForm = useForm<TFormAssetInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = propsForm;

  const handleEditAsset = (editInfo: TFormAssetInfo) => {
    setIsLoading(false);
    console.log(editInfo);
  };
  return (
    <Modal
      reset={reset}
      toggle={toggle}
      title="Chỉnh sửa tài sản"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditAsset),
        isLoading: isLoading,
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
