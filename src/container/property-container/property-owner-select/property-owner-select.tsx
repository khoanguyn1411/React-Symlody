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
    // setIsShowContent(true);
    const newMemberFilterList = memberList.filter((item) =>
      FormatService.toCleanedString(item.full_name).includes(
        FormatService.toCleanedString(value)
      )
    );
    if (memberSelected) {
      setCurrentMemberList(
        newMemberFilterList.filter((item) => item.id !== memberSelected.id)
      );
      return;
    }
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

  console.log(
    currentMemberList.filter((item) =>
      memberSelected ? item.id !== memberSelected.id : item
    )
  );

  return (
    <div>
      <SelectSearch
        {...propsInputSearch}
        isShowContent={isShowContent}
        setIsShowContent={setIsShowContent}
        placeholder={"Người chịu trách nhiệm"}
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
        {memberSelected && !propsInputSearch.debounceValue && (
          <button
            className={classNames(
              "flex p-2 w-full space-x-3 items-center bg-primary-50"
            )}
          >
            <Avatar
              size="medium"
              fullName={memberSelected.auth_account.first_name}
              src=""
            />
            <div className="flex flex-col">
              <h1
                className={classNames("text-left text-primary-800 font-medium")}
              >
                {memberSelected.full_name}
              </h1>
              <h2 className="text-sm">{memberSelected.auth_account.email}</h2>
            </div>
          </button>
        )}
        {currentMemberList.map((item) => {
          const isSelectedItemInList =
            memberSelected && item.id === memberSelected.id;
          return (
            <button
              onClick={handleSelectMember(item)}
              key={item.id}
              className={classNames(
                "flex p-2 w-full space-x-3 items-center",
                isSelectedItemInList && "bg-primary-50"
              )}
            >
              <Avatar
                size="medium"
                fullName={item.auth_account.first_name}
                src=""
              />
              <div className="flex flex-col">
                <h1
                  className={classNames(
                    "text-left",
                    isSelectedItemInList && "text-primary-800 font-medium"
                  )}
                >
                  {item.full_name}
                </h1>
                {isSelectedItemInList && (
                  <h2 className="text-sm">{item.auth_account.email}</h2>
                )}
              </div>
            </button>
          );
        })}
        {currentMemberList.length === 0 && (
          <div className="p-2">Không có dữ liệu thành viên</div>
        )}
      </SelectSearch>
    </div>
  );
};
