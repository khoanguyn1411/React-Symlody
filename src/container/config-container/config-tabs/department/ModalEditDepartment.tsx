import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { useAppDispatch } from "@/features";
import { updateDepartmentAsync } from "@/features/reducers";
import { Department } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils/funcs/form-service";

import { DEPARTMENT_MESSAGE } from "./constants";
import { FormItems } from "./FormItems";
import { schema } from "./schema";
import { DepartmentForm } from "./types";

export const ModalEditDepartment: React.FC<THookModalProps<Department>> = ({
  isShowing,
  toggle,
  data,
}) => {
  const dispatch = useAppDispatch();

  const propsForm = useForm<DepartmentForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, dirtyFields },
  } = propsForm;

  const handleUpdateDepartment = async (body: DepartmentForm) => {
    const response = await dispatch(
      updateDepartmentAsync({ id: data.id, body })
    );
    FormService.validateResponse({
      asyncThunk: updateDepartmentAsync,
      response,
      successMessage: DEPARTMENT_MESSAGE.update.success,
      errorMessage: DEPARTMENT_MESSAGE.update.error,
      onSuccess: () => {
        toggle.setHidden();
      },
      setError,
    });
  };

  useEffect(() => {
    if (data) {
      reset({ ...data, abbreviationName: data.abbreviationName ?? "" });
    }
  }, [data, reset]);

  return (
    <Modal
      handleEvent={{
        title: "Tạo",
        event: handleSubmit(handleUpdateDepartment),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
      }}
      size="lg"
      title={"Tạo phòng ban"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <FormItems formProps={propsForm} />
    </Modal>
  );
};
