import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  size: "sm" | "lg";
  children: ReactNode;
  title: string;
  triggerClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<TProps> = ({
  children,
  size,
  title,
  triggerClose,
}) => {
  const handleCloseModal = () => {
    triggerClose(false);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center shadow-lg drop-shadow-md bg-blue-grey-300">
      <div
        className={classNames("bg-white rounded-sm relative", {
          "w-1/3 h-5/6": size === "sm",
          "w-2/5 h-5/6": size === "lg",
        })}
      >
        <h1 className="p-3 text-lg font-bold text-center uppercase border-b-2 text-primary-800 border-primary-800">
          {title}
          <span
            aria-hidden="true"
            className="absolute right-0 mr-3 text-black cursor-pointer"
            onClick={handleCloseModal}
          >
            <i className="fas fa-angle-double-right"></i>
          </span>
        </h1>
        <div className="p-5 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
