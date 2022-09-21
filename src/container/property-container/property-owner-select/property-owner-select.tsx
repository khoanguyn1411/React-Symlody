import classNames from "classnames";
import { useEffect, useLayoutEffect, useState } from "react";

import { Avatar, SelectSearch } from "@/components";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync, memberSelectors } from "@/features/reducers";
import { IMember } from "@/features/types";
import { useDebounce } from "@/hooks";
import { FormatService } from "@/utils";

export const PropertyOwnerSelect = () => {
  const dispatch = useAppDispatch();
  const memberList = useAppSelector(memberSelectors.selectAll);
  const { inputValue, setInputValue, debounceValue } = useDebounce();

  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [memberSelected, setMemberSelected] = useState<IMember>();
  const [currentMemberList, setCurrentMemberList] =
    useState<IMember[]>(memberList);

  const handleInputChange = (value: string): void => {
    setInputValue(value);
    setIsSearching(true);
  };

  const handleSearchValueChange = (value: string): void => {
    if (!value) {
      if (memberSelected) {
        setCurrentMemberList(
          memberList.filter((item) => item.id !== memberSelected.id)
        );
        return;
      }
      setCurrentMemberList(memberList);
      return;
    }

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
    setInputValue(member.full_name);
  };

  const handleClearMemberSelected = () => {
    setMemberSelected(null);
  };

  useLayoutEffect(() => {
    if (!isShowContent && memberSelected) {
      setInputValue(memberSelected.full_name);
      setIsSearching(false);
    }
    if (isShowContent && !isSearching) {
      setCurrentMemberList(memberList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent, isSearching]);

  useEffect(() => {
    dispatch(getMembersAsync(null));
  }, [dispatch]);

  useEffect(() => {
    setCurrentMemberList(memberList);
  }, [memberList]);

  return (
    <div>
      <SelectSearch
        setInputValue={handleInputChange}
        inputValue={inputValue}
        isShowClearSearch={inputValue !== "" || memberSelected != null}
        debounceValue={debounceValue}
        isShowContent={isShowContent}
        onClearSearch={handleClearMemberSelected}
        setIsShowContent={setIsShowContent}
        placeholder={"Người chịu trách nhiệm"}
        postNode={
          <Avatar
            size="small"
            fullName={
              memberSelected &&
              inputValue === memberSelected.full_name &&
              memberSelected.auth_account.first_name
            }
            src={
              (!memberSelected || inputValue !== memberSelected.full_name) &&
              PLACEHOLDER_IMAGE
            }
          />
        }
        onSearchChange={handleSearchValueChange}
      >
        {memberSelected && !debounceValue && (
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
                "flex py-2 px-3 w-full space-x-3 items-center hover:bg-gray-100 transition-colors duration-200",
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
