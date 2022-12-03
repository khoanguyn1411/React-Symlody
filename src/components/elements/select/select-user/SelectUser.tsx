import classNames from "classnames";
import { useEffect, useLayoutEffect, useState } from "react";

import { Avatar, SelectSearch } from "@/components";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { User } from "@/features/types";
import { useDebounce } from "@/hooks";
import { FormatService } from "@/utils";

export type TProps = {
  userId: number;
  placeholder: string;
  setUserId: (userId: number) => void;
};

export const SelectUser: React.FC<TProps> = ({
  placeholder,
  userId,
  setUserId,
}) => {
  const userList = useAppSelector(userSelectors.selectAll);
  const { inputValue, setInputValue, debounceValue } = useDebounce();
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>(() => {
    return userList.find((item) => item.id === userId);
  });

  const [currentUserList, setCurrentUserList] = useState<User[]>(userList);

  const handleInputChange = (value: string): void => {
    setInputValue(value);
    setIsSearching(true);
  };

  const handleSearchValueChange = (value: string): void => {
    if (!value) {
      if (userSelected) {
        setCurrentUserList(
          userList.filter((item) => item.id !== userSelected.id)
        );
        return;
      }
      setCurrentUserList(userList);
      return;
    }

    const newUserFilterList = userList.filter((item) =>
      FormatService.toCleanedString(item.fullName).includes(
        FormatService.toCleanedString(value)
      )
    );
    setCurrentUserList(newUserFilterList);
  };

  const handleSelectMember = (user: User) => () => {
    setUserSelected(user);
    setIsShowContent(false);
    setInputValue(user.fullName);
    setIsSearching(false);
    setUserId(user.id);
  };

  const handleClearMemberSelected = () => {
    setUserSelected(null);
    setUserId(null);
    setInputValue("");
  };

  useLayoutEffect(() => {
    if (userId == null) {
      setInputValue("");
      setUserSelected(null);
    }
  }, [userId, setInputValue]);

  useLayoutEffect(() => {
    if (!isShowContent && userSelected) {
      setInputValue(userSelected.fullName);
      setIsSearching(false);
    }
    if (!isShowContent && !userSelected) {
      setInputValue("");
      setIsSearching(false);
    }
    if (isShowContent && !isSearching) {
      setCurrentUserList(userList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);

  useEffect(() => {
    setCurrentUserList(userList);
  }, [userList]);

  const isShowClearSearch = inputValue !== "" || userSelected != null;
  const isShowFullNameImage =
    userSelected && inputValue === userSelected.fullName;

  return (
    <div>
      <SelectSearch
        setInputValue={handleInputChange}
        inputValue={inputValue}
        isSearching={isSearching}
        isShowClearSearch={isShowClearSearch}
        debounceValue={debounceValue}
        isShowContent={isShowContent}
        onClearSearch={handleClearMemberSelected}
        setIsShowContent={setIsShowContent}
        placeholder={placeholder}
        postNode={
          <Avatar
            size="small"
            fullName={isShowFullNameImage && userSelected.fullName}
            src={!isShowFullNameImage ? PLACEHOLDER_IMAGE : userSelected.avatar}
          />
        }
        onSearchChange={handleSearchValueChange}
      >
        {userSelected && !debounceValue && (
          <button
            className={classNames(
              "flex p-2 w-full space-x-3 items-center bg-primary-50"
            )}
          >
            <Avatar size="default" fullName={userSelected.fullName} src="" />
            <div className="flex flex-col">
              <h1
                className={classNames("text-left text-primary-800 font-medium")}
              >
                {userSelected.fullName}
              </h1>
              <h2 className="text-sm">{userSelected.email}</h2>
            </div>
          </button>
        )}
        {currentUserList.map((item) => {
          const isSelectedItemInList =
            userSelected && item.id === userSelected.id;
          return (
            <button
              onClick={handleSelectMember(item)}
              key={item.id}
              className={classNames(
                "flex py-2 px-3 w-full space-x-3 items-center transition-colors duration-200",
                isSelectedItemInList ? "bg-primary-800" : "hover:bg-primary-50 "
              )}
            >
              <Avatar
                size="default"
                fullName={item.fullName}
                src={item.avatar}
              />
              <div className="flex flex-col">
                <h1
                  className={classNames(
                    "text-left",
                    isSelectedItemInList && "text-white font-medium"
                  )}
                >
                  {item.fullName}
                </h1>
                {/* {isSelectedItemInList && (
                  <h2 className="text-sm">{item.email}</h2>
                )} */}
              </div>
            </button>
          );
        })}
        {currentUserList.length === 0 && (
          <div className="p-2">Không có dữ liệu thành viên</div>
        )}
      </SelectSearch>
    </div>
  );
};
