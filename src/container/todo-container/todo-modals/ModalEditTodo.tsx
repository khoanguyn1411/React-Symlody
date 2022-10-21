import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { THookModalProps } from "@/hooks";

import { schema } from "../shema";
import { IFormTodoInfo } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditTodo: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  const propsForm = useForm<IFormTodoInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { handleSubmit } = propsForm;

  const handleCreateTask = (data: IFormTodoInfo) => {
    console.log(data);
  };

  return (
    <Modal
      handleEvent={{
        event: handleSubmit(handleCreateTask),
      }}
      title={"Tạo công việc mới"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <FormItems formProps={propsForm} />
    </Modal>
  );
};
