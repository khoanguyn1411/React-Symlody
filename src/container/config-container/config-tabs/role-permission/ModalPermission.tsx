import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { THookModalProps } from "@/hooks";

export const ModalPermission: React.FC<THookModalProps<any>> = ({
  isShowing,
  toggle,
  data,
}) => {
  const propsForm = useForm<any>({
    resolver: yupResolver(null),
  });
  const {
    handleSubmit,

    formState: { isSubmitting },
  } = propsForm;
  return (
    <Modal
      handleEvent={{
        title: "Phân quyền",
        event: handleSubmit(null),
        isLoading: isSubmitting,
      }}
      size="lg"
      title={"Tạo phòng ban"}
      isShowing={isShowing}
      toggle={toggle}
    >
      <div></div>
    </Modal>
  );
};
