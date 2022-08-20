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
};
export const TableCell: React.FC<TProps> = ({
  children,
  textAlign = "left",
  width = "auto",
  isSkeleton = false,
  isFirst = false,
  isLast = false,
}) => {
  return (
    <td
      style={{ width: width }}
      className={classNames("font-normal py-2", TEXT_ALIGN_MAP[textAlign], {
        "px-2.5": !isSkeleton,
        "px-1": isSkeleton,
        "pl-2": isFirst,
        "pr-2": isLast,
      })}
    >
      {children}
    </td>
  );
};
