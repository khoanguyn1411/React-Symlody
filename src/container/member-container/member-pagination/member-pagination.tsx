import { useCallback } from "react";

import { Container } from "@/components";
import { APP_CONSTANTS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationMember, memberSelectors } from "@/features/reducers";

export const MemberPagination = () => {
  const dispatch = useAppDispatch();

  const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberList = useAppSelector(memberSelectors.selectAll);

  const handlePaginationChange = useCallback(
    (page: number) => {
      dispatch(
        getPaginationMember({
          memberList,
          page: page,
          limit: APP_CONSTANTS.DEFAULT_PAGINATION_LIMIT,
        })
      );
    },
    [dispatch, memberList]
  );

  const handleResetPagination = () => {
    dispatch(
      getPaginationMember({
        memberList,
        page: 1,
        limit: APP_CONSTANTS.DEFAULT_PAGINATION_LIMIT,
      })
    );
  };

  if (memberCount > 0) {
    return (
      <Container.Pagination
        count={memberCount}
        limit={APP_CONSTANTS.DEFAULT_PAGINATION_LIMIT}
        onResetPagination={{
          changeListener: [memberList],
          callback: handleResetPagination,
        }}
        onPaginationChange={handlePaginationChange}
      />
    );
  }
};
