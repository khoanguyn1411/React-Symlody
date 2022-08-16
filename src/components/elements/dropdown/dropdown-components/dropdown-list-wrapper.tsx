import classNames from "classnames";
import { ReactNode } from "react";

import { AnimationCustom, TPosition } from "@/components";

import { AlignedPlacement } from "../../portal/type";
import { getPosition } from "../../portal/util";

type TProps = {
  isShowContent: boolean;
  children: ReactNode;
  refOfList?: React.Ref<HTMLDivElement>;
  placement?: AlignedPlacement;
  widthContainer?: string;
  isOverflow: boolean;
  coords: TPosition;
};

export const DropdownListWrapper: React.FC<TProps> = ({
  isShowContent,
  children,
  widthContainer = "320px",
  placement = "bottom-right",
  isOverflow,
  coords,
}) => {
  return (
    <AnimationCustom
      attrs={{ style: getPosition(placement, coords) }}
      isShowing={isShowContent}
      className={classNames(
        "fixed z-10 w-full min-w-max bg-white drop-shadow-lg border border-gray-200 rounded-md mt-2",
        {
          "overflow-auto": isOverflow,
        }
      )}
    >
      <ul style={{ width: widthContainer }}>{children}</ul>
    </AnimationCustom>
  );
};
