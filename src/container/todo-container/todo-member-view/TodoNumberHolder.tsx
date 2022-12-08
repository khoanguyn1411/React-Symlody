import classNames from "classnames";
import React, { useState } from "react";

import { Avatar, Checkbox, Search, Select } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
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

  const [selectedListOptions, setSelectedListOptions] = useState<
    TOptionProps<User>[]
  >(
    selectedMembers.map((user) => ({
      value: user.id.toString(),
      label: user.fullName,
      objectValue: user,
    }))
  );

  const handleSetList = (options: TOptionProps<User>[]) => {
    setSelectedListOptions(options);
    setSelectedMembers(options.map((item) => item.objectValue));
  };

  const { inputValue, setInputValue, debounceValue } = useDebounce();
  const INITIAL_TASK_QUANTITY = memberList.length;

  useEffectSkipFirstRender(() => {
    _setMemberList(
      memberList.filter((item) =>
        FilterService.isTextIncludedIn(item.fullName, debounceValue)
      )
    );
  }, [debounceValue]);

  const MEMBER_LIST: TOptionProps<User>[] = _memberList.map((option) => ({
    label: option.fullName,
    value: option.id.toString(),
    objectValue: option,
  }));

  return (
    <TodoCircleBorderWrapper
      zIndex={ZINDEX_SETTING.NUMBER_HOLDER}
      className={classNames(
        "hover:border-primary-600 transition-colors duration-200",
        {
          "border-primary-800 bg-primary-800": selectedListOptions.length > 0,
          "border-white bg-white": selectedListOptions.length === 0,
        }
      )}
    >
      <Select
        style="none"
        isNoPaddingY
        isNonePadding
        list={MEMBER_LIST}
        isMultiple
        classNameList="border border-gray-200 bg-white overflow-hidden"
        classNameWrapperOptions="overflow-auto max-h-56 py-1.5"
        selectValueControlled={selectedListOptions}
        setSelectValueControlled={handleSetList}
        renderBeforeList={
          <>
            {INITIAL_TASK_QUANTITY > DEFAULT_SHOULD_SHOW_SEARCH_QUANTITY && (
              <div className="px-3 pt-3 pb-2 overflow-hidden bg-white">
                <Search
                  placeholder="Tìm kiếm ..."
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </div>
            )}
          </>
        }
        renderEmptyListPlaceholder={<h1 className="px-2 py-2">No data</h1>}
        renderOption={({ objectValue: { fullName, avatar } }, isChosen) => (
          <button className="flex items-center w-full pl-1 pr-3 cursor-pointer transition-colors hover:bg-primary-100">
            <Checkbox checked={isChosen} />
            <Avatar src={avatar} size="xsmall" fullName={fullName} />
            <h1 className="ml-2 text-sm">{fullName}</h1>
          </button>
        )}
      >
        <Avatar
          fontSize={15}
          fontColor={"black"}
          fontWeight={600}
          backgroundColor="#e5e7eb"
          isFullText
          fullName={`+${INITIAL_TASK_QUANTITY}`}
        />
      </Select>
    </TodoCircleBorderWrapper>
  );
};
