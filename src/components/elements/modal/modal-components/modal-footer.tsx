import React from "react";

import { Button } from "../../button";
import { TEventModal, TToggleModal } from "../types";

export const ModalFooter: React.FC<
  TEventModal & TToggleModal & { reset: () => void }
> = ({ isLoading, isDisable, title, reset, setToggle }) => {
  const handleSetHidden = () => {
    setToggle();
    reset && reset();
  };
  return (
    <div className="flex justify-end w-full px-5 py-4 border-t">
      <Button style="outline" onClick={handleSetHidden}>
        Hủy
      </Button>
      <Button
        isShowLoading={{ active: isLoading }}
        type={isDisable ? "button" : "submit"}
        style={isDisable ? "disable" : "default"}
        className="ml-5"
      >
        {title ?? "Tạo"}
      </Button>
    </div>
  );
};
