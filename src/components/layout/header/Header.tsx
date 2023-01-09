import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/elements";
import { useAppSelector } from "@/features";
import { useModal } from "@/hooks";
import { Media } from "@/provider/MediaContextProvider";

import { SidebarMobile } from "../sidebar";
import { QuestionForm } from "./header-forms/QuestionForm";
import { UserDropdown } from "./UserDropdown";

type TProps = {
  className?: string;
  isCompactSidebar: boolean;
  pageKey: string;
};

export const Header: React.FC<TProps> = ({ isCompactSidebar, pageKey }) => {
  const authStore = useAppSelector((state) => state.auth);
  const { organization } = useAppSelector((state) => state.config);
  const questionModalProps = useModal();
  const questionModalForm = useForm();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar((v) => !v);
  };

  const handleOpenQuestionModal = () => {
    questionModalProps.toggle.setShow();
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
          title: "",
          isLoading: false,
          isDisable: false,
          event: function (): void {
            throw new Error("Function not implemented.");
          },
        }}
        title={""}
        {...questionModalProps}
      >
        <QuestionForm />
      </Modal>
    </>
  );
};
