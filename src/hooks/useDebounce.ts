import { useEffect, useState } from "react";

type THookSearch = {
  debounceValue: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
};

export const useDebounce = (initialValue?: string): THookSearch => {
  const [inputValue, setInputValue] = useState<string>(initialValue ?? "");
  const [debounceValue, setDebounceValue] = useState<string>(inputValue);
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
