import classNames from "classnames";
import { useEffect, useState } from "react";

import { Avatar, SelectSearch } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync, memberSelectors } from "@/features/reducers";
import { IMember } from "@/features/types";
import { useDebounce } from "@/hooks";
import { FormatService } from "@/utils";

export const PropertyOwnerSelect = () => {
  const dispatch = useAppDispatch();
  const memberList = useAppSelector(memberSelectors.selectAll);
  const propsInputSearch = useDebounce();

  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [memberSelected, setMemberSelected] = useState<IMember>();
  const [currentMemberList, setCurrentMemberList] =
    useState<IMember[]>(memberList);

  const handleSearchValueChange = (value: string): void => {
    if (!value) {
      setCurrentMemberList(memberList);
      return;
    }
    setIsShowContent(true);
    const newMemberFilterList = memberList.filter((item) =>
      FormatService.toCleanedString(item.full_name).includes(
        FormatService.toCleanedString(value)
      )
    );
    setCurrentMemberList(newMemberFilterList);
  };
  const handleSelectMember = (member: IMember) => () => {
    setMemberSelected(member);
    setIsShowContent(false);
    propsInputSearch.setInputValue(member.full_name);
  };

  useEffect(() => {
    if (!isShowContent && memberSelected) {
      propsInputSearch.setInputValue(memberSelected.full_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);

  useEffect(() => {
    dispatch(getMembersAsync(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setCurrentMemberList(memberList);
  }, [memberList]);

  return (
    <div>
      <SelectSearch
        {...propsInputSearch}
        isShowContent={isShowContent}
        setIsShowContent={setIsShowContent}
        postNode={
          <Avatar
            size="small"
            fullName={
              memberSelected &&
              propsInputSearch.debounceValue === memberSelected.full_name &&
              memberSelected.auth_account.first_name
            }
            src=""
          />
        }
        onSearchChange={handleSearchValueChange}
      >
        {currentMemberList.map((item) => (
          <div
            aria-hidden
            onClick={handleSelectMember(item)}
            key={item.id}
            className={classNames(
              memberSelected && item.id === memberSelected.id && "text-red-600"
            )}
          >
            {item.full_name}
          </div>
        ))}
        {currentMemberList.length === 0 && <div>No data</div>}
      </SelectSearch>
    </div>
  );
};
