import { useState } from "react";

export type THookModalProps<T> = {
  isShowing: boolean;
  data: T | undefined;
  setData: (data: T) => void;
  setShow: () => void;
  setHidden: () => void;
  setToggle: () => void;
};

/**
 * If you need to pass data to modal from an component, please use "setData" prop
 * and receive value by "data" prop. To use "data" and "setData" props, please provide the interface or type of the data
 * you need to pass and receive.
 */
export function useModal<T = undefined>(): THookModalProps<T> {
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
    isShowing,
    setData,
    setShow,
    setHidden,
    setToggle,
  };
}
