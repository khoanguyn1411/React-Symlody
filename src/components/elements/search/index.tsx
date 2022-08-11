import { Input } from "@/components";

type TProps = {
  inputValue: string;
  placeholder?: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * To use Search component, please provide inputValue and setInputValue props from
 * useSearch() hook.
 * @example
 * const propsSearch = useSearch();
 * <Search {...propsSearch} />
 */
export const Search: React.FC<TProps> = ({
  inputValue,
  placeholder,
  setInputValue,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative w-64 mr-5">
      <Input
        className="h-10"
        style="default"
        onValueChange={handleChangeValue}
        placeholder={placeholder}
        value={inputValue}
      />
      <span className="absolute top-0 bottom-0 flex items-center text-sm text-black cursor-pointer right-3">
        <i className="far fa-search" />
      </span>
    </div>
  );
};
