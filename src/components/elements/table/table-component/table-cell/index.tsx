import classNames from "classnames";
import React, { ReactNode } from "react";

import { TEXT_ALIGN_MAP } from "../../type";
type TProps = {
  children: ReactNode;
  textAlign?: keyof typeof TEXT_ALIGN_MAP;
  width?: string;
  isSkeleton?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  index?: number;
};
export const TableCell: React.FC<TProps> = ({
  children,
  textAlign = "left",
  width = "auto",
  isSkeleton = false,
  isFirst = false,
  isLast = false,
  index,
}) => {
  return (
    <td
      style={{ width: width }}
      className={classNames(
        "font-normal py-2 border-t border-gray-200",
        TEXT_ALIGN_MAP[textAlign],
        {
          "px-4": !isSkeleton,
          "border-none": index === 0,
          "px-1": isSkeleton,
          "pl-2": isFirst,
          "pr-2": isLast,
        }
      )}
    >
      {children}
    </td>
  );
};
