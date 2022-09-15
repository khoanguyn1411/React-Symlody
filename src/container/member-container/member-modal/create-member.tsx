import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  ModalMultipleTabs,
  ModalTab,
  PICK_FILE_MESSAGE,
  PickFile,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { createMemberAsync, getMembersAsync } from "@/features/reducers";
import { THookModalProps } from "@/hooks";

import { MEMBER_MESSAGE } from "../constant";
import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./member-form";

const TabCreateAMember: React.FC = () => {
  const propsForm = useForm<IFormMemberInfo>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = propsForm;
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const departmentStore = useAppSelector((state) => state.department);

  const handleCreateMember = async (data: IFormMemberInfo) => {
    const memberModel = MemberFormMapper.toModel(
      departmentStore.department,
      data
    );
    const res = await dispatch(createMemberAsync(memberModel));
    console.log(res);
    if (!res.payload) {
      toast.error(MEMBER_MESSAGE.create.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.create.success);
    reset();
    dispatch(getMembersAsync(memberStore.listQueryMember));
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: memberStore.pendingCreateMember,
      }}
    >
      <FormItems formProps={propsForm} />
    </ModalTab>
  );
};

const TabCreateMultipleMembers: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [message, setMessage] = useState<string>(
    PICK_FILE_MESSAGE.defaultExtension
  );

  const handleSubmitFile = () => {
    if (!selectedFile) {
      setMessage(PICK_FILE_MESSAGE.notPickFile);
      return;
    }
    setMessage(PICK_FILE_MESSAGE.defaultExtension);
    alert("Submitted!");
  };

  return (
    <ModalTab
      handleEvent={{
        event: handleSubmitFile,
        isLoading: false,
      }}
    >
      <PickFile
        message={message}
        setMessage={setMessage}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
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
