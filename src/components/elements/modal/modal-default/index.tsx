import classNames from "classnames";
import ReactDOM from "react-dom";

import { ToggleWrapper } from "@/components";

import { ModalBody, ModalFooter, ModalWrapper } from "../modal-components";
import { TPropsModalDefault } from "../types";

/**
 * To get value of isShowing and toggle functions, please use useModal hook and pass
 * the corresponding props provided in such hook.
 * @example
 * const {setToggle, isShowing} = useModal();
 *  <Modal
      reset={reset}
      toggle={{ setToggle }}
      title="Chỉnh sửa tài sản"
      size="lg"
      isShowing={isShowing}
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleEditAsset),
        isLoading: isLoading,
        isDisable: Object.keys(dirtyFields).length === 0,
      }}
    >
      <FormItems data={data} formProps={propsForm} />
    </Modal>
 */
export const Modal: React.FC<TPropsModalDefault> = (props) => {
  const { children, title, isShowing, toggle, handleEvent, reset } = props;
  const handleSetHidden = () => {
    toggle.setToggle();
    reset && reset();
  };

  return ReactDOM.createPortal(
    <ToggleWrapper isShowing={isShowing}>
      <ModalWrapper {...props}>
        <div className={classNames("w-full flex relative flex-col p-0")}>
          <h1 className="w-full px-5 py-3 text-2xl font-bold text-left uppercase border-b border-gray-200 text-primary-800">
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
          className="flex flex-col max-h-[calc(100vh-160px)]"
        >
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            reset={reset}
            {...handleEvent}
            setToggle={toggle.setToggle}
          />
        </form>
      </ModalWrapper>
    </ToggleWrapper>,
    document.querySelector("body")
  );
};
