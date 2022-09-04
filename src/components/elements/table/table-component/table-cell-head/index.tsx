import classNames from "classnames";

import { Tooltip } from "@/components/elements/tooltip";
import { GlobalTypes } from "@/global";

import { TEXT_ALIGN_MAP } from "../../type";
type TProps = {
  textAlign?: keyof typeof TEXT_ALIGN_MAP;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isSort?: boolean;
  onSort?: () => void;
};
export const TableCellHead: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  textAlign = "left",
  width = "auto",
  isFirst = false,
  isLast = false,
  isSort = false,
  onSort,
}) => {
  const handleSorting = () => {
    onSort && onSort();
  };

  const CellHeadContent = (
    <th
      style={{ width: width }}
      onClick={handleSorting}
      className={classNames(
        "px-4 py-2 font-semibold w-full",
        "border-t border-b border-gray-200",
        { "rounded-tl-md": isFirst, "rounded-tr-md": isLast }
      )}
    >
      <div className="flex">
        <h1 className={classNames("min-w-max", TEXT_ALIGN_MAP[textAlign])}>
          {children}
        </h1>
        {isSort && (
          <span className="ml-3">
            <i className="fas fa-sort"></i>
          </span>
        )}
      </div>
    </th>
  );

  if (!isSort) {
    return CellHeadContent;
  }

  return (
    <Tooltip
      className="table-cell cursor-pointer hover:bg-primary-100 transition-colors duration-300"
      content={"Bấm vào để sắp xếp"}
    >
      {CellHeadContent}
    </Tooltip>
  );
};
