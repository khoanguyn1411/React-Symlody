import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationMember, memberSelectors } from "@/features/reducers";

export const MemberPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const memberStore = useAppSelector((state) => state.member);

  // TO_UPDATE: When BE release pagination, change it to the original memberCount:
  // const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberCount = memberStore.currentMemberList.length;

  const handlePaginationChange = (page: number) => {
    dispatch(
      getPaginationMember({
        page,
      })
    );
  };
  const handleResetPagination = () => {
    dispatch(
      getPaginationMember({
        page: 1,
      })
    );
  };
  const handleLimitChange = (_page: number, limit: number) => {
    dispatch(
      getPaginationMember({
        page: 1,
        limit,
      })
    );
  };

  console.log(memberStore.listQueryMemberFE.page);

  return (
    <Container.Pagination
      count={memberCount}
      defaultLimit={memberStore.listQueryMemberFE.limit}
      onResetPagination={{
        changeListener: [
          memberStore.listQueryMember,
          memberStore.listQueryMemberFE.search,
        ],
        callback: handleResetPagination,
      }}
      onLimitChange={handleLimitChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};
