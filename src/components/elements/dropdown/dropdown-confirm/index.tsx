import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";
import React, { ReactNode } from "react";

import { Button } from "@/components";

type TProps = {
  title: string;
  placement?: placement;
  handleEvent: {
    title: string;
    event: () => void;
  };
  children: ReactNode;
};

export const DropdownConfirm: React.FC<TProps> = ({
  children,
  handleEvent,
  placement = "bottom-end",
  title,
}) => {
  return (
    <Menu placement={placement}>
      <MenuHandler>
        <div className="cursor-pointer">{children}</div>
      </MenuHandler>
      <MenuList className="p-0 pt-2 shadow-lg drop-shadow-sm">
        <h1 className="w-full my-2 text-base font-semibold text-center text-black">
          {title}
        </h1>
        <div className="w-full h-[1px] bg-grey-200" />
        <div className="flex p-4 gap-4">
          <Button
            className="border-secondary-500 text-secondary-500"
            style="outline"
          >
            Hủy
          </Button>
          <Button
            className="bg-secondary-500 border-secondary-500 hover:bg-secondary-600 hover:border-secondary-600"
            onClick={handleEvent.event}
          >
            {handleEvent.title}
          </Button>
        </div>
      </MenuList>
    </Menu>
  );
};
