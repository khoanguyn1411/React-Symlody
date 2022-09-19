import { Input } from "@/components";

type TProps = {
  inputValue: string;
  placeholder?: string;
  isShowSearchIcon?: boolean;
  setInputValue: (inputValue: string) => void;
};

/**
 * To use Search component, please provide inputValue and setInputValue props from
 * useDebounce() hook.
 * @example
 * const propsSearch = useDebounce();
 * <Search {...propsSearch} />
 */
export const Search: React.FC<TProps> = ({
  inputValue,
  placeholder,
  isShowSearchIcon = true,
  setInputValue,
}) => {
  return (
    <div className="relative w-64">
      <Input
        type={"search"}
        className="h-10 pr-8"
        style="default"
        onChange={setInputValue}
        placeholder={placeholder}
        value={inputValue}
      />
      {isShowSearchIcon && (
        <span className="absolute top-0 bottom-0 flex  items-center text-sm text-gray-400 cursor-pointer right-3">
          <i className="far fa-search" />
        </span>
      )}
    </div>
  );
};
