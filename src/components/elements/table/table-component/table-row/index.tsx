import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  isSkeleton?: boolean;
  isBorderTop?: boolean;
};

export const TableRow: React.FC<TProps> = ({
  children,
  isSkeleton = false,
  isBorderTop = true,
}) => {
  return (
    <tr
      className={classNames(
        "border-t border-gray-200",
        isSkeleton && "animate-skeleton",
        !isBorderTop && "border-none"
      )}
    >
      {children}
    </tr>
  );
};
