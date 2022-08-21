import classNames from "classnames";
import { forwardRef, useImperativeHandle, useState } from "react";

import { ModalBody, ModalFooter, ModalWrapper } from "../modal-components";
import {
  TPropsModalMultipleTabs,
  TPropsModalTab,
  TTabs,
  TToggleModal,
} from "../types";
import {
  ModalMultipleTabsProvider,
  useModalMultipleTabsContext,
} from "./context";

export type TMethodModals<T> = {
  setData: (data: T) => void;
  toggle: TToggleModal;
  data: T | undefined;
};

/**
 * - To get value of isShowing and toggle functions, please use useModal hook and pass
 * such values to corresponding props of modal (isShowing = isShowing and toggle = toggle)
 * - To use this multiple tabs modal, please use ModalTab for rendering content of tab
 * for better handling event of such tab.
 * @example
 *  const {setToggle, isShowing} = useModal();
 *  <ModalMultipleTabs
      toggle={{ setToggle }}
      size="lg"
      isShowing={isShowing}
      renderTabs={[
        { title: "Thêm 1 tài sản", children: <ModalTab>...</ModalTab> },
        { title: "Thêm nhiều tài sản", children: <ModalTab>...</ModalTab> },
      ]}
    />
 */
const ModalMultipleTabsInner = <T extends unknown>(
  props: Omit<TPropsModalMultipleTabs, "isShowing" | "toggle">,
  ref: React.ForwardedRef<TMethodModals<T>>
) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [data, setDataState] = useState<T>();

  function setData(data: T) {
    if (typeof data === undefined) {
      throw new Error("To use this function, please implement type for hook.");
    }
    setDataState(data);
  }

  const toggle: TToggleModal = {
    setShow() {
      setIsShowing(true);
    },
    setHidden() {
      setIsShowing(false);
    },
    setToggle() {
      setIsShowing(!isShowing);
    },
  };

  useImperativeHandle(ref, () => ({
    setData,
    toggle,
    data,
  }));

  const values = { ...props, isShowing, setIsShowing, data, setData, toggle };
  return (
    <div>
      <ModalMultipleTabsProvider {...values}>
        <ModalMultipleTabsContent />
      </ModalMultipleTabsProvider>
    </div>
  );
};

export const ModalMultipleTabs = forwardRef(ModalMultipleTabsInner);

const ModalMultipleTabsContent: React.FC = () => {
  const props = useModalMultipleTabsContext();
  const { renderTabs, toggle, reset } = props;

  const [tabActive, setTabActive] = useState<TTabs>(renderTabs[0]);
  const getTabActive = () => {
    return renderTabs.filter((item) => item.title === tabActive.title)[0];
  };

  const handleChangeTab = (item: TTabs) => () => {
    setTabActive(item);
  };
  const handleSetHidden = () => {
    toggle.setToggle();
    reset && reset();
  };

  return (
    <ModalWrapper {...props}>
      {/* Title */}
      <div className="flex justify-between px-5 mt-4 border-b">
        {renderTabs.map((item, index) => (
          <div
            key={`modalTitle${index}`}
            aria-hidden
            className={classNames(
              "flex-1 py-2 text-center cursor-pointer transition-colors duration-200",
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
    </ModalWrapper>
  );
};

export const ModalTab: React.FC<TPropsModalTab> = ({
  handleEvent,
  children,
  otherActions,
}) => {
  const { toggle, reset } = useModalMultipleTabsContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEvent.event();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-h-[calc(100vh-10rem)]"
      {...otherActions}
    >
      <ModalBody>{children}</ModalBody>
      <ModalFooter
        reset={reset}
        {...handleEvent}
        setToggle={toggle.setToggle}
      />
    </form>
  );
};
