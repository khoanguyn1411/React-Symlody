import React from "react";

import { Button } from "../../button";
import { TEventModal, TToggleModal } from "../types";

export const ModalFooter: React.FC<TEventModal & TToggleModal> = ({
  isLoading,
  isDisable,
  title,
  setToggle,
}) => {
  const handleSetHidden = () => {
    setToggle();
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
