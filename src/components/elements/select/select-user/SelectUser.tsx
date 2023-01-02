import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { PLACEHOLDER_IMAGE } from "@/constants";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { User } from "@/features/types";
import { cleanString } from "@/utils/funcs/clean-string";

import { Avatar } from "../../avatar";
import { SelectSearch } from "../select-search";
import { Option } from "../type";

type Props = {
  placeholder?: string;
  selectedUserId: User["id"];
  initialUserList?: User[];
  setSelectedUserId: (value: User["id"]) => void;
};

export const SelectUser: React.FC<Props> = ({
  placeholder,
  selectedUserId,
  initialUserList,
  setSelectedUserId,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userList = initialUserList ?? useAppSelector(userSelectors.selectAll);
  const isLoading = useAppSelector((state) => state.user.pending);

  const [currentUserList, setCurrentUserList] = useState<User[]>(userList);
  const [searchValue, setSearchValue] = useState<string>("");

  const LIST_OPTIONS: Option<User, User["id"]>[] = currentUserList.map(
    (user) => ({
      value: user.id,
      objectValue: user,
      label: user.fullName,
    })
  );

  const selectedUser = userList.find((user) => user.id === selectedUserId);

  const hasOption = selectedUser != null;
  const isShowFullNameImage =
    hasOption && searchValue === selectedUser.fullName;
  const avatarUrl = !isShowFullNameImage
    ? PLACEHOLDER_IMAGE
    : selectedUser.avatarUrl;

  useEffect(() => {
    setCurrentUserList(userList);
  }, [userList]);

  return (
    <SelectSearch
      list={LIST_OPTIONS}
      isNonePadding
      value={selectedUserId}
      onOptionChange={(_, _setSearchValue) => {
        if (selectedUser) {
          _setSearchValue(selectedUser.fullName);
          setSearchValue(selectedUser.fullName);
        }
      }}
      onSearchChange={(value, setCurrentList) => {
        setSearchValue(value);
        const newUserFilterList = LIST_OPTIONS.filter((item) =>
          cleanString(item.objectValue.fullName).includes(cleanString(value))
        );
        setCurrentList(newUserFilterList);
      }}
      onChange={(value) => setSelectedUserId(value ? Number(value) : null)}
      isLoading={isLoading}
      renderEmptyListPlaceholder={
        <div className="p-2">Không có dữ liệu thành viên</div>
      }
      renderOption={({ objectValue: { fullName, avatarUrl } }, isChosen) => (
        <div
          className={classNames(
            "flex items-center w-full px-3 py-2 cursor-pointer space-x-3 transition-colors duration-200",
            isChosen ? "bg-primary-800" : "hover:bg-primary-50",
            !searchValue && isChosen ? "hidden" : "block"
          )}
        >
          <Avatar size="default" fullName={fullName} src={avatarUrl} />
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
      searchPlaceholder={placeholder}
      renderBeforeList={
        <>
          {selectedUser && !searchValue && (
            <button
              className={classNames(
                "flex p-2 w-full space-x-3 items-center bg-primary-50"
              )}
            >
              <Avatar
                size="default"
                fullName={selectedUser.fullName}
                src={selectedUser.avatarUrl}
              />
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
    >
      {(InputComponent) => (
        <>
          <div className="mr-2">
            <Avatar
              size="small"
              fullName={isShowFullNameImage && selectedUser.fullName}
              src={avatarUrl}
            />
          </div>
          {InputComponent}
        </>
      )}
    </SelectSearch>
  );
};
