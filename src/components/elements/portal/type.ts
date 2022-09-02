export type TLeftRight = "left" | "right" | "center";
export type TTopBottom = "top" | "bottom";
export type AlignedPlacement = `${TTopBottom}-${TLeftRight}`;

export type TPosition = {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  width?: number;
};
