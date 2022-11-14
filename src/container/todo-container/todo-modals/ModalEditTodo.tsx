import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Loading, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { updateTaskAsync } from "@/features/reducers/task-reducer";
import { ITask } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

import { TODO_MESSAGES } from "../constant";
import { TodoFormMapper } from "../mapper";
import { schema } from "../shema";
import { IFormTodoInfo } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditTodo: React.FC<THookModalProps<ITask>> = ({
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

  const propsForm = useForm<IFormTodoInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = propsForm;

  const handleEditTask = async (task: IFormTodoInfo) => {
    const taskModel = TodoFormMapper.toModel(task);
    const result = await dispatch(
      updateTaskAsync({
        id: data.id,
        payload: taskModel,
      })
    );
    if (result.meta.requestStatus === "rejected") {
      toast.error(TODO_MESSAGES.update.error);
      return;
    }
    toast.success(TODO_MESSAGES.update.success);
    toggle.setHidden();
  };

  return (
    <Modal
      handleEvent={{
        event: handleSubmit(handleEditTask),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
        title: "Cập nhật",
      }}
      title={"Chỉnh sửa công việc"}
      isShowing={isShowing}
      toggle={toggle}
    >
      {userStore.pending ? (
        <Loading />
      ) : (
        <FormItems data={data} formProps={propsForm} />
      )}
    </Modal>
  );
};
