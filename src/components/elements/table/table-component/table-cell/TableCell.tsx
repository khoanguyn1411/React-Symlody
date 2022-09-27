import classNames from "classnames";
import { memo } from "react";

import { GlobalTypes } from "@/utils";

import { TEXT_ALIGN_MAP } from "../../type";
import { useTableRowContext } from "../table-row/context";
type TProps = {
  textAlign?: keyof typeof TEXT_ALIGN_MAP;
  colSpans?: number;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
  keySorting?: string;
};
const _TableCell: GlobalTypes.FCPropsWithChildren<TProps> = ({
  textAlign = "left",
  width = "auto",
  children,
  colSpans,
  isFirst = false,
  isLast = false,
}) => {
  const { index, isSkeleton } = useTableRowContext();

  return (
    <td
      colSpan={colSpans}
      style={{ width: width }}
      className={classNames(
        "font-normal py-2 border-t border-gray-200",
        TEXT_ALIGN_MAP[textAlign],
        {
          "px-4": !isSkeleton,
          "border-none": index === 0,
          "px-1.5": isSkeleton,
          "pl-3": isFirst && isSkeleton,
          "pr-3": isLast && isSkeleton,
        }
      )}
    >
      {children}
    </td>
  );
};

export const TableCell = memo(_TableCell);
