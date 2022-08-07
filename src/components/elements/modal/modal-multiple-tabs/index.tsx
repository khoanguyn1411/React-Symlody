import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { AnimationCustom, Button } from "@/components";

import { ANIMATION_DEFAULT_TIME } from "../../animation-custom/constants";
import {
  ModalMultipleTabsProvider,
  useModalMultipleTabsContext,
} from "./context";

export type TToggleModal = {
  setShow?: () => void;
  setHidden?: () => void;
  setToggle?: () => void;
};

type TTabs = {
  title: string;
  children: ReactNode;
};

type TProps = {
  size?: size;
  renderTabs: TTabs[];
  isShowing: boolean;
  toggle: TToggleModal;
  handleEvent?: TEventModal;
  allowClickOutside?: boolean;
};

/**
 * - To get value of isShowing and toggle functions, please use useModal hook and pass
 * such values to corresponding props of modal (isShowing = isShowing and toggle = toggle)
 *
 * - To use this multiple tabs modal, please use ModalTab for rendering content of tab
 * for better handling event of such tab.
 */
export const ModalMultipleTabs: React.FC<TProps> = (props) => {
  return (
    <ModalMultipleTabsProvider toggle={props.toggle}>
      <ModalContent {...props} />
    </ModalMultipleTabsProvider>
  );
};

export const ModalContent: React.FC<TProps> = ({
  renderTabs,
  size = "sm",
  isShowing,
  allowClickOutside = false,
}) => {
  const { resetFn, toggle } = useModalMultipleTabsContext();
  const [tabActive, setTabActive] = useState<TTabs>(renderTabs[0]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const getTabActive = () => {
    return renderTabs.filter((item) => item.title === tabActive.title)[0];
  };

  const handleReset = () => {
    resetFn && resetFn();
  };

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

  const handleChangeTab = (item: TTabs) => () => {
    setTabActive(item);
  };
  const handleSetHidden = () => {
    toggle.setToggle();
    handleReset();
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
          "fixed top-0 bottom-0 left-0 bg-backdrop-main animate__animated animate__fadeIn right-0 z-20 duration-150 flex flex-col items-center justify-center",
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
          {/* Title */}
          <div className="flex justify-between px-5 mt-4 border-b-2">
            {renderTabs.map((item, index) => (
              <div
                key={`modalTitle${index}`}
                aria-hidden
                className={classNames(
                  "flex-1 py-2 text-center cursor-pointer transition-all duration-200",
                  {
                    "bg-primary-50 text-primary-800":
                      getTabActive().title === item.title,
                    "text-black": getTabActive().title !== item.title,
                  }
                )}
                onClick={handleChangeTab(item)}
              >
                <span className="text-lg font-semibold">{item.title}</span>
              </div>
            ))}
            <span
              aria-hidden="true"
              className="flex items-center justify-center py-3 pl-4 pr-0 text-black cursor-pointer"
              onClick={handleSetHidden}
            >
              <i className="far fa-times"></i>
            </span>
          </div>
          {/* Children */}
          <div>{getTabActive().children}</div>
        </div>
      </div>
    </AnimationCustom>,
    document.querySelector("body")
  );
};

type TEventModal = {
  title?: string;
  event: () => void;
  isLoading?: boolean;
};

type TPropsModalTab = {
  handleEvent: TEventModal;
  resetForm?: () => void;
  children: ReactNode;
  otherActions?: React.DOMAttributes<HTMLFormElement>;
};

export const ModalTab: React.FC<TPropsModalTab> = ({
  handleEvent,
  resetForm,
  children,
  otherActions,
}) => {
  const isLoading = handleEvent.isLoading ?? false;
  const { resetFn, setResetFn, toggle } = useModalMultipleTabsContext();

  useEffect(() => {
    setResetFn(() => resetForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    resetFn && resetFn();
  };

  const handleSetHidden = () => {
    toggle.setToggle();
    handleReset();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEvent.event();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-h-[80vh]"
      {...otherActions}
    >
      <div className="px-5 pt-5 overflow-auto">{children}</div>
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
  );
};
