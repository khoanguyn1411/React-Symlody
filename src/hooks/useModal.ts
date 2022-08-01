import { useState } from "react";

export type TModalProps<T> = {
  isShowing: boolean;
  data: T | undefined;
  setData: (data: T) => void;
  setShow: () => void;
  setHidden: () => void;
  setToggle: () => void;
};

export function useModal<T = undefined>(): TModalProps<T> {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [data, setDataState] = useState<T>();

  function setData(data: T) {
    if (typeof data === undefined) {
      throw new Error("To use this function, please implement type for hook.");
    }
    setDataState(data);
  }

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
    data,
    setData,
    isShowing,
    setShow,
    setHidden,
    setToggle,
  };
}
