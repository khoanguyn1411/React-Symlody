import { useEffect, useRef } from "react";

type THookHideOnClickOutside = {
  listRef: React.MutableRefObject<HTMLUListElement & HTMLDivElement>;
  displayRef: React.MutableRefObject<HTMLDivElement>;
};

export const useHideOnClickOutside = (
  isShowContent: boolean,
  setIsShowContent: (isShowContent: boolean) => void
): THookHideOnClickOutside => {
  const listRef = useRef<HTMLUListElement & HTMLDivElement>();
  const displayRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const elementList = listRef?.current;
    const elementDisplay = displayRef?.current;
    if (!elementList || !elementDisplay) {
      return;
    }
    const handleCloseListDiv = (event: Event) => {
      if (
        !elementList.contains(event.target as Node) &&
        !elementDisplay.contains(event.target as Node)
      ) {
        setIsShowContent(false);
      }
    };
    window.addEventListener("click", handleCloseListDiv, true);
    return () => {
      window.removeEventListener("click", handleCloseListDiv, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);
  return { listRef, displayRef };
};
