import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { IMember } from "@/features/types/member-type";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormMemberInfo } from "../type";
import { FormItems } from "./member-form";

export const ModalEditMember: React.FC<THookModalProps<IMember>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const propsForm = useForm<TFormMemberInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = propsForm;

  const handleEditMember = (editInfo: TFormMemberInfo) => {
    setIsLoading(false);
    console.log(editInfo);
  };

  return (
    <Modal
      toggle={toggle}
      title="Chỉnh sửa thành viên"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditMember),
        isLoading: isLoading,
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
