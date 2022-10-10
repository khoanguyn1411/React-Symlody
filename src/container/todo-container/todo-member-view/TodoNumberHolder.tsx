import classNames from "classnames";
import React, { useState } from "react";

import { Avatar, Checkbox, Search } from "@/components";
import { SelectCustom } from "@/components/elements/select/select-custom";
import { useDebounce, useEffectSkipFirstRender } from "@/hooks";
import { FilterService, GlobalTypes } from "@/utils";

import { ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  memberList: string[];
  selectedMember: string[];
  setSelectedMember: GlobalTypes.ReactStateAction<string[]>;
};

export const TodoNumberHolder: React.FC<TProps> = ({
  memberList,
  selectedMember,
  setSelectedMember,
}) => {
  const [_memberList, _setMemberList] = useState<string[]>(memberList);
  const [_selectNumberList, _setSelectNumberList] = useState<string[]>([]);

  const { inputValue, setInputValue, debounceValue } = useDebounce();

  useEffectSkipFirstRender(() => {
    _setMemberList(
      memberList.filter((item) =>
        FilterService.isTextIncludedIn(item, debounceValue)
      )
    );
  }, [debounceValue]);

  const handleAddMemberToSelectList = (selectedItem: string) => () => {
    _setSelectNumberList((prev) => {
      if (prev.includes(selectedItem)) {
        return prev.filter((item) => item !== selectedItem);
      }
      return [...prev, selectedItem];
    });

    setSelectedMember((prev) => {
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
          "border-primary-800": _selectNumberList.length > 0,
          "border-white": _selectNumberList.length === 0,
        }
      )}
    >
      <SelectCustom
        style="none"
        isNoPaddingY
        placement="bottom-right"
        classNameList="w-32 border border-gray-200 bg-white"
        renderListItem={
          <>
            <div className="sticky top-0 z-10 px-3 py-2 bg-white">
              <Search inputValue={inputValue} setInputValue={setInputValue} />
            </div>
            {_memberList.length === 0 && <h1 className="px-2 py-2">No data</h1>}
            {_memberList.length > 0 &&
              _memberList.map((item, index) => (
                <button
                  key={index}
                  onClick={handleAddMemberToSelectList(item)}
                  className="flex items-center w-full px-1 cursor-pointer transition-colors hover:bg-primary-100"
                >
                  <Checkbox checked={selectedMember.includes(item)} />
                  <Avatar size="xsmall" fullName={item} />
                  <h1 className="ml-2 text-sm">{item}</h1>
                </button>
              ))}
          </>
        }
      >
        <Avatar
          fontSize={15}
          fontColor={"black"}
          fontWeight={600}
          backgroundColor="#dadee0"
          isFullText
          size="small"
          fullName={`+${memberList && memberList.length}`}
        />
      </SelectCustom>
    </TodoCircleBorderWrapper>
  );
};
