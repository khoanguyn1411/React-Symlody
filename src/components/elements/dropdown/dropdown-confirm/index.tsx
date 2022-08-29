import React, { ReactNode, useRef } from "react";

import { Button, Dropdown, TDropdownMethod } from "@/components";

import { AlignedPlacement } from "../../../elements/portal/type";

type TProps = {
  title: string;
  placement?: AlignedPlacement;
  handleEvent: {
    title: string;
    event: () => void;
  };
  isShowLoading?: boolean;
  children: ReactNode;
};

export const DropdownConfirm: React.FC<TProps> = ({
  children,
  handleEvent,
  title,
  placement,
  isShowLoading,
}) => {
  const dropdownRef = useRef<TDropdownMethod>(null);
  const handleClickItem = () => {
    handleEvent.event();
    dropdownRef.current.hideDropdown();
  };

  const handleCancel = () => {
    dropdownRef.current.hideDropdown();
  };
  return (
    <Dropdown
      ref={dropdownRef}
      renderCustom={
        <div className="w-full p-4 space-y-4">
          <div className="flex items-center">
            <span className="flex items-center justify-center w-8 h-8 mr-2 rounded-full shadow-inner bg-red-50">
              <i className="text-red-400 fas fa-question" />
            </span>
            <h1 className="flex-1 w-full text-base font-medium text-black">
              {title}
            </h1>
          </div>

          <div className="flex items-center w-full space-x-4">
            <Button size="small" style="text" block onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              size="small"
              block
              style="danger"
              onClick={handleClickItem}
              isShowLoading={isShowLoading}
            >
              {handleEvent.title}
            </Button>
          </div>
        </div>
      }
      widthContainer="12rem"
      placement={placement}
    >
      {children}
    </Dropdown>
  );
};
