import { TPosition } from "../tooltip";
import { AlignedPlacement, TLeftRight, TTopBottom } from "./type";

export const getPosition = (
  placement: AlignedPlacement,
  coords: TPosition,
  isPortal = true
): React.CSSProperties => {
  if (!isPortal) {
    return null;
  }
  const topBottom = placement.split("-")[0] as TTopBottom;
  const leftRight = placement.split("-")[1] as TLeftRight;
  return {
    top: coords && topBottom === "bottom" && coords.bottom,
    bottom: coords && topBottom === "top" && coords.top,
    left: coords && leftRight === "left" && coords.left,
    right: coords && leftRight === "right" && coords.right,
    width: coords && coords.width,
  };
};
