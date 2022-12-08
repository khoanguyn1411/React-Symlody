import classNames from "classnames";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { PLACEHOLDER_IMAGE } from "@/constants";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { User } from "@/features/types";
import { useDebounce } from "@/hooks";
import { FormatService } from "@/utils";

import { Avatar } from "../../avatar";
import { Button } from "../../button";
import { Input } from "../../input";
import { Select } from "../select-default";
import { TOptionProps } from "../type";

type Props = {
  placeholder?: string;
  selectedUserId: User["id"];
  setSelectedUserId: (value: User["id"]) => void;
};

export const SelectUser: React.FC<Props> = ({
  placeholder,
  selectedUserId,
  setSelectedUserId,
}) => {
  const userList = useAppSelector(userSelectors.selectAll);

  const [currentUserList, setCurrentUserList] = useState<User[]>(userList);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const LIST_OPTIONS: TOptionProps<User>[] = currentUserList.map((user) => ({
    value: user.id.toString(),
    objectValue: user,
    label: user.fullName,
  }));
  const {
    inputValue: searchValue,
    setInputValue: setSearchValue,
    debounceValue: debounceSearchValue,
  } = useDebounce();

  const isShowClearSearch = searchValue !== "" || selectedUserId != null;

  const handleClearSelectedUserId = () => {
    setSelectedUserId(null);
    setSearchValue("");
  };

  const handleSearchValueChange = (value: string): void => {
    setIsShowContent(true);
    setSearchValue(value);
    setIsSearching(true);
  };

  const selectedUser = userList.find(
    (user) => user.id === Number(selectedUserId)
  );

  useEffect(() => {
    setCurrentUserList(userList);
  }, [userList]);

  useEffect(() => {
    if (!isSearching) {
      return;
    }
    if (!searchValue) {
      if (selectedUserId) {
        setCurrentUserList(
          userList.filter((item) => item.id !== Number(selectedUserId))
        );
        return;
      }
      setCurrentUserList(userList);
      return;
    }

    const newUserFilterList = userList.filter((item) =>
      FormatService.toCleanedString(item.fullName).includes(
        FormatService.toCleanedString(searchValue)
      )
    );
    setCurrentUserList(newUserFilterList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchValue]);

  useLayoutEffect(() => {
    if (!isShowContent && selectedUserId) {
      if (selectedUser) {
        setSearchValue(selectedUser.fullName);
      }
      setIsSearching(false);
    }
    if (!isShowContent && !selectedUserId) {
      setSearchValue("");
      setIsSearching(false);
    }
    if (isShowContent && !isSearching) {
      setCurrentUserList(userList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);

  return (
    <Select
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
      isNonePadding
      value={selectedUserId && selectedUserId.toString()}
      onChange={(value) => setSelectedUserId(Number(value))}
      list={LIST_OPTIONS}
      renderEmptyListPlaceholder={
        <div className="p-2">Không có dữ liệu thành viên</div>
      }
      renderBeforeList={
        <>
          {selectedUser && !debounceSearchValue && (
            <button
              className={classNames(
                "flex p-2 w-full space-x-3 items-center bg-primary-50"
              )}
            >
              <Avatar size="default" fullName={selectedUser.fullName} src="" />
              <div className="flex flex-col">
                <h1
                  className={classNames(
                    "text-left text-primary-800 font-medium"
                  )}
                >
                  {selectedUser.fullName}
                </h1>
                <h2 className="text-sm">{selectedUser.email}</h2>
              </div>
            </button>
          )}
        </>
      }
      renderOption={({ objectValue: { fullName, avatar } }, isChosen) => (
        <div
          className={classNames(
            "flex items-center w-full px-3 py-2 cursor-pointer space-x-3 transition-colors duration-200",
            isChosen ? "bg-primary-800" : "hover:bg-primary-50 "
          )}
        >
          <Avatar size="default" fullName={fullName} src={avatar} />
          <div className="flex flex-col">
            <h1
              className={classNames(
                "text-left",
                isChosen && "text-white font-medium"
              )}
            >
              {fullName}
            </h1>
          </div>
        </div>
      )}
      placeHolder={placeholder}
    >
      {(option) => {
        const hasOption = option != null;
        const isShowFullNameImage =
          hasOption && searchValue === option.objectValue.fullName;

        const avatar = !isShowFullNameImage
          ? PLACEHOLDER_IMAGE
          : option.objectValue.avatar;

        return (
          <div className="relative w-full">
            <div className="absolute top-0 bottom-0 left-0 flex items-center w-full px-3">
              <Avatar
                size="small"
                fullName={isShowFullNameImage && option.objectValue.fullName}
                src={avatar}
              />
              <Input
                style="none"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleSearchValueChange}
                className="flex-1 ml-2 box-border"
              />
              {isShowClearSearch && (
                <Button
                  isIconOnly
                  style="none"
                  onClick={handleClearSelectedUserId}
                >
                  <i className="text-gray-400 fas fa-times" />
                </Button>
              )}
            </div>
            <div className="h-10 bg-gray-100 rounded-md" />
          </div>
        );
      }}
    </Select>
  );
};
