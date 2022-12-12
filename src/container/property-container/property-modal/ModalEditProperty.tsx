import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { Property } from "@/features/types";
import { THookModalProps } from "@/hooks";
import { FormatService, FormService } from "@/utils";

import { propertyFormMapper } from "../mapper";
import { schema } from "../schema";
import { PropertyForm } from "../type";
import { FormItems } from "./FormItems";

export const ModalEditProperty: React.FC<THookModalProps<Property>> = ({
  data,
  isShowing,
  toggle,
}) => {
  const dispatch = useAppDispatch();
  const userCount = useAppSelector(userSelectors.selectTotal);
  const userStore = useAppSelector((state) => state.user);
  const userIds = useAppSelector(userSelectors.selectIds);

  const propsForm = useForm<PropertyForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    reset,
    formState: { dirtyFields, isSubmitting },
  } = propsForm;

  const handleEditProperty = (editValue: PropertyForm) => {
    //TODO: Handle update property.
  };

  useEffect(() => {
    if (isShowing && userCount === 0) {
      dispatch(getUsersAsync());
    }
  }, [dispatch, isShowing, userCount]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const formData = propertyFormMapper.fromModel(data);
    const getInChargeIdDefaultValue = () => {
      const defaultInChargeId = formData.inChargerId;
      if (!defaultInChargeId) {
        return null;
      }
      const inChargeIdAsNumber = FormatService.toNumber(defaultInChargeId);
      if (!userIds.includes(inChargeIdAsNumber)) {
        return null;
      }
      return inChargeIdAsNumber;
    };
    reset({ ...formData, inChargerId: getInChargeIdDefaultValue() });
  }, [data, reset, userIds]);

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
      <FormItems formProps={propsForm} />
    </Modal>
  );
};
