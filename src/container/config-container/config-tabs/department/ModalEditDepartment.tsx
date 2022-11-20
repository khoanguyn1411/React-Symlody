import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "@/components";
import { useAppDispatch } from "@/features";
import { updateDepartmentAsync } from "@/features/reducers";
import { IDepartment } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

import { DEPARTMENT_MESSAGE } from "./constants";
import { FormItems } from "./FormItems";
import { schema } from "./schema";
import { IFormDepartment } from "./types";

export const ModalEditDepartment: React.FC<THookModalProps<IDepartment>> = ({
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

    formState: { isSubmitting, dirtyFields },
  } = propsForm;

  const handleUpdateDepartment = async (body: IFormDepartment) => {
    const result = await dispatch(updateDepartmentAsync({ id: data.id, body }));
    if (!result.payload) {
      toast.error(DEPARTMENT_MESSAGE.update.error);
      return;
    }
    toast.success(DEPARTMENT_MESSAGE.update.success);
    toggle.setHidden();
  };

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
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
