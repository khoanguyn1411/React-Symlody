import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Loading, ModalMultipleTabs, ModalTab } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync } from "@/features/reducers";
import { createPropertyAsync } from "@/features/reducers/property-reducer";
import { UserTargetView } from "@/features/types/models/user-view";
import { THookModalProps } from "@/hooks";
import { FormService } from "@/utils/funcs/form-service";

import { PROPERTY_MESSAGE } from "../constant";
import { propertyFormMapper } from "../mapper";
import { schema } from "../schema";
import { PropertyForm } from "../type";
import { FormItems } from "./FormItems";

export const ModalCreateProperty: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  return (
    <ModalMultipleTabs
      toggle={toggle}
      size="lg"
      isShowing={isShowing}
      renderTabs={[
        {
          title: "Thêm 1 tài sản",
          children: <TabCreateAProperty />,
          key: "AddAProperty",
        },
        {
          title: "Thêm nhiều tài sản",
          children: <TabCreateMultipleProperties />,
          key: "AddMultipleProperty",
        },
      ]}
    />
  );
};

const TabCreateAProperty: React.FC = () => {
  const propsForm = useForm<PropertyForm>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = propsForm;
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsersAsync({ target: UserTargetView.Property }));
  }, [dispatch]);

  const handleCreateAProperty = async (propertyData: PropertyForm) => {
    const propertyModel = propertyFormMapper.toModel(propertyData);
    const result = await dispatch(createPropertyAsync(propertyModel));

    FormService.validateResponse({
      asyncThunk: createPropertyAsync,
      response: result,
      successMessage: PROPERTY_MESSAGE.create.success,
      errorMessage: PROPERTY_MESSAGE.create.error,
      onSuccess: () => {
        reset();
      },
      setError,
    });
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateAProperty),
        isLoading: isSubmitting,
      }}
    >
      {userStore.pending ? <Loading /> : <FormItems formProps={propsForm} />}
    </ModalTab>
  );
};

const TabCreateMultipleProperties: React.FC = () => {
  // const propsFile = usePickFile();

  // const handleSubmitFile = () => {
  //   propsFile.setIsSubmitFile(true);
  // };
  return (
    <ModalTab
      handleEvent={{
        // event: handleSubmitFile,
        // isLoading: false,
        event: () => undefined,
      }}
    >
      {/* <PickFile {...propsFile} /> */}
      <p className="text-center">
        <span className="font-medium">
          Tính năng đang trong giai đoạn phát triển.
        </span>
        <br />
        <span>Hãy đợi bọn mình nhé! {"<3"}</span>
      </p>
    </ModalTab>
  );
};
