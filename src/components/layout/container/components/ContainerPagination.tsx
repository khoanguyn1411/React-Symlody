import React from "react";

import { StrictOmit } from "@/utils/types";

import { Pagination as AppPagination } from "../../../elements/pagination";
import { TPropsPagination } from "../../../elements/pagination/context";

type TProps = StrictOmit<TPropsPagination, "pageStep">;

export const Pagination: React.FC<TProps> = (props) => {
  if (!props.totalPages && !props.count) {
    return;
  }
  if (props.count === 0) {
    return;
  }

  return (
    <div className="flex justify-end w-full mt-5">
      <AppPagination
        {...props}
        quantityDisplay={[10, 20, 30, 40, 50]}
        pageStep={1}
      />
    </div>
  );
};
