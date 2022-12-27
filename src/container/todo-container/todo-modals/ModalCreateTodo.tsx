import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Loading, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { createTaskAsync } from "@/features/reducers/task-reducer";
import { THookModalProps } from "@/hooks";
import { DateService } from "@/utils/funcs/date-service";
import { FormService } from "@/utils/funcs/form-service";

import { TODO_MESSAGES } from "../constant";
import { todoFormMapper } from "../mapper";
import { schema } from "../shema";
import { TodoForm } from "../type";
import { FormItems } from "./FormItems";

export const ModalCreateTodo: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const userCount = useAppSelector(userSelectors.selectTotal);
  const userStore = useAppSelector((state) => state.user);
  const currentUserStore = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userCount === 0 && isShowing) {
      dispatch(getUsersAsync());
    }
  }, [dispatch, isShowing, userCount]);

  const propsForm = useForm<TodoForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = propsForm;

  const handleCreateTask = async (data: TodoForm) => {
    const taskModel = todoFormMapper.toModel(data);
    const response = await dispatch(createTaskAsync({ task: taskModel }));
    FormService.validateResponse({
      asyncThunk: createTaskAsync,
      response,
      successMessage: TODO_MESSAGES.create.success,
      errorMessage: TODO_MESSAGES.create.error,
      onSuccess: () => {
        reset();
        toggle.setHidden();
      },
      setError: propsForm.setError,
    });
  };

  useEffect(() => {
    reset({
      isPriority: false,
      endDate: DateService.getDayAfterWeek(),
      reporter: currentUserStore.user.id,
      isSentEmail: false,
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
