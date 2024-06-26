import { ModalBody, ModalFooter } from "../modal-components";
import { TPropsModalTab } from "../types";
import { useModalMultipleTabsContext } from "./context";

export const ModalTab: React.FC<TPropsModalTab> = ({
  handleEvent,
  children,
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
