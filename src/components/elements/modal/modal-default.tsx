import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { AnimationCustom, Button } from "@/components";

import { ANIMATION_DEFAULT_TIME } from "../animation-custom/constants";

type TEventModal = {
  title?: string;
  event: () => void;
  isLoading?: boolean;
};

type TToggleModal = {
  setShow?: () => void;
  setHidden?: () => void;
  setToggle?: () => void;
};

type TProps = {
  size: size;
  children: ReactNode;
  title: string;
  isShowing: boolean;
  toggle: TToggleModal;
  handleEvent: TEventModal;
  resetForm?: () => void;
  allowClickOutside?: boolean;
};

/**
 * To get value of isShowing and toggle functions, please use useModal hook and pass
 * such values to corresponding props of modal (isShowing = isShowing and toggle = toggle)
 */
export const Modal: React.FC<TProps> = ({
  children,
  size = "sm",
  title,
  isShowing,
  toggle,
  handleEvent,
  allowClickOutside = false,
  resetForm,
}) => {
  const isLoading = handleEvent.isLoading ?? false;
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (isShowing) {
      setIsMounted(true);
      return;
    }
    const unMountedId = setTimeout(() => {
      setIsMounted(false);
    }, ANIMATION_DEFAULT_TIME);

    return () => {
      clearTimeout(unMountedId);
    };
  }, [isShowing]);

  const handleSetHidden = () => {
    toggle.setToggle();
    resetForm && resetForm();
  };
  const handleCloseWhenClickOutside = () => {
    allowClickOutside && toggle.setToggle();
  };

  const handleStopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    allowClickOutside && event.stopPropagation();
  };
  if (!isMounted) {
    return;
  }
  return ReactDOM.createPortal(
    <AnimationCustom>
      <div
        aria-hidden
        onClick={handleCloseWhenClickOutside}
        className={classNames(
          "fixed top-0 bottom-0 left-0 bg-backdrop-main animate__animated animate__fadeIn right-0 z-20 flex flex-col items-center justify-center",
          {
            animate__fadeOut: !isShowing,
          }
        )}
      >
        <div
          aria-hidden
          onClick={handleStopPropagation}
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
            className="flex flex-col max-h-[80vh]"
          >
            <div className="flex flex-col w-full px-5 pt-5 overflow-auto">
              {children}
            </div>
            <div className="flex justify-end px-5 py-4">
              <Button style="outline" type="reset" onClick={handleSetHidden}>
                Hủy
              </Button>
              <Button
                isShowLoading={{ active: isLoading }}
                type="submit"
                className="ml-5"
              >
                {handleEvent.title ?? "Tạo"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AnimationCustom>,
    document.querySelector("body")
  );
};
