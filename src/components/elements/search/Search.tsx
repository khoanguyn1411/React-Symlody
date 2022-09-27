import { Button } from "../button";
import { Input } from "../input";

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
  const handleClearSearch = () => {
    setInputValue("");
  };

  return (
    <div className="relative w-64">
      <Input
        className="h-10 pr-12"
        style="default"
        otherProps={{ role: "searchbox" }}
        onChange={setInputValue}
        placeholder={placeholder}
        value={inputValue}
      />
      {isShowSearchIcon && (
        <div className="absolute top-0 bottom-0 flex items-center text-sm text-gray-400 right-3">
          {inputValue && (
            <Button
              isIconOnly
              onClick={handleClearSearch}
              style="none"
              className="mr-2 hover:text-primary-800 transition-colors duration-150"
            >
              <i className="text-base far fa-times" />
            </Button>
          )}
          <i className="cursor-pointer far fa-search" />
        </div>
      )}
    </div>
  );
};
