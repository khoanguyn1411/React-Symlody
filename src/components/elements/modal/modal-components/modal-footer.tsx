import React, { memo } from "react";

import { Button } from "../../button";
import { TEventModal, TToggleModal } from "../types";

const _ModalFooter: React.FC<
  TEventModal & TToggleModal & { reset: () => void }
> = ({ isLoading, isDisable, title, reset, setToggle }) => {
  const handleSetHidden = () => {
    setToggle();
    reset && reset();
  };
  return (
    <div className="flex justify-end w-full px-5 py-4 border-t">
      <Button
        style="outline"
        className="min-w-[80px]"
        onClick={handleSetHidden}
      >
        Hủy
      </Button>
      <Button
        isShowLoading={isLoading}
        type="submit"
        disable={isDisable}
        className="ml-5 min-w-[80px]"
      >
        {title ?? "Tạo"}
      </Button>
    </div>
  );
};

export const ModalFooter = memo(_ModalFooter);
