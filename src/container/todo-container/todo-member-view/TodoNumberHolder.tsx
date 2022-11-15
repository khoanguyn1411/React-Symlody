import classNames from "classnames";
import React, { useState } from "react";

import { Avatar, Checkbox, Search } from "@/components";
import { SelectCustom } from "@/components/elements/select/select-custom";
import { IUser } from "@/features/types";
import { useDebounce, useEffectSkipFirstRender } from "@/hooks";
import { FilterService, GlobalTypes } from "@/utils";

import { ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  memberList: IUser[];
  selectedMembers: IUser[];
  setSelectedMembers: GlobalTypes.ReactStateAction<IUser[]>;
};

export const TodoNumberHolder: React.FC<TProps> = ({
  memberList,
  selectedMembers,
  setSelectedMembers,
}) => {
  const [_memberList, _setMemberList] = useState<IUser[]>(memberList);
  const [_selectNumberList, _setSelectNumberList] = useState<IUser[]>([]);

  const { inputValue, setInputValue, debounceValue } = useDebounce();

  useEffectSkipFirstRender(() => {
    _setMemberList(
      memberList.filter((item) =>
        FilterService.isTextIncludedIn(item.full_name, debounceValue)
      )
    );
  }, [debounceValue]);

  const handleAddMemberToSelectList = (selectedItem: IUser) => () => {
    _setSelectNumberList((prev) => {
      if (prev.includes(selectedItem)) {
        return prev.filter((item) => item !== selectedItem);
      }
      return [...prev, selectedItem];
    });

    setSelectedMembers((prev) => {
      if (prev.includes(selectedItem)) {
        return prev.filter((item) => item !== selectedItem);
      }
      return [...prev, selectedItem];
    });
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
        classNameList="w-32 border border-gray-200 bg-white"
        renderListItem={
          <>
            <div className="sticky top-0 z-10 px-3 py-2 bg-white">
              <Search
                placeholder="Tìm kiếm ..."
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>
            {_memberList.length === 0 && <h1 className="px-2 py-2">No data</h1>}
            {_memberList.length > 0 &&
              _memberList.map((item, index) => (
                <button
                  key={index}
                  onClick={handleAddMemberToSelectList(item)}
                  className="flex items-center w-full px-1 cursor-pointer transition-colors hover:bg-primary-100"
                >
                  <Checkbox checked={selectedMembers.includes(item)} />
                  <Avatar
                    src={item.avatar}
                    size="xsmall"
                    fullName={item.full_name}
                  />
                  <h1 className="ml-2 text-sm">{item.full_name}</h1>
                </button>
              ))}
          </>
        }
      >
        <Avatar
          fontSize={15}
          fontColor={"black"}
          fontWeight={600}
          backgroundColor="#e5e7eb"
          isFullText
          fullName={`+${memberList && memberList.length}`}
        />
      </SelectCustom>
    </TodoCircleBorderWrapper>
  );
};
