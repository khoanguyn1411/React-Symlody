import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ModalMultipleTabs, ModalTab, PickFile } from "@/components";
import { MESSAGE_DEFAULT_EXTENSION, MESSAGE_NOT_PICK_FILE } from "@/constants";
import { useAppDispatch } from "@/features";
import { createMemberAsync, getMembersAsync } from "@/features/reducers";
import { THookModalProps } from "@/hooks";

import { MemberFormMapper } from "../mapper";
import { schema } from "../schema";
import { IFormMemberInfo } from "../type";
import { FormItems } from "./member-form";

const TabCreateAMember: React.FC = () => {
  const propsForm = useForm<IFormMemberInfo>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = propsForm;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateMember = async (data: IFormMemberInfo) => {
    setIsLoading(true);
    const memberModel = MemberFormMapper.toModel(data);
    const res = await dispatch(createMemberAsync(memberModel));
    if (!res.payload) {
      toast.error("Tạo thành viên thất bại");
      return;
    }
    setIsLoading(false);
    dispatch(getMembersAsync());
  };
  return (
    <ModalTab
      handleEvent={{
        event: handleSubmit(handleCreateMember),
        isLoading: isLoading,
      }}
    >
      <FormItems formProps={propsForm} />
    </ModalTab>
  );
};

const TabCreateMultipleMembers: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [message, setMessage] = useState<string>(MESSAGE_DEFAULT_EXTENSION);

  const handleSubmitFile = () => {
    if (!selectedFile) {
      setMessage(MESSAGE_NOT_PICK_FILE);
      return;
    }
    setMessage(MESSAGE_DEFAULT_EXTENSION);
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
        selectedFile={selectedFile}
        setMessage={setMessage}
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
        },
        {
          title: "Tạo nhiều thành viên",
          children: <TabCreateMultipleMembers />,
        },
      ]}
      isShowing={isShowing}
      size="lg"
      toggle={toggle}
    />
  );
};
