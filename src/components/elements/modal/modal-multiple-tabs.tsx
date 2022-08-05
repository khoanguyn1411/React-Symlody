import { size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import { ReactElement, ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import { UseFormReset } from "react-hook-form";

import { Button } from "@/components";

type TEventModal = {
  title?: string;
  event: (param: string) => void;
  isLoading?: boolean;
};

type TToggleModal = {
  setShow?: () => void;
  setHidden?: () => void;
  setToggle?: () => void;
};

type TTabs = {
  title: string;
  children: ReactNode;
};

type TProps<T> = {
  size?: size;
  renderTabs: TTabs[];
  isShowing: boolean;
  toggle: TToggleModal;
  handleEvent?: TEventModal;
  resetForm?: UseFormReset<T>;
  allowClickOutside?: boolean;
};

/**
 * To get value of isShowing and toggle functions, please use useModal hook and pass
 * such values to corresponding props of modal (isShowing = isShowing and toggle = toggle)
 */
export const ModalMultipleTabs = <T extends unknown>({
  renderTabs,
  size = "sm",
  isShowing,
  toggle,
  handleEvent,
  resetForm,
  allowClickOutside = false,
}: TProps<T>): ReactElement => {
  const [tabActive, setTabActive] = useState<TTabs>(renderTabs[0]);
  const getTabActive = () => {
    return renderTabs.filter((item) => item.title === tabActive.title)[0];
  };

  const handleChangeTab = (item: TTabs) => {
    return () => {
      setTabActive(item);
    };
  };
  const isLoading = handleEvent.isLoading ?? false;
  const handleReset = () => {
    resetForm();
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

  return ReactDOM.createPortal(
    <div
      aria-hidden
      onClick={handleCloseWhenClickOutside}
      className={classNames(
        "fixed top-0 bottom-0 left-0 bg-backdrop-main right-0 z-20 duration-150 flex flex-col items-center justify-center",
        {
          "opacity-0 invisible": !isShowing,
          "opacity-100 visible": isShowing,
        }
      )}
    >
      <div
        aria-hidden
        onClick={(event) => handleStopPropagation(event)}
        className={classNames("w-full bg-white rounded-md min-w-modal", {
          "max-w-xs": size === "xs",
          "max-w-sm": size === "sm",
          "max-w-md": size === "md",
          "max-w-lg": size === "lg",
        })}
      >
        {/* Title */}
        <div className="flex justify-between px-5 border-b-2">
          {renderTabs.map((item, index) => (
            <div
              key={`modalTitle${index}`}
              aria-hidden
              className={classNames(
                "flex-1 py-2 text-center cursor-pointer transition-all duration-200",
                {
                  "bg-primary-50 text-primary-800":
                    tabActive.title === item.title,
                  "text-black": tabActive.title === item.title,
                }
              )}
              onClick={handleChangeTab(item)}
            >
              <span className="font-semibold">{item.title}</span>
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

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleEvent.event(getTabActive().title);
          }}
          className=" overflow-auto max-h-[80vh]"
        >
          <div className="overflow-auto">
            <div className="px-5 py-3">{getTabActive().children}</div>
            <div className="flex justify-end px-5 pb-5">
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
          </div>
        </form>
      </div>
    </div>,
    document.querySelector("body")
  );
};
