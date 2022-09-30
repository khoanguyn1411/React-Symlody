import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { THookModalProps } from "@/hooks";

import { schema } from "../shema";
import { IFormTodoInfo } from "../type";
import { FormItems } from "./FormItems";

export const ModalCreateTodo: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  const propsForm = useForm<IFormTodoInfo>({
    resolver: yupResolver(schema),
  });
  return (
    <Modal
      handleEvent={{
        event: function (): void {
          throw new Error("Function not implemented.");
        },
      }}
      title={"Tạo công việc mới"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <FormItems formProps={propsForm} />
    </Modal>
  );
};
