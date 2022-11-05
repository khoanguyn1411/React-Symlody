import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Loading, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { THookModalProps } from "@/hooks";

import { schema } from "../shema";
import { IFormTodoInfo } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditTodo: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const userCount = useAppSelector(userSelectors.selectTotal);
  const userStore = useAppSelector((state) => state.user);
  useEffect(() => {
    if (userCount === 0 && isShowing) {
      dispatch(getUsersAsync());
    }
  }, [dispatch, isShowing, userCount]);

  const propsForm = useForm<IFormTodoInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { handleSubmit } = propsForm;

  const handleEditTask = (data: IFormTodoInfo) => {
    console.log(data);
  };

  return (
    <Modal
      handleEvent={{
        event: handleSubmit(handleEditTask),
      }}
      title={"Tạo công việc mới"}
      isShowing={isShowing}
      toggle={toggle}
    >
      {userStore.pending ? <Loading /> : <FormItems formProps={propsForm} />}
    </Modal>
  );
};
