import React, { ReactNode, useState } from "react";

import { Button } from "@/components";

import { AlignedPlacement, DropdownGeneral } from "../dropdown-components";

type TProps = {
  title: string;
  placement?: AlignedPlacement;
  handleEvent: {
    title: string;
    event: () => void;
  };
  children: ReactNode;
};

export const DropdownConfirm: React.FC<TProps> = ({
  children,
  handleEvent,
  title,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const handleClickItem = () => {
    setIsShowContent(false);
    handleEvent.event();
  };
  const handleCancel = () => {
    setIsShowContent(false);
  };
  return (
    <DropdownGeneral
      display={children}
      widthContainer="12rem"
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
    >
      <div className="w-full p-4 w space-y-4">
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
          <Button size="small" block style="danger" onClick={handleClickItem}>
            {handleEvent.title}
          </Button>
        </div>
      </div>
    </DropdownGeneral>
  );
};
