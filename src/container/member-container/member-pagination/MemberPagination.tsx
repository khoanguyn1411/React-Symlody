import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { setListQueryMember } from "@/features/reducers";

export const MemberPagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);

  // TO_UPDATE: When BE release pagination, change it to the original memberCount:
  // const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberCount = memberStore.currentMemberList.length;

  const handlePaginationChange = (page: number) => {
    dispatch(
      setListQueryMember({
        page,
      })
    );
  };
  const handleResetPagination = () => {
    dispatch(
      setListQueryMember({
        page: 1,
      })
    );
  };
  const handleLimitChange = (_page: number, limit: number) => {
    dispatch(
      setListQueryMember({
        page: 1,
        limit,
      })
    );
  };

  return (
    <Container.Pagination
      count={memberCount}
      defaultLimit={memberStore.listQueryMember.limit}
      onResetPagination={{
        changeListener: [
          memberStore.listQueryMember.search,
          memberStore.listQueryMember.isArchived,
        ],
        callback: handleResetPagination,
      }}
      onLimitChange={handleLimitChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};
