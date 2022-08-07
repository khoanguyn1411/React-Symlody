import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { IMember } from "@/features/types/member-type";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormMemberInfo } from "../type";
import { FormItems } from "./form";

export const ModalEditMember: React.FC<THookModalProps<IMember>> = ({
  data,
  isShowing,
  setToggle,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const propsForm = useForm<TFormMemberInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = propsForm;

  const handleEditMember = (editInfo: TFormMemberInfo) => {
    setIsLoading(false);
    console.log(editInfo);
  };
  if (data == null) {
    return;
  }

  return (
    <Modal
      toggle={{ setToggle }}
      title="Chỉnh sửa thành viên"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditMember),
        isLoading: isLoading,
        isDisable: !isDirty,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
