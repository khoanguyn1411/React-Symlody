import classNames from "classnames";

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
  return (
    <th
      style={{ width: width }}
      onClick={handleSorting}
      className={classNames(
        "px-4 py-2 font-semibold",
        isSort && "cursor-pointer",
        "border-t border-b border-gray-200",
        { "rounded-tl-md": isFirst, "rounded-tr-md": isLast }
      )}
    >
      <div className="flex">
        <h1
          className={classNames("w-full min-w-max", TEXT_ALIGN_MAP[textAlign])}
        >
          {children}
        </h1>
        {isSort && (
          <button className="ml-3 cursor-pointer">
            <i className="fas fa-sort"></i>
          </button>
        )}
      </div>
    </th>
  );
};
