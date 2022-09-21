import classNames from "classnames";
import { memo, useEffect } from "react";

import { Tooltip } from "@/components/elements/tooltip";
import { GlobalTypes } from "@/types";

import { TEXT_ALIGN_MAP } from "../../type";
import { TOrdering, useTableContext } from "../table-container/context";
type TProps = {
  textAlign?: keyof typeof TEXT_ALIGN_MAP;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isSort?: boolean;
  keySorting?: string;
  onSort?: (ordering: TOrdering) => void;
};
const _TableCellHead: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  textAlign = "left",
  width = "auto",
  isFirst = false,
  isLast = false,
  isSort = false,
  keySorting,
  onSort,
}) => {
  const { currentSort, currentOrdering, setCurrentSort, setCurrentOrdering } =
    useTableContext();
  const handleSorting = () => {
    if (!isSort) {
      return;
    }
    if (currentSort === keySorting) {
      if (currentOrdering === "asc") {
        setCurrentOrdering("des");
      }
      if (currentOrdering === "des") {
        setCurrentOrdering(null);
      }
      if (currentOrdering == null) {
        setCurrentOrdering("asc");
      }
    } else {
      setCurrentSort(keySorting);
      setCurrentOrdering("asc");
    }
  };

  useEffect(() => {
    if (!isSort) {
      return;
    }
    if (keySorting === currentSort) {
      onSort && onSort(currentOrdering);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrdering, currentSort]);

  const props = {
    style: { width: width },
    onClick: handleSorting,
  };

  const getTooltipText = () => {
    if (keySorting !== currentSort) {
      return "sắp xếp tăng dần";
    }
    switch (currentOrdering) {
      case "asc":
        return "sắp xếp giảm dần";
      case "des":
        return "hủy sắp xếp";
      case undefined || null:
        return "sắp xếp tăng dần";
    }
  };

  const CellHeadContent = (
    <div className="flex">
      <h1 className={classNames("min-w-max", TEXT_ALIGN_MAP[textAlign])}>
        {children}
      </h1>
      {isSort && (
        <div className="flex flex-col mt-1 ml-3 text-gray-400">
          <i
            className={classNames(
              "h-[1px] fas fa-sort-up",
              keySorting === currentSort &&
                currentOrdering === "asc" &&
                "text-primary-800"
            )}
          ></i>
          <i
            className={classNames(
              "h-[1px] fas fa-sort-down",
              keySorting === currentSort &&
                currentOrdering === "des" &&
                "text-primary-800"
            )}
          ></i>
        </div>
      )}
    </div>
  );

  if (!isSort) {
    return (
      <th
        {...props}
        className={classNames(
          "px-4 py-2 font-semibold w-full",
          "border-t border-b border-gray-200",
          { "rounded-tl-md": isFirst, "rounded-tr-md": isLast }
        )}
      >
        {CellHeadContent}
      </th>
    );
  }

  return (
    <th
      className={classNames("border-t border-b", {
        "rounded-tl-md": isFirst,
        "rounded-tr-md": isLast,
      })}
      {...props}
    >
      <Tooltip
        className={classNames(
          "cursor-pointer",
          "px-4 py-2 font-semibold w-full"
        )}
        content={`Bấm để ${getTooltipText()}`}
      >
        {CellHeadContent}
      </Tooltip>
    </th>
  );
};

export const TableCellHead = memo(_TableCellHead);
