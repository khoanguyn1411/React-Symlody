import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ModalMultipleTabs, ModalTab, PickFile } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { createMemberAsync } from "@/features/reducers";
import { THookModalProps, usePickFile } from "@/hooks";

import { MEMBER_MESSAGE } from "../constant";
import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./FormItems";

const _TabCreateAMember: React.FC = () => {
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

  const handleCreateMember = useCallback(
    async (data: IFormMemberInfo) => {
      const memberModel = MemberFormMapper.toModel(
        departmentStore.department,
        data
      );
      const res = await dispatch(createMemberAsync(memberModel));
      if (!res.payload) {
        toast.error(MEMBER_MESSAGE.create.error);
        return;
      }
      toast.success(MEMBER_MESSAGE.create.success);
      reset();
    },
    [departmentStore.department, dispatch, reset]
  );

  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: isSubmitting,
      }}
    >
      <FormItems formProps={propsForm} />
    </ModalTab>
  );
};

const _TabCreateMultipleMembers: React.FC = () => {
  const propsFile = usePickFile();

  const handleSubmitFile = useCallback(() => {
    propsFile.setIsSubmitFile(true);
  }, [propsFile]);

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

const _ModalCreateMember: React.FC<THookModalProps<undefined>> = ({
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

const TabCreateAMember = memo(_TabCreateAMember);
const TabCreateMultipleMembers = memo(_TabCreateMultipleMembers);
export const ModalCreateMember = memo(_ModalCreateMember);
