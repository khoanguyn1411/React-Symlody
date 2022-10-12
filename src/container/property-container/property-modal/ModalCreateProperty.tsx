import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Loading, ModalMultipleTabs, ModalTab, PickFile } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getUsersAsync, userSelectors } from "@/features/reducers";
import { createPropertyAsync } from "@/features/reducers/property-reducer";
import { THookModalProps, usePickFile } from "@/hooks";

import { PROPERTY_MESSAGE } from "../constant";
import { PropertyFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormPropertyInfo } from "../type";
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
  const propsForm = useForm<IFormPropertyInfo>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = propsForm;
  const dispatch = useAppDispatch();
  const userCount = useAppSelector(userSelectors.selectTotal);
  const userStore = useAppSelector((state) => state.user);
  useEffect(() => {
    if (userCount === 0) {
      dispatch(getUsersAsync());
    }
  }, [dispatch, userCount]);

  const handleCreateAProperty = async (propertyData: IFormPropertyInfo) => {
    const propertyModel = PropertyFormMapper.toModel(propertyData);
    const result = await dispatch(createPropertyAsync(propertyModel));
    if (!result.payload) {
      toast.error(PROPERTY_MESSAGE.create.error);
      return;
    }
    toast.success(PROPERTY_MESSAGE.create.success);
    reset();
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
  const propsFile = usePickFile();

  const handleSubmitFile = () => {
    propsFile.setIsSubmitFile(true);
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmitFile,
        isLoading: false,
      }}
    >
      <PickFile {...propsFile} />
    </ModalTab>
  );
};
