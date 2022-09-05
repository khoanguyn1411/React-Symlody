import classNames from "classnames";

import { GlobalTypes } from "@/global";

import { TEXT_ALIGN_MAP } from "../../type";
import { useTableRowContext } from "../table-row/context";
type TProps = {
  textAlign?: keyof typeof TEXT_ALIGN_MAP;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
  keySorting?: string;
};
export const TableCell: GlobalTypes.FCPropsWithChildren<TProps> = ({
  textAlign = "left",
  width = "auto",
  children,
  isFirst = false,
  isLast = false,
}) => {
  const { index, isSkeleton } = useTableRowContext();

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
