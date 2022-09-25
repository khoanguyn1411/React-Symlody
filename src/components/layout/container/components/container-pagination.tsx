import React, { memo, useCallback } from "react";

import { Pagination as AppPagination } from "@/components";
import { TPropsPagination } from "@/components/elements/pagination/context";
import { useAppDispatch, useAppSelector } from "@/features";
import { setPaginationLimit } from "@/features/reducers";
import { GlobalTypes } from "@/types";

type TProps = GlobalTypes.StrictOmit<TPropsPagination, "pageStep">;

export const _Pagination: React.FC<TProps> = (props) => {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state) => state.common);

  const onLimitChange = useCallback(
    (page: number, limit: number) => {
      dispatch(setPaginationLimit(limit));
      props.onLimitChange?.(page, limit);
    },
    [dispatch, props]
  );

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
        defaultLimit={common.paginationLimit}
        quantityDisplay={["1", "7", "9"]}
        pageStep={1}
      />
    </div>
  );
};

export const Pagination = memo(_Pagination);
