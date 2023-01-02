import { ReactNode, useEffect, useState } from "react";

import { useDebounce } from "@/hooks";
import { AppReact, Primitive, StrictOmit } from "@/utils/types";

import { Button, Input } from "../..";
import { Select, TPropsSelect } from "..";
import { Option } from "../type";
interface Props<T, E extends Primitive>
  extends StrictOmit<TPropsSelect<T, E>, "children"> {
  children?: (InputComponent: JSX.Element) => ReactNode;
  searchPlaceholder?: string;
  onSearchChange?: (
    inputValue: string,
    setCurrentList: AppReact.State.Dispatch<Option<T, E>[]>
  ) => void;
  onOptionChange?: (
    option: Option<T, E>,
    setInputValue: AppReact.State.Dispatch<string>
  ) => void;
}

export function SelectSearch<T, E extends Primitive>({
  searchPlaceholder,
  onSearchChange,
  onOptionChange,
  children,
  ...props
}: Props<T, E>): JSX.Element {
  const { inputValue, debounceValue, setInputValue } = useDebounce(
    props.value ? props.value.toString() : ""
  );
  const [currentList, setCurrentList] = useState<Option<T, E>[]>(props.list);

  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const isShowClearSearch = inputValue !== "";
  const handleClearSelectedEntity = () => {
    props.onChange?.("");
    setInputValue("");
  };

  const handleSearchValueChange = (value: string): void => {
    setIsShowContent(true);
    setInputValue(value);
    setIsSearching(true);
  };

  const handleOnChangeSideEffect = (option: Option<T, E>): void => {
    onOptionChange?.(option, setInputValue);
    props.onChangeSideEffect?.(option);
  };

  const handleOnListHide = (option: Option<T, E> | Option<T, E>[]) => {
    if (Array.isArray(option)) {
      return;
    }
    onOptionChange?.(option, setInputValue);
    props.onListHide?.(option);
  };

  const InputComponent: JSX.Element = (
    <>
      <Input
        style="none"
        placeholder={searchPlaceholder}
        value={inputValue}
        onChange={handleSearchValueChange}
        className="w-full"
      />
      {isShowClearSearch && (
        <Button isIconOnly style="none" onClick={handleClearSelectedEntity}>
          <i className="text-gray-400 fas fa-times" />
        </Button>
      )}
    </>
  );

  useEffect(() => {
    if (!isSearching) {
      return;
    }
    onSearchChange?.(debounceValue, setCurrentList);
    if (!inputValue) {
      setCurrentList(props.list);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    if (!isShowContent && props.value) {
      setIsSearching(false);
    }
    if (!isShowContent && !props.value) {
      setInputValue("");
      setIsSearching(false);
    }
    if (isShowContent && !isSearching) {
      setCurrentList(props.list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);

  return (
    <Select
      {...props}
      list={currentList}
      onChangeSideEffect={handleOnChangeSideEffect}
      onListHide={handleOnListHide}
      renderEmptyListPlaceholder={
        props.renderEmptyListPlaceholder ?? (
          <span className="p-2">Không có dữ liệu</span>
        )
      }
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
      isNonePadding
    >
      <div className="relative w-full">
        <div className="absolute top-0 bottom-0 left-0 flex items-center w-full px-3">
          {children && children(InputComponent)}
          {!children && InputComponent}
        </div>
        <div className="h-10 bg-gray-100 rounded-md" />
      </div>
    </Select>
  );
}
