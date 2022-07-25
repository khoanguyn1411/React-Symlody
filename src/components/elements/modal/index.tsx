import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import { UseFormReset } from "react-hook-form";

import { Button } from "@/components";

type TEventModal = {
  title?: string;
  event: () => void;
};

type TToggleModal = {
  setShow?: () => void;
  setHidden?: () => void;
  setToggle?: () => void;
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
  size = "sm",
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
    toggle.setToggle();
    handleReset();
  };
  return ReactDOM.createPortal(
    <div
      className={classNames(
        "fixed top-0 bottom-0 left-0 bg-backdrop-main right-0 z-20 duration-150 flex flex-col items-center justify-center",
        {
          "opacity-0 invisible": !isShowing,
          "opacity-100 visible": isShowing,
        }
      )}
    >
      <div
        className={classNames("w-full bg-white rounded-md min-w-modal", {
          "max-w-xs": size === "xs",
          "max-w-sm": size === "sm",
          "max-w-md": size === "md",
          "max-w-lg": size === "lg",
        })}
      >
        <div className={classNames("w-full flex relative flex-col p-0")}>
          <h1 className="w-full px-5 py-3 text-2xl font-bold text-left uppercase border-b border-gray-400 text-primary-800">
            {title}
            <span
              aria-hidden="true"
              className="absolute right-0 mr-5 text-black cursor-pointer"
              onClick={handleSetHidden}
            >
              <i className="far fa-times"></i>
            </span>
          </h1>
        </div>
        <form
          onSubmit={handleEvent.event}
          className=" overflow-auto max-h-[80vh]"
        >
          <div className="overflow-auto">
            <div className="flex flex-col w-full px-5 pt-5">{children}</div>
            <div className="px-5 pb-5 text-right">
              <Button style="outline" type="reset" onClick={handleSetHidden}>
                Hủy
              </Button>
              <Button type="submit" className="ml-5">
                {handleEvent.title || "Tạo"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector("body")
  );
};
