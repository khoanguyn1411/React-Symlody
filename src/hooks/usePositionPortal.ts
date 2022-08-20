import React, { useEffect, useState } from "react";

import { TPosition } from "@/components";
import { AlignedPlacement } from "@/components/elements/portal/type";

type THookPositionPortal = {
  coords: TPosition;
  position: React.CSSProperties;
  setPositionList: () => void;
};

type TProps<T> = {
  displayRef: React.MutableRefObject<T>;
  isPortal: boolean;
  placement: AlignedPlacement;
  toggleRef?: React.MutableRefObject<HTMLDivElement>;
  space?: number;
};

export const usePositionPortal = <T extends HTMLElement>({
  displayRef,
  isPortal,
  placement,
  toggleRef,
  space = 0,
}: TProps<T>): THookPositionPortal => {
  const [coords, setCoords] = useState<TPosition>({ top: 0, left: 0 });

  const setPositionList = () => {
    if (!displayRef || !displayRef.current || !isPortal) {
      return;
    }
    const rect = displayRef.current.getBoundingClientRect();
    let leftSide = rect.left;
    leftSide = Math.max(10, leftSide);
    leftSide = Math.min(leftSide, document.body.clientWidth - rect.width - 10);
    setCoords({
      top: rect.top,
      left: leftSide,
      right: rect.right,
      bottom: rect.bottom,
    });
  };

  const getPosition = (): React.CSSProperties => {
    if (!isPortal || !coords) {
      return;
    }

    if (placement === "top-center" || placement === "bottom-center") {
      if (!toggleRef || !displayRef) {
        throw new Error("There is no toggleRef");
      }
    }

    const position = {
      top: {
        bottom: window.innerHeight - coords.top - window.scrollY + space,
      },
      bottom: {
        top: coords.bottom - window.scrollY + space,
      },
      left: {
        left: coords.left - window.scrollX,
      },
      right: {
        right: window.innerWidth - coords.right - window.scrollX,
      },
      center: {
        left:
          displayRef && displayRef.current
            ? coords.left +
              displayRef?.current.offsetWidth / 2 -
              toggleRef?.current.offsetWidth / 2 -
              7
            : 0,
      },
    };

    switch (placement) {
      case "top-left":
        return {
          ...position.top,
          ...position.left,
        };
      case "top-right":
        return {
          ...position.top,
          ...position.right,
        };
      case "bottom-right":
        return {
          ...position.bottom,
          ...position.right,
        };
      case "bottom-left":
        return {
          width: coords.right - coords.left,
          ...position.bottom,
          ...position.left,
        };
      case "top-center":
        return {
          ...position.top,
          ...position.center,
        };
      case "bottom-center":
        return {
          ...position.bottom,
          ...position.center,
        };
      default: {
        return {
          ...position.top,
          ...position.left,
        };
      }
    }
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

  return { coords, position: getPosition(), setPositionList };
};
