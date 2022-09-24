import { memo } from "react";

import { GlobalTypes } from "@/types";

import { TableProvider, TPropsTable } from "./context";

const _TableContainerContent: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="h-table">
      <div className="border border-t-0 rounded-md">
        <div className="overflow-auto max-h-table rounded-md">
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

const _TableContainer: GlobalTypes.FCPropsWithChildren<TPropsTable> = ({
  children,
  ...props
}) => {
  return (
    <TableProvider {...props}>
      <TableContainerContent>{children}</TableContainerContent>
    </TableProvider>
  );
};

const TableContainerContent = memo(_TableContainerContent);
export const TableContainer = memo(_TableContainer);