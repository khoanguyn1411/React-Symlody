import classNames from "classnames";

import { GlobalTypes } from "@/utils";

import { TableProvider, TPropsTable, useTableContext } from "./context";

export const TableContainerContent: GlobalTypes.FCChildren = ({ children }) => {
  const { isFullHeight } = useTableContext();
  return (
    <div
      className={classNames({
        "h-table": !isFullHeight,
        "h-[calc(100vh_-_160px)]": isFullHeight,
      })}
    >
      <div className="border border-t-0 rounded-md">
        <div
          className={classNames("overflow-auto rounded-md", {
            "max-h-table": !isFullHeight,
            "max-h-[calc(100vh_-_160px)]": isFullHeight,
          })}
        >
          <div className="bg-white border-gray-200 rounded-t-lg rounded-md">
            <table className="w-full border-separate border-spacing-0">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TableContainer: GlobalTypes.FCPropsWithChildren<TPropsTable> = ({
  children,
  ...props
}) => {
  return (
    <TableProvider {...props}>
      <TableContainerContent>{children}</TableContainerContent>
    </TableProvider>
  );
};
