import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { THookModalProps } from "@/hooks";

import { schema } from "../schema";
import { TFormEventInfo } from "../type";
import { FormItems } from "./event-form";

export const ModalCreateEvent: React.FC<THookModalProps<undefined>> = ({
  toggle,
  isShowing,
}) => {
  const propsForm = useForm<TFormEventInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const { handleSubmit } = propsForm;

  const handleCreateEvent = () => {
    //TODO: Handle create event.
  };

  return (
    <Modal
      handleEvent={{
        event: handleSubmit(handleCreateEvent),
      }}
      title={"Tạo sự kiện mới"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <FormItems formProps={propsForm} />
    </Modal>
  );
};
