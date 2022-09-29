import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { IProperty } from "@/features/types";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { IFormPropertyInfo } from "../type";
import { FormItems } from "./FormItems";

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
    formState: { isDirty, isSubmitting },
  } = propsForm;

  const handleEditProperty = () => {
    //TODO: Handle update property.
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
        isLoading: isSubmitting,
        isDisable: !isDirty,
        event: handleSubmit(handleEditProperty),
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
