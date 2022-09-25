import { useCallback } from "react";

import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationMember, memberSelectors } from "@/features/reducers";

export const MemberPagination = () => {
  const dispatch = useAppDispatch();

  const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberList = useAppSelector(memberSelectors.selectAll);

  const handlePaginationChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationMember({
          memberList,
          page,
          limit,
        })
      );
    },
    [dispatch, memberList]
  );

  const handleResetPagination = (limit: number) => {
    dispatch(
      getPaginationMember({
        memberList,
        page: 1,
        limit,
      })
    );
  };

  const handleLimitChange = (page: number, limit: number) => {
    dispatch(
      getPaginationMember({
        memberList,
        page: 1,
        limit,
      })
    );
  };

  if (memberCount > 0) {
    return (
      <Container.Pagination
        count={memberCount}
        onResetPagination={{
          changeListener: [memberList],
          callback: handleResetPagination,
        }}
        onLimitChange={handleLimitChange}
        onPaginationChange={handlePaginationChange}
      />
    );
  }
};
