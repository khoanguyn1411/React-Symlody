import { useRef } from "react";

import { GlobalTypes } from "@/utils";

import { Button } from "../../button";
import { AlignedPlacement } from "../../portal/type";
import { Dropdown, TDropdownMethod } from "../dropdown-default";

type TProps = {
  title: string;
  placement?: AlignedPlacement;
  handleEvent: {
    title: string;
    event: () => void;
  };
  icon?: JSX.Element;
  isShowLoading?: boolean;
  disableSubmit?: boolean;
};

export const DropdownConfirm: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  handleEvent,
  title,
  placement,
  isShowLoading,
  icon,
  disableSubmit = false,
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
      widthContainer="240px"
      ref={dropdownRef}
      renderCustom={
        <div className="w-full px-3 py-2 space-y-4">
          <div className="flex items-start gap-1">
            <span className="flex items-center justify-center mt-1 mr-2">
              {icon || <i className="text-red-400 fas fa-question" />}
            </span>
            <h1 className="flex-1 w-full text-sm font-medium text-black">
              {title}
            </h1>
          </div>

          <div className="flex items-center w-full space-x-4">
            <Button
              className="text-xs"
              size="small"
              style="text"
              block
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button
              className="text-xs"
              size="small"
              block
              style="danger"
              onClick={handleClickItem}
              isShowLoading={isShowLoading}
              disable={disableSubmit}
            >
              {handleEvent.title}
            </Button>
          </div>
        </div>
      }
      placement={placement}
    >
      {children}
    </Dropdown>
  );
};
