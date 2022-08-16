import { useEffect, useState } from "react";

type THookSearch = {
  /** Value after debounce. */
  debounceValue: string;
  /** State of input value. */
  inputValue: string;
  /** Set state function for input value. */
  setInputValue: (inputValue: string) => void;
};

export const useSearch = (): THookSearch => {
  const [inputValue, setInputValue] = useState<string>("");
  const [debounceValue, setDebounceValue] = useState<string>("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 400);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);
  return { debounceValue, inputValue, setInputValue };
};
