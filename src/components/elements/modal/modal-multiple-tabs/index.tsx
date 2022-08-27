import { useState } from "react";

import { TabHost, TTab } from "../../tab-host";
import { ModalBody, ModalFooter, ModalWrapper } from "../modal-components";
import { TPropsModalMultipleTabs, TPropsModalTab, TTabs } from "../types";
import {
  ModalMultipleTabsProvider,
  useModalMultipleTabsContext,
} from "./context";

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
export const ModalMultipleTabs: React.FC<TPropsModalMultipleTabs> = (props) => {
  return (
    <ModalMultipleTabsProvider {...props}>
      <ModalMultipleTabsContent />
    </ModalMultipleTabsProvider>
  );
};

const ModalMultipleTabsContent: React.FC = () => {
  const props = useModalMultipleTabsContext();
  const { renderTabs, toggle, reset } = props;

  const [tabActive, setTabActive] = useState<TTabs>(renderTabs[0]);

  const handleChangeTab = (item: TTab) => {
    const tabModal = renderTabs.find((tab) => tab.title === item.title);
    setTabActive(tabModal);
  };
  const handleSetHidden = () => {
    toggle.setToggle();
    reset && reset();
  };

  return (
    <ModalWrapper {...props}>
      {/* Title */}
      <div className="flex justify-between px-5 mt-4 border-b">
        <TabHost
          isNoSpace
          defaultActive={tabActive.key}
          isStretchTab
          onChangeTab={handleChangeTab}
          listTabs={renderTabs.map((item) => ({
            title: item.title,
            key: item.key,
          }))}
        />
        <span
          aria-hidden="true"
          className="flex items-center justify-center py-3 pl-4 pr-0 text-black cursor-pointer"
          onClick={handleSetHidden}
        >
          <i className="far fa-times"></i>
        </span>
      </div>
      {/* Children */}
      <div>{tabActive.children}</div>
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
