import { useEffect } from "react";

export const useHideOnClickOutside = (
  isShowContent: boolean,
  setIsShowContent: (isShowContent: boolean) => void,
  listRef: React.MutableRefObject<Element>,
  displayRef: React.MutableRefObject<Element>
) => {
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
};
