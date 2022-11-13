import { ReactNode, useEffect } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/utils";

import { Button } from "../../button";
import { Input } from "../../input";
import { Portal } from "../../portal";
import { SelectDisplayWrapper, SelectListWrapper } from "../select-components";

type TSelectSearchProps = {
  placeholder?: string;
  inputValue: string;
  debounceValue: string;
  isShowContent: boolean;
  postNode?: ReactNode;
  isSearching: boolean;
  isShowClearSearch?: boolean;
  setIsShowContent: (isShowContent: boolean) => void;
  setInputValue: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearSearch?: () => void;
};

export const SelectSearch: GlobalTypes.FCPropsWithChildren<
  TSelectSearchProps
> = ({
  children,
  postNode,
  inputValue,
  debounceValue,
  isSearching,
  isShowContent,
  placeholder,
  isShowClearSearch,
  setIsShowContent,
  onSearchChange,
  setInputValue,
  onClearSearch,
}) => {
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { position, setPositionList } = usePositionPortal<HTMLDivElement>({
    displayRef,
    isPortal: true,
    isShowing: isShowContent,
    placement: "bottom-left",
  });

  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent(true);
  };

  const handleClearMember = () => {
    setInputValue("");
    onClearSearch?.();
  };

  useEffect(() => {
    if (isSearching) {
      onSearchChange(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const ListComponent = (
    <ul ref={listRef}>
      <SelectListWrapper
        isPortal={true}
        position={position}
        isShowContent={isShowContent}
        style={"modal"}
      >
        {children}
      </SelectListWrapper>
    </ul>
  );

  return (
    <div>
      <SelectDisplayWrapper
        isNonePadding
        ref={displayRef}
        onClick={handleToggleContent}
      >
        <div className="relative w-full">
          {postNode && (
            <div className="absolute top-0 bottom-0 left-0 flex items-center w-full px-3">
              {postNode}
              <Input
                style="none"
                placeholder={placeholder}
                value={inputValue}
                onChange={setInputValue}
                className="flex-1 ml-2 box-border"
              />
              {isShowClearSearch && (
                <Button isIconOnly style="none" onClick={handleClearMember}>
                  <i className="text-gray-400 fas fa-times" />
                </Button>
              )}
            </div>
          )}
          <div className="h-10 bg-gray-100 rounded-md" />
        </div>
      </SelectDisplayWrapper>
      <Portal>{ListComponent}</Portal>
    </div>
  );
};
