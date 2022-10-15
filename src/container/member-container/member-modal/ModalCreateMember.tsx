import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Loading, ModalMultipleTabs, ModalTab, PickFile } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { createMemberAsync, getDepartmentAsync } from "@/features/reducers";
import { THookModalProps, usePickFile } from "@/hooks";

import { MEMBER_MESSAGE } from "../constant";
import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./FormItems";

const TabCreateAMember: React.FC = () => {
  const propsForm = useForm<IFormMemberInfo>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = propsForm;
  const dispatch = useAppDispatch();
  const departmentStore = useAppSelector((state) => state.department);

  useEffect(() => {
    if (departmentStore.departments.length === 0) {
      dispatch(getDepartmentAsync());
    }
  }, [departmentStore.departments.length, dispatch]);

  const handleCreateMember = async (data: IFormMemberInfo) => {
    const memberModel = MemberFormMapper.toModel(
      departmentStore.departments,
      data,
      false
    );
    const res = await dispatch(createMemberAsync(memberModel));
    if (res.meta.requestStatus === "rejected") {
      toast.error(MEMBER_MESSAGE.create.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.create.success);
    reset();
  };

  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: isSubmitting,
      }}
    >
      {departmentStore.pending ? (
        <Loading />
      ) : (
        <FormItems formProps={propsForm} />
      )}
    </ModalTab>
  );
};

const TabCreateMultipleMembers: React.FC = () => {
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
      <PickFile
        linkFile={"/excels/member_create_template.xlsx"}
        {...propsFile}
      />
    </ModalTab>
  );
};

export const ModalCreateMember: React.FC<THookModalProps<undefined>> = ({
  isShowing,
  toggle,
}) => {
  return (
    <ModalMultipleTabs
      renderTabs={[
        {
          title: "Tạo thành viên",
          children: <TabCreateAMember />,
          key: "AddAMember",
        },
        {
          title: "Tạo nhiều thành viên",
          children: <TabCreateMultipleMembers />,
          key: "AddMultipleMember",
        },
      ]}
      isShowing={isShowing}
      size="lg"
      toggle={toggle}
    />
  );
};
