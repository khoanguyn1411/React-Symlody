import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/elements";
import { useAppDispatch, useAppSelector } from "@/features";
import { sendQuestionAsync } from "@/features/reducers/help-desk-reducer";
import { HelpDesk } from "@/features/types";
import { useModal } from "@/hooks";
import { Media } from "@/provider/MediaContextProvider";
import { FormService } from "@/utils/funcs/form-service";

import { SidebarMobile } from "../sidebar";
import { HelpDeskForm } from "./help-desk/HelpDeskForm";
import { HELP_DESK_MESSAGE } from "./help-desk/message";
import { schema } from "./help-desk/schema";
import { UserDropdown } from "./UserDropdown";

type TProps = {
  className?: string;
  isCompactSidebar: boolean;
  pageKey: string;
};

export const Header: React.FC<TProps> = ({ isCompactSidebar, pageKey }) => {
  const authStore = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { organization } = useAppSelector((state) => state.config);
  const questionModalProps = useModal();
  const questionModalForm = useForm<HelpDesk>({
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = questionModalForm;

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar((v) => !v);
  };

  const handleOpenQuestionModal = () => {
    questionModalProps.toggle.setShow();
  };

  const handleSendQuestion = async (data: HelpDesk) => {
    const response = await dispatch(sendQuestionAsync(data));
    FormService.validateResponse({
      asyncThunk: sendQuestionAsync,
      response,
      successMessage: HELP_DESK_MESSAGE.success,
      errorMessage: HELP_DESK_MESSAGE.failed,
      onSuccess: () => {
        questionModalProps.toggle.setHidden();
      },
      setError,
    });
  };

  return (
    <>
      <header
        className={classNames(
          "flex items-center bg-white z-10 justify-between xl:justify-end px-4 h-header sticky top-0 mx-0 transition-margin  duration-300  border-b border-gray-200",
          isCompactSidebar ? "xl:ml-sidebar-compact " : "xl:ml-sidebar"
        )}
      >
        <Media lessThan="xl">
          <div className="flex-1">
            <span
              aria-hidden="true"
              onClick={toggleSidebar}
              className="cursor-pointer"
            >
              <i className="fas fa-bars" />
            </span>
          </div>
          <SidebarMobile
            pageKey={pageKey}
            visible={isOpenSidebar}
            onClose={() => setIsOpenSidebar(false)}
          />
        </Media>

        <div className="flex items-center space-x-4">
          <button onClick={handleOpenQuestionModal}>
            <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-inner cursor-pointer hover:bg-gray-300 transition-all duration-300">
              <i className="text-sm fas fa-question" />
            </span>
          </button>

          {/* <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-inner cursor-pointer transition-all duration-300 hover:bg-gray-300">
          <Icon.Bell size="small" customColor="text" />
        </span> */}

          <div data-tour-id="layout__userDropdown">
            <UserDropdown organization={organization} user={authStore.user} />
          </div>
        </div>
      </header>
      <Modal
        handleEvent={{
          title: "Gửi góp ý",
          isLoading: isSubmitting,
          isDisable: !isDirty,
          event: handleSubmit(handleSendQuestion),
        }}
        title={"Hộp thư nhận góp ý"}
        {...questionModalProps}
      >
        <HelpDeskForm formProps={questionModalForm} />
      </Modal>
    </>
  );
};
