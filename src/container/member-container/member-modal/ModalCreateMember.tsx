import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Loading, ModalMultipleTabs, ModalTab, PickFile } from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  createMemberAsync,
  departmentSelectors,
  getDepartmentAsync,
  uploadMemberExcelFileAsync,
} from "@/features/reducers";
import { THookModalProps, usePickFile } from "@/hooks";
import { generateFormErrors } from "@/utils/services/form-service";

import { MEMBER_MESSAGE } from "../constant";
import { memberFormMapper } from "../mapper";
import { schema } from "../schema";
import { MemberForm } from "../type";
import { FormItems } from "./FormItems";

const TabCreateAMember: React.FC = () => {
  const propsForm = useForm<MemberForm>({
    resolver: yupResolver(schema),
  });
  const {
    setError,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = propsForm;
  const dispatch = useAppDispatch();
  const departmentList = useAppSelector(departmentSelectors.selectAll);
  const departmentCount = useAppSelector(departmentSelectors.selectTotal);

  const departmentStore = useAppSelector((state) => state.department);

  useEffect(() => {
    if (departmentCount === 0) {
      dispatch(getDepartmentAsync());
    }
  }, [departmentCount, dispatch]);

  const handleCreateMember = async (data: MemberForm) => {
    const memberModel = memberFormMapper.toModel({
      departmentModel: departmentList,
      formData: data,
      isArchived: false,
    });
    const res = await dispatch(createMemberAsync(memberModel));
    if (createMemberAsync.rejected.match(res)) {
      const errors = res.payload;
      if (errors) {
        generateFormErrors({
          errors,
          customMessage: { "authAccount.email": "Email này đã được đăng ký." },
          setError,
        });
        return;
      }
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

const TabCreateMultipleMembers: React.FC<TToggleModal> = (toggle) => {
  const propsFile = usePickFile();
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);

  const handleSubmitFile = async () => {
    propsFile.setIsSubmitFile(true);
    if (!propsFile.selectedFile) {
      return;
    }
    const res = await dispatch(
      uploadMemberExcelFileAsync({ file: propsFile.selectedFile })
    );
    if (!res.payload) {
      toast.error(MEMBER_MESSAGE.create.error);
      return;
    }
    toggle.setHidden();
    toast.success(MEMBER_MESSAGE.create.success);
  };

  return (
    <ModalTab
      handleEvent={{
        event: handleSubmitFile,
        isLoading: memberStore.pendingUploadFileMember,
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
          children: <TabCreateMultipleMembers {...toggle} />,
          key: "AddMultipleMember",
        },
      ]}
      isShowing={isShowing}
      widthContainer={640}
      toggle={toggle}
    />
  );
};
