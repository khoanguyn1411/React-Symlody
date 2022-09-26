import { memo, ReactNode, useEffect } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/types";

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
  isShowClearSearch?: boolean;
  setIsShowContent: (isShowContent: boolean) => void;
  setInputValue: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearSearch?: () => void;
};

const _SelectSearch: GlobalTypes.FCPropsWithChildren<TSelectSearchProps> = ({
  children,
  postNode,
  inputValue,
  debounceValue,
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
    onSearchChange(inputValue);
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
                  <i className="fas fa-times" />
                </Button>
              )}
            </div>
          )}
          <div className="bg-gray-100 h-11 rounded-md" />
        </div>
      </SelectDisplayWrapper>
      <Portal>{ListComponent}</Portal>
    </div>
  );
};

export const SelectSearch = memo(_SelectSearch);
