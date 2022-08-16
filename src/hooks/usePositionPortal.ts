import { useEffect, useState } from "react";

import { TPosition } from "@/components";

export const usePositionPortal = <T extends HTMLElement>(
  displayRef: React.MutableRefObject<T>,
  isPortal: boolean
) => {
  const [coords, setCoords] = useState<TPosition>({
    left: 0,
    top: 0,
    width: 0,
  });
  const setPositionList = () => {
    if (!displayRef.current || !isPortal) {
      return;
    }
    const rect = displayRef.current.getBoundingClientRect();
    let leftSide = rect.left;
    leftSide = Math.max(10, leftSide);
    leftSide = Math.min(leftSide, document.body.clientWidth - rect.width - 10);
    setCoords({
      top: window.innerHeight - rect.top,
      bottom: rect.bottom,
      left: leftSide,
      width: rect.right - rect.left,
      right: window.innerWidth - rect.right,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", setPositionList, true);
    window.addEventListener("resize", setPositionList, true);
    return () => {
      window.removeEventListener("scroll", setPositionList, true);
      window.removeEventListener("resize", setPositionList, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { setPositionList, coords };
};
