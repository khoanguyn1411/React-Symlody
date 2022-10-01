import React from "react";

import { GlobalTypes } from "@/utils";

import { Pagination as AppPagination } from "../../../elements/pagination";
import { TPropsPagination } from "../../../elements/pagination/context";

type TProps = GlobalTypes.StrictOmit<TPropsPagination, "pageStep">;

export const Pagination: React.FC<TProps> = (props) => {
  const onLimitChange = (page: number, limit: number) => {
    props.onLimitChange?.(page, limit);
  };

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
        onLimitChange={onLimitChange}
        quantityDisplay={["1", "10", "20", "30", "40", "50"]}
        pageStep={1}
      />
    </div>
  );
};