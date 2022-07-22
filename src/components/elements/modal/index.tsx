import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  size: size;
  children: ReactNode;
  title: string;
  isOpen: boolean;
  toggle: () => void;
  footerElements: ReactNode;
};

export const Modal: React.FC<TProps> = ({
  children,
  size,
  title,
  isOpen,
  toggle,
  footerElements,
}) => {
  return (
    <Dialog
      open={isOpen}
      handler={toggle}
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
        className={classNames(
          "bg-white flex rounded-sm relative flex-col p-0 max-h-[90vh]"
        )}
      >
        <h1 className="w-full px-5 py-3 text-2xl font-bold text-center uppercase border-b-2 text-primary-800 border-primary-800">
          {title}
          <span
            aria-hidden="true"
            className="absolute right-0 mr-5 text-black cursor-pointer"
            onClick={toggle}
          >
            <i className="fas fa-times"></i>
          </span>
        </h1>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col px-5 overflow-auto">{children}</div>
      </DialogBody>
      <DialogFooter className="px-5">{footerElements}</DialogFooter>
    </Dialog>
  );
};
