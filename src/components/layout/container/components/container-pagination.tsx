import React, { memo } from "react";

import { Pagination as AppPagination } from "@/components";
import { TPropsPagination } from "@/components/elements/pagination/context";
import { GlobalTypes } from "@/types";

type TProps = GlobalTypes.StrictOmit<TPropsPagination, "pageStep">;

export const _Pagination: React.FC<TProps> = (props) => {
  return (
    <div className="flex justify-end w-full mt-5">
      <AppPagination {...props} quantityDisplay={["5", "7", "9"]} />
    </div>
  );
};

export const Pagination = memo(_Pagination);
