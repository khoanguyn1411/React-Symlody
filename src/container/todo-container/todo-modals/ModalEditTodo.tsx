import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Loading, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { updateTaskAsync } from "@/features/reducers/task-reducer";
import { Task } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils/funcs/form-service";

import { TODO_MESSAGES } from "../constant";
import { todoFormMapper } from "../mapper";
import { schema } from "../shema";
import { TodoForm } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditTodo: React.FC<THookModalProps<Task>> = ({
  data,
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

  const propsForm = useForm<TodoForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, dirtyFields },
  } = propsForm;

  const handleEditTask = async (task: TodoForm) => {
    const taskModel = todoFormMapper.toModel(task);
    const result = await dispatch(
      updateTaskAsync({
        id: data.id,
        payload: taskModel,
      })
    );
    if (updateTaskAsync.rejected.match(result)) {
      toast.error(TODO_MESSAGES.update.error);
      return;
    }
    toast.success(TODO_MESSAGES.update.success);
    toggle.setHidden();
  };

  useEffect(() => {
    if (data) {
      reset(todoFormMapper.fromModel(data));
      return;
    }
  }, [data, reset]);

  return (
    <Modal
      widthContainer={"1000px"}
      handleEvent={{
        event: handleSubmit(handleEditTask),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
        title: "Cập nhật",
      }}
      title={"Chi tiết công việc"}
      isShowing={isShowing}
      toggle={toggle}
    >
      {userStore.pending ? (
        <Loading />
      ) : (
        <FormItems mode="edit" formProps={propsForm} />
      )}
    </Modal>
  );
};
