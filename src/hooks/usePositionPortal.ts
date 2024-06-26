import React, { useEffect, useState } from "react";

import { AlignedPlacement, TPosition } from "@/components/elements/portal/type";
import { RecordObject } from "@/utils/types";

type THookPositionPortal = {
  coords: TPosition;
  position: React.CSSProperties;
  setPositionList: () => void;
};

type TProps<T> = {
  displayRef: React.MutableRefObject<T>;
  isPortal: boolean;
  placement: AlignedPlacement;
  isShowing: boolean;
  toggleRef?: React.MutableRefObject<HTMLDivElement | HTMLUListElement>;
  space?: number;
  listItemQuantity?: number;
  spaceAdditionalTop?: number;
};

export const usePositionPortal = <T extends HTMLElement>({
  displayRef,
  isPortal,
  placement,
  toggleRef,
  isShowing,
  spaceAdditionalTop = 0,
  space = 0,
}: TProps<T>): THookPositionPortal => {
  const [coords, setCoords] = useState<TPosition>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const setPositionList = (): void => {
    if (!isPortal) {
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
    const position = {
      top: {
        bottom: window.innerHeight - coords.top + space + spaceAdditionalTop,
      },
      bottom: {
        top: coords.bottom + space,
      },
      left: {
        left: coords.left,
      },
      right: {
        right: document.body.offsetWidth - coords.right,
      },
      center: {
        left:
          displayRef && displayRef.current && toggleRef && toggleRef.current
            ? coords.left +
              displayRef?.current.offsetWidth / 2 -
              toggleRef?.current.offsetWidth / 2
            : 0,
      },
    };
    const positionExtracted = getPositionFromPlacement(coords, position);
    if (toggleRef && toggleRef.current) {
      const listHeight = toggleRef.current.clientHeight;
      const bottomPositionToggleRef = coords.bottom + listHeight + 10;
      if (bottomPositionToggleRef > window.innerHeight) {
        const splittedPosition = placement.split("-");
        const bottomTop = splittedPosition[0];
        const leftRight = splittedPosition[1];
        if (bottomTop === "bottom") {
          const newPlacement = `top-${leftRight}` as AlignedPlacement;
          return positionExtracted.get(newPlacement);
        }
        return;
      }
    }

    return positionExtracted.get(placement);
  };

  useEffect(() => {
    if (isShowing) {
      window.addEventListener("scroll", setPositionList, true);
      window.addEventListener("resize", setPositionList, true);
      return () => {
        window.removeEventListener("scroll", setPositionList, true);
        window.removeEventListener("resize", setPositionList, true);
      };
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coords, position: getPosition(), setPositionList };
};

function getPositionFromPlacement<T extends RecordObject>(
  coords: TPosition,
  position: T
) {
  return {
    get(placement: AlignedPlacement) {
      switch (placement) {
        case "top-left":
          return {
            width: coords.right - coords.left,
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
    },
  };
}
