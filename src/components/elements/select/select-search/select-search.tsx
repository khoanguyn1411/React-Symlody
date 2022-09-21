import { memo, ReactNode, useEffect } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/types";

import { Input } from "../../input";
import { Portal } from "../../portal";
import { SelectDisplayWrapper, SelectListWrapper } from "../select-components";

type TSelectSearchProps = {
  placeholder?: string;
  inputValue: string;
  debounceValue: string;
  isShowContent: boolean;
  postNode?: ReactNode;
  setIsShowContent: (isShowContent: boolean) => void;
  setInputValue: (value: string) => void;
  onSearchChange: (value: string) => void;
};

const _SelectSearch: GlobalTypes.FCPropsWithChildren<TSelectSearchProps> = ({
  children,
  postNode,
  inputValue,
  debounceValue,
  isShowContent,
  placeholder,
  setIsShowContent,
  onSearchChange,
  setInputValue,
}) => {
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent(true);
  };
  const { position, setPositionList } = usePositionPortal<HTMLDivElement>({
    displayRef,
    isPortal: true,
    isShowing: isShowContent,
    placement: "bottom-left",
  });

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
            <div className="absolute top-0 bottom-0 left-0 flex items-center w-full ml-3">
              {postNode}
              <Input
                style="none"
                placeholder={placeholder}
                value={inputValue}
                onChange={setInputValue}
                className="ml-2"
              />
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
