import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getUsersAsync,
  updatePropertyAsync,
  userSelectors,
} from "@/features/reducers";
import { Property, RolesID } from "@/features/types";
import { UserTargetView } from "@/features/types/models/user-view";
import { withPermission } from "@/hoc";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils/funcs/form-service";

import { PROPERTY_MESSAGE } from "../constant";
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
  const userStore = useAppSelector((state) => state.user);
  const userIds = useAppSelector(userSelectors.selectIds);

  const propsForm = useForm<PropertyForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { dirtyFields, isSubmitting },
  } = propsForm;

  const hasPermission = withPermission([RolesID.Lead, RolesID.MemberManager]);

  const handleEditProperty = hasPermission(async (editValue: PropertyForm) => {
    const propertyModel = propertyFormMapper.toModel(
      editValue,
      data.isArchived
    );
    const res = await dispatch(
      updatePropertyAsync({
        payload: propertyModel,
        id: data.id,
        isRestore: false,
      })
    );
    FormService.validateResponse({
      asyncThunk: updatePropertyAsync,
      response: res,
      successMessage: PROPERTY_MESSAGE.create.success,
      errorMessage: PROPERTY_MESSAGE.create.error,
      onSuccess: () => {
        toggle.setHidden();
      },
      setError,
    });
  });

  useEffect(() => {
    if (isShowing) {
      dispatch(getUsersAsync({ target: UserTargetView.Property }));
    }
  }, [dispatch, isShowing]);

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
      const inChargeIdAsNumber = Number(defaultInChargeId);
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
