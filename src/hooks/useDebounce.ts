import { useEffect, useState } from "react";

type THookSearch = {
  debounceValue: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
};

const DEBOUNCE_TIME = 0;

/**
 * Add debounce time to input.
 * @param initialValue Initial value of input.
 */
export const useDebounce = (initialValue?: string): THookSearch => {
  const [inputValue, setInputValue] = useState<string>(initialValue ?? "");
  const [debounceValue, setDebounceValue] = useState<string>(inputValue);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(inputValue);
    }, DEBOUNCE_TIME);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return { debounceValue, inputValue, setInputValue };
};
