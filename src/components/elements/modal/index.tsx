import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import React, { ReactNode } from "react";

import { Button } from "@/components";

type TEventModal = {
  title: string;
  event: () => void;
};

type TToggleModal = {
  setShow: () => void;
  setHidden: () => void;
};

type TProps = {
  size: size;
  children: ReactNode;
  title: string;
  isOpen: boolean;
  toggle: TToggleModal;
  handleEvent: TEventModal;
};

/**
 * To get value of isOpen and toggle functions, please use useModal hook and pass
 * such values to corresponding props of modal (isOpen = isOpen and toggle = toggle)
 */
export const Modal: React.FC<TProps> = ({
  children,
  size,
  title,
  isOpen,
  toggle,
  handleEvent,
}) => {
  return (
    <Dialog
      open={isOpen}
      handler={toggle.setShow}
      size={size}
      className="min-w-modal"
      animate={{
        mount: {
          transition: {
            duration: 0.15,
          },
        },
        unmount: {
          transition: {
            duration: 0.15,
          },
        },
      }}
    >
      <DialogHeader
        className={classNames("bg-white flex rounded-sm relative flex-col p-0")}
      >
        <h1 className="w-full px-5 py-3 text-2xl font-bold text-center uppercase border-b-2 text-primary-800 border-primary-800">
          {title}
          <span
            aria-hidden="true"
            className="absolute right-0 mr-5 text-black cursor-pointer"
            onClick={toggle.setHidden}
          >
            <i className="fas fa-times"></i>
          </span>
        </h1>
      </DialogHeader>
      <form onSubmit={handleEvent.event} className="overflow-auto max-h-[80vh]">
        <DialogBody className="flex flex-col w-full px-5 overflow-auto">
          {children}
        </DialogBody>
        <DialogFooter className="px-5">
          <Button
            className="bg-white shadow-none text-default hover:shadow-none text-primary-800"
            onClick={toggle.setHidden}
          >
            Hủy
          </Button>
          <Button
            className="ml-5 text-default bg-primary-800 hover:bg-primary-800"
            onClick={handleEvent.event}
          >
            {handleEvent.title}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
