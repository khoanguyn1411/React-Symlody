import classNames from "classnames";
import React, { useState } from "react";

import { Avatar, Checkbox, Search } from "@/components";
import { SelectCustom } from "@/components/elements/select/select-custom";
import { User } from "@/features/types";
import { useDebounce, useEffectSkipFirstRender } from "@/hooks";
import { FilterService, GlobalTypes } from "@/utils";

import {
  DEFAULT_SHOULD_SHOW_SEARCH_QUANTITY,
  ZINDEX_SETTING,
} from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  memberList: User[];
  selectedMembers: User[];
  setSelectedMembers: GlobalTypes.ReactStateAction<User[]>;
};

export const TodoNumberHolder: React.FC<TProps> = ({
  memberList,
  selectedMembers,
  setSelectedMembers,
}) => {
  const [_memberList, _setMemberList] = useState<User[]>(memberList);
  const [_selectNumberList, _setSelectNumberList] = useState<User[]>([]);

  const { inputValue, setInputValue, debounceValue } = useDebounce();
  const INITIAL_TASK_QUANTITY = memberList.length;

  useEffectSkipFirstRender(() => {
    _setMemberList(
      memberList.filter((item) =>
        FilterService.isTextIncludedIn(item.fullName, debounceValue)
      )
    );
  }, [debounceValue]);

  const handleAddMemberToSelectList = (selectedItem: User) => () => {
    const getSelectNumberList = (prev: User[]) => {
      const idsPrevList = prev.map((user) => user.id);
      if (idsPrevList.includes(selectedItem.id)) {
        return prev.filter((item) => item.id !== selectedItem.id);
      }
      return [...prev, selectedItem];
    };

    _setSelectNumberList((prev) => getSelectNumberList(prev));
    setSelectedMembers((prev) => getSelectNumberList(prev));
  };
  return (
    <TodoCircleBorderWrapper
      zIndex={ZINDEX_SETTING.NUMBER_HOLDER}
      className={classNames(
        "hover:border-primary-600 transition-colors duration-200",
        {
          "border-primary-800 bg-primary-800": _selectNumberList.length > 0,
          "border-white bg-white": _selectNumberList.length === 0,
        }
      )}
    >
      <SelectCustom
        style="none"
        isNoPaddingY
        classNameList="border border-gray-200 bg-white"
        renderListItem={
          <div className="flex flex-col gap-1">
            {INITIAL_TASK_QUANTITY > DEFAULT_SHOULD_SHOW_SEARCH_QUANTITY && (
              <div className="px-3 pt-3 overflow-hidden bg-white">
                <Search
                  placeholder="Tìm kiếm ..."
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </div>
            )}
            <div className="overflow-auto max-h-56 py-1.5">
              {_memberList.length === 0 && (
                <h1 className="px-2 py-2">No data</h1>
              )}
              {_memberList.length > 0 &&
                _memberList.map((item, index) => (
                  <button
                    key={index}
                    onClick={handleAddMemberToSelectList(item)}
                    className="flex items-center w-full pl-1 pr-3 cursor-pointer transition-colors hover:bg-primary-100"
                  >
                    <Checkbox checked={selectedMembers.includes(item)} />
                    <Avatar
                      src={item.avatar}
                      size="xsmall"
                      fullName={item.fullName}
                    />
                    <h1 className="ml-2 text-sm">{item.fullName}</h1>
                  </button>
                ))}
            </div>
          </div>
        }
      >
        <Avatar
          fontSize={15}
          fontColor={"black"}
          fontWeight={600}
          backgroundColor="#e5e7eb"
          isFullText
          fullName={`+${INITIAL_TASK_QUANTITY}`}
        />
      </SelectCustom>
    </TodoCircleBorderWrapper>
  );
};
