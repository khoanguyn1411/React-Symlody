import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { IProperty } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils";

import { schema } from "../schema";
import { IFormPropertyInfo } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditProperty: React.FC<THookModalProps<IProperty>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const userCount = useAppSelector(userSelectors.selectTotal);
  const userStore = useAppSelector((state) => state.user);

  const propsForm = useForm<IFormPropertyInfo>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    reset,
    formState: { dirtyFields, isSubmitting },
  } = propsForm;

  const handleEditProperty = () => {
    //TODO: Handle update property.
  };

  useEffect(() => {
    if (isShowing && userCount === 0) {
      dispatch(getUsersAsync());
    }
  }, [dispatch, isShowing, userCount]);
  return (
    <Modal
      reset={reset}
      toggle={toggle}
      title="Chỉnh sửa tài sản"
      size="lg"
      isLoading={userStore.pending}
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
        event: handleSubmit(handleEditProperty),
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
  );
};
