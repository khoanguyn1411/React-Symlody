import { useState } from "react";

export type TModalProps = {
  isShowing: boolean;
  setShow: () => void;
  setHidden: () => void;
  setToggle: () => void;
};

export const useModal = (): TModalProps => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  function setShow() {
    setIsShowing(true);
  }

  function setHidden() {
    setIsShowing(false);
  }

  function setToggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    setShow,
    setHidden,
    setToggle,
  };
};
