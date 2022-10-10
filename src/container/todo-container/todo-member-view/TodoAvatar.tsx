import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

import { Avatar, Tooltip } from "@/components";
import { GlobalTypes } from "@/utils";

import { DEFAULT_DISPLAY_MEMBER_COUNT, ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  item: string;
  index: number;
  selectedMember: string[];
  setSelectedMember: GlobalTypes.ReactStateAction<string[]>;
};

export const TodoAvatar: React.FC<TProps> = ({
  item,
  index,
  selectedMember,
  setSelectedMember,
}) => {
  const getZIndex = useMemo(() => {
    return selectedMember.includes(item)
      ? ZINDEX_SETTING.ON_SELECT + DEFAULT_DISPLAY_MEMBER_COUNT - index
      : DEFAULT_DISPLAY_MEMBER_COUNT - index;
  }, [index, item, selectedMember]);

  const [zIndex, setZIndex] = useState<number>(getZIndex);

  useEffect(() => {
    setZIndex(getZIndex);
  }, [getZIndex]);

  const handleSetSelectedMember = () => {
    const selectedItem = item;
    setSelectedMember((prev) => {
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
      className={classNames("transition-all duration-200", {
        "border-white": !selectedMember.includes(item),
        "border-primary-800": selectedMember.includes(item),
        "mb-2": zIndex === ZINDEX_SETTING.ON_TOP,
      })}
      zIndex={zIndex}
    >
      <Tooltip space={10} content={item}>
        <Avatar size="small" fullName={item} />
      </Tooltip>
    </TodoCircleBorderWrapper>
  );
};
