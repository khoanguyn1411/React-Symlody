import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { IProperty } from "@/features/types";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { IFormPropertyInfo } from "../type";
import { FormItems } from "./property-form";

export const ModalEditProperty: React.FC<THookModalProps<IProperty>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const propsForm = useForm<IFormPropertyInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    reset,
    formState: { dirtyFields, isSubmitting },
  } = propsForm;

  const handleEditProperty = (editInfo: IFormPropertyInfo) => {
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
        event: handleSubmit(handleEditProperty),
        isLoading: isSubmitting,
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
