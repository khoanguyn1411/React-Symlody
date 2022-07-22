import { useState } from "react";

export const useModal = () => {
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
