import { memo, useState } from "react";

import { useDebounce, useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/types";

import { Input } from "../../input";
import { Portal } from "../../portal";
import { SelectDisplayWrapper, SelectListWrapper } from "../select-components";

type TSelectSearchProps = {
  placeholder?: string;
};

const _SelectSearch: GlobalTypes.FCPropsWithChildren<TSelectSearchProps> = ({
  placeholder = "test",
  children,
}) => {
  const { inputValue, setInputValue } = useDebounce();
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent((prev) => !prev);
  };
  const { position, setPositionList } = usePositionPortal<HTMLDivElement>({
    displayRef,
    isPortal: true,
    isShowing: isShowContent,
    placement: "bottom-left",
  });

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
        <Input
          placeholder={placeholder}
          style="modal"
          value={inputValue}
          onChange={setInputValue}
        />
      </SelectDisplayWrapper>
      <Portal>{ListComponent}</Portal>
    </div>
  );
};

export const SelectSearch = memo(_SelectSearch);
