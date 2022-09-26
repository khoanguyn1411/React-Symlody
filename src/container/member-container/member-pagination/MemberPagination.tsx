import { memo, useCallback } from "react";

import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationMember } from "@/features/reducers";

export const _MemberPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const memberStore = useAppSelector((state) => state.member);

  // TO_UPDATE: When BE release pagination, change it to the original memberCount:
  // const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberCount = memberStore.currentMemberList.length;

  const handlePaginationChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationMember({
          page,
          limit,
        })
      );
    },
    [dispatch]
  );
  const handleResetPagination = useCallback(
    (limit: number) => {
      dispatch(
        getPaginationMember({
          page: 1,
          limit,
        })
      );
    },
    [dispatch]
  );
  const handleLimitChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationMember({
          page: 1,
          limit,
        })
      );
    },
    [dispatch]
  );

  return (
    <Container.Pagination
      count={memberCount}
      onResetPagination={{
        changeListener: [memberStore.listQueryMember],
        callback: handleResetPagination,
      }}
      onLimitChange={handleLimitChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export const MemberPagination = memo(_MemberPagination);
