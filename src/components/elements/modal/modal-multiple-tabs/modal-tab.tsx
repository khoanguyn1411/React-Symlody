import { memo } from "react";

import { ModalBody, ModalFooter } from "../modal-components";
import { TPropsModalTab } from "../types";
import { useModalMultipleTabsContext } from "./context";

const _ModalTab: React.FC<TPropsModalTab> = ({
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

export const ModalTab = memo(_ModalTab);
