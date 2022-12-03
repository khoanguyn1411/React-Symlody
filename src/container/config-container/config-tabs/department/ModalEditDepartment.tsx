import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch } from "@/features";
import { updateDepartmentAsync } from "@/features/reducers";
import { Department } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

import { DEPARTMENT_MESSAGE } from "./constants";
import { FormItems } from "./FormItems";
import { schema } from "./schema";
import { IFormDepartment } from "./types";

export const ModalEditDepartment: React.FC<THookModalProps<Department>> = ({
  isShowing,
  toggle,
  data,
}) => {
  const dispatch = useAppDispatch();

  const propsForm = useForm<IFormDepartment>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, dirtyFields },
  } = propsForm;

  const handleUpdateDepartment = async (body: IFormDepartment) => {
    const result = await dispatch(updateDepartmentAsync({ id: data.id, body }));
    if (updateDepartmentAsync.rejected.match(result)) {
      toast.error(DEPARTMENT_MESSAGE.update.error);
      return;
    }
    toast.success(DEPARTMENT_MESSAGE.update.success);
    toggle.setHidden();
  };

  useEffect(() => {
    if (data) {
      reset({ ...data, abbreviation_name: data.abbreviation_name ?? "" });
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
