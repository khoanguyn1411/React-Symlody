import { Dialog, DialogBody } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type TProps = {
  size: size;
  children: ReactNode;
  title: string;
  isOpen: boolean;
  toggle: () => void;
};
// Test computer 6
export const Modal: React.FC<TProps> = ({
  children,
  size,
  title,
  isOpen,
  toggle,
}) => {
  return ReactDOM.createPortal(
    <Dialog open={isOpen} handler={toggle} size={size}>
      <DialogBody
        className={classNames(
          "bg-white flex rounded-sm relative flex-col p-0 max-h-[90vh]"
        )}
      >
        <h1 className="p-3 text-lg font-bold text-center uppercase border-b-2 text-primary-800 border-primary-800">
          {title}
          <span
            aria-hidden="true"
            className="absolute right-0 mr-3 text-black cursor-pointer"
            onClick={toggle}
          >
            <i className="fas fa-angle-double-right"></i>
          </span>
        </h1>
        <div className="flex flex-col p-5 overflow-auto">{children}</div>
      </DialogBody>
    </Dialog>,
    document.querySelector("body")
  );
};
