import classNames from "classnames";
import React, { ReactNode } from "react";
type TProps = {
  children: ReactNode;
  isSkeleton?: boolean;
};
export const TableBody: React.FC<TProps> = ({
  children,
  isSkeleton = false,
}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={7}>
          <div
            className={classNames(
              !isSkeleton && "overflow-y-scroll max-h-table"
            )}
          >
            <table className="w-full">{children}</table>
          </div>
        </td>
      </tr>
    </tbody>
  );
};
