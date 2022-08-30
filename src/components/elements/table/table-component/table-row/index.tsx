import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  isSkeleton?: boolean;
};

export const TableRow: React.FC<TProps> = ({
  children,
  isSkeleton = false,
}) => {
  return (
    <tr className={classNames(isSkeleton && "animate-skeleton")}>{children}</tr>
  );
};
