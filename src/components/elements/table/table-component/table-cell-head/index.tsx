import classNames from "classnames";
import React, { ReactNode } from "react";

import { TEXT_ALIGN_MAP } from "../../type";
type TProps = {
  children?: ReactNode;
  textAlign?: keyof typeof TEXT_ALIGN_MAP;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
};
export const TableCellHead: React.FC<TProps> = ({
  children,
  textAlign = "left",
  width = "auto",
  isFirst = false,
  isLast = false,
}) => {
  return (
    <th
      style={{ width: width }}
      className={classNames(
        "px-4 py-2 font-semibold",
        "border-t border-b border-gray-200",
        TEXT_ALIGN_MAP[textAlign],
        { "rounded-tl-md": isFirst, "rounded-tr-md": isLast }
      )}
    >
      {children}
    </th>
  );
};
