import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

import { Avatar, Tooltip } from "@/components";
import { GlobalTypes } from "@/utils";

import { DEFAULT_DISPLAY_MEMBER_COUNT, ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  item: string;
  index: number;
  selectedMembers: string[];
  setSelectedMembers: GlobalTypes.ReactStateAction<string[]>;
};

export const TodoAvatar: React.FC<TProps> = ({
  item,
  index,
  selectedMembers,
  setSelectedMembers,
}) => {
  const getZIndex = useMemo(() => {
    return selectedMembers.includes(item)
      ? ZINDEX_SETTING.ON_SELECT + DEFAULT_DISPLAY_MEMBER_COUNT - index
      : DEFAULT_DISPLAY_MEMBER_COUNT - index;
  }, [index, item, selectedMembers]);

  const [zIndex, setZIndex] = useState<number>(getZIndex);

  useEffect(() => {
    setZIndex(getZIndex);
  }, [getZIndex]);

  const handleSetSelectedMember = () => {
    const selectedItem = item;
    setSelectedMembers((prev) => {
      if (prev.includes(selectedItem)) {
        return prev.filter((item) => item !== selectedItem);
      }
      return [...prev, selectedItem];
    });
  };

  const handleChangeZIndexOnMouseOver = () => {
    setZIndex(ZINDEX_SETTING.ON_TOP);
  };

  const handleChangeZIndexOnMouseOut = () => {
    setZIndex(getZIndex);
  };
  return (
    <TodoCircleBorderWrapper
      onMouseOver={handleChangeZIndexOnMouseOver}
      onMouseOut={handleChangeZIndexOnMouseOut}
      onClick={handleSetSelectedMember}
      className={classNames("transition-all duration-200 hover:mb-2", {
        "border-white": !selectedMembers.includes(item),
        "border-primary-800": selectedMembers.includes(item),
      })}
      zIndex={zIndex}
    >
      <Tooltip space={10} content={item}>
        <Avatar fullName={item} />
      </Tooltip>
    </TodoCircleBorderWrapper>
  );
};
