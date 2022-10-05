import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { IDepartment } from "@/features/types";
import { THookModalProps } from "@/hooks";

import { FormItems } from "./FormItems";
import { schema } from "./schema";
import { IFormDepartment } from "./types";

export const ModalEditDepartment: React.FC<THookModalProps<IDepartment>> = ({
  isShowing,
  toggle,
  data,
}) => {
  const propsForm = useForm<IFormDepartment>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,

    formState: { isSubmitting, isDirty },
  } = propsForm;

  return (
    <Modal
      handleEvent={{
        title: "Tạo",
        event: handleSubmit(null),
        isLoading: isSubmitting,
        isDisable: !isDirty,
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