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
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
    >
      <h1 className="w-full my-2 text-base font-semibold text-center text-black">
        {title}
      </h1>
      <div className="w-full h-[1px] bg-grey-200" />
      <div className="flex p-4 w-52 gap-4">
        <Button
          className="flex-1 border-secondary-500 text-secondary-500"
          style="outline"
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-secondary-500 border-secondary-500 hover:bg-secondary-600 hover:border-secondary-600"
          onClick={handleClickItem}
        >
          {handleEvent.title}
        </Button>
      </div>
    </DropdownGeneral>
  );
};
