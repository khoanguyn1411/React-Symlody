import { memo, useCallback } from "react";

import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationMember, memberSelectors } from "@/features/reducers";

export const _MemberPagination: React.FC = () => {
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
  const handleResetPagination = useCallback(
    (limit: number) => {
      dispatch(
        getPaginationMember({
          memberList,
          page: 1,
          limit,
        })
      );
    },
    [dispatch, memberList]
  );
  const handleLimitChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationMember({
          memberList,
          page: 1,
          limit,
        })
      );
    },
    [dispatch, memberList]
  );

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
};

export const MemberPagination = memo(_MemberPagination);
