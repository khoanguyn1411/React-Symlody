import classNames from "classnames";

import { GlobalTypes } from "@/global";

type TProps = {
  isSkeleton?: boolean;
};

export const TableRow: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isSkeleton = false,
}) => {
  return (
    <tr className={classNames(isSkeleton && "animate-skeleton")}>{children}</tr>
  );
};
