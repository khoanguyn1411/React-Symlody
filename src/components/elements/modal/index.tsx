import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import { UseFormReset } from "react-hook-form";

import { Button } from "@/components";

type TEventModal = {
  title?: string;
  event: () => void;
};

type TToggleModal = {
  setShow: () => void;
  setHidden: () => void;
};

type TProps<T> = {
  size: size;
  children: ReactNode;
  title: string;
  isShowing: boolean;
  toggle: TToggleModal;
  handleEvent: TEventModal;
  resetForm?: UseFormReset<T>;
};

/**
 * To get value of isShowing and toggle functions, please use useModal hook and pass
 * such values to corresponding props of modal (isShowing = isShowing and toggle = toggle)
 */
export const Modal = <T extends unknown>({
  children,
  size,
  title,
  isShowing,
  toggle,
  handleEvent,
  resetForm,
}: TProps<T>): ReactElement => {
  const handleReset = () => {
    resetForm();
  };
  const handleSetHidden = () => {
    toggle.setHidden();
    handleReset();
  };
  return (
    <Dialog
      open={isShowing}
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
        <h1 className="w-full px-5 py-3 text-2xl font-semibold text-center uppercase border-b-2 text-primary-800 border-primary-800">
          {title}
          <span
            aria-hidden="true"
            className="absolute right-0 mr-5 text-black cursor-pointer"
            onClick={handleSetHidden}
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
            type="reset"
            onClick={handleSetHidden}
            className="bg-white shadow-none text-default hover:shadow-none text-primary-800"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="ml-5 text-default bg-primary-800 hover:bg-primary-800"
          >
            {handleEvent.title || "Tao"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
