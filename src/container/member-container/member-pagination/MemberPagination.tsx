import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { setMemberFilterParams } from "@/features/reducers";
import { CommonFilterParams } from "@/features/types/models/filter-params";

export const MemberPagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);

  // TO_UPDATE: When BE release pagination, change it to the original memberCount:
  // const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberCount = memberStore.currentMemberList.length;

  const handlePaginationOptionChange = (
    config: CommonFilterParams.Pagination
  ) => {
    dispatch(setMemberFilterParams(config));
  };

  return (
    <Container.Pagination
      count={memberCount}
      defaultLimit={memberStore.filterParamsMember.limit}
      onResetListeners={[
        memberStore.filterParamsMember.search,
        memberStore.filterParamsMember.isArchived,
      ]}
      onChange={handlePaginationOptionChange}
    />
  );
};
