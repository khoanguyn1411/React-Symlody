import { useAppDispatch, useAppSelector } from "@/features";
import {
  memberSelectors,
  setCurrentMemberList,
  setMemberFilterParams,
  setMemberListWithPagination,
} from "@/features/reducers";
import { generateArrayWithNoDuplicate } from "@/utils/funcs/generate-array-with-no-duplicate";
import { isTextIncludedIn } from "@/utils/funcs/is-text-included-in";

export const useMemberPagination = () => {
  const memberStore = useAppSelector((store) => store.member);
  const memberList = useAppSelector(memberSelectors.selectAll);
  const dispatch = useAppDispatch();

  const paginate = (): void => {
    const { currentMemberList } = memberStore;
    const { page, limit } = memberStore.filterParamsMember;
    const memberListPagination = currentMemberList.slice(
      (page - 1) * limit,
      page * limit
    );
    dispatch(setMemberListWithPagination(memberListPagination));
  };

  const filterBySearch = (search: string): void => {
    const { currentMemberList } = memberStore;
    dispatch(setMemberFilterParams({ search: search }));
    if (!search) {
      dispatch(setCurrentMemberList(memberList));
      return;
    }
    const listMemberAfterFilterByName = currentMemberList.filter((item) =>
      isTextIncludedIn(item.authAccount.fullName, search)
    );
    const listMemberAfterFilterByEmail = currentMemberList.filter((item) =>
      isTextIncludedIn(item.authAccount.email, search)
    );

    const newMemberList = generateArrayWithNoDuplicate(
      listMemberAfterFilterByName.concat(listMemberAfterFilterByEmail)
    );
    dispatch(setCurrentMemberList(newMemberList));
  };

  return {
    paginate,
    filterBySearch,
  };
};
