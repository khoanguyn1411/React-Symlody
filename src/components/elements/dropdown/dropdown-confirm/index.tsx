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
      widthContainer="240px"
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
    >
      <div className="p-4 space-y-4 w-full">
        <div className="flex items-center">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 shadow-inner mr-2">
            <i className="fas fa-question text-red-400" />
          </span>
          <h1 className="w-full text-base font-medium text-black flex-1">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-4 w-full">
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
