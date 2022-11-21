import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Loading, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import {
  createTaskAsync,
  getTasksByAssignee,
  taskSelectors,
} from "@/features/reducers/task-reducer";
import { THookModalProps } from "@/hooks";
import { FormatService } from "@/utils";

import { TODO_MESSAGES } from "../constant";
import { TodoFormMapper } from "../mapper";
import { schema } from "../shema";
import { EPriority, IFormTodoInfo } from "../type";
import { FormItems } from "./FormItems";

const getDayAfterWeek = (): string => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  return FormatService.toDateString(today, "US");
};

export const ModalCreateTodo: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const userCount = useAppSelector(userSelectors.selectTotal);
  const userStore = useAppSelector((state) => state.user);
  const userList = useAppSelector(userSelectors.selectAll);
  const taskList = useAppSelector(taskSelectors.selectAll);
  const currentUserStore = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userCount === 0 && isShowing) {
      dispatch(getUsersAsync());
    }
  }, [dispatch, isShowing, userCount]);

  const propsForm = useForm<IFormTodoInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = propsForm;

  const handleCreateTask = async (data: IFormTodoInfo) => {
    const taskModel = TodoFormMapper.toModel(data);
    const result = await dispatch(createTaskAsync({ task: taskModel }));
    if (result.meta.requestStatus !== "rejected") {
      toast.success(TODO_MESSAGES.create.success);
      reset();
      dispatch(getTasksByAssignee({ userList, taskList }));
      toggle.setHidden();
      return;
    }
    toast.error(TODO_MESSAGES.create.error);
  };

  useEffect(() => {
    reset({
      priority: EPriority.Normal,
      expiredDate: getDayAfterWeek(),
      reporter: currentUserStore.user.id,
      isNotifyEmail: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      handleEvent={{
        event: handleSubmit(handleCreateTask),
        isLoading: propsForm.formState.isSubmitting,
      }}
      title={"Tạo công việc mới"}
      isShowing={isShowing}
      toggle={toggle}
    >
      {userStore.pending ? (
        <Loading />
      ) : (
        <FormItems mode="create" formProps={propsForm} />
      )}
    </Modal>
  );
};
