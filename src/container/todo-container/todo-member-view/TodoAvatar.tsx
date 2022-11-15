import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

import { Avatar, Tooltip } from "@/components";
import { IUser } from "@/features/types";
import { GlobalTypes } from "@/utils";

import { DEFAULT_DISPLAY_MEMBER_COUNT, ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  user: IUser;
  index: number;
  selectedMembers: IUser[];
  setSelectedMembers: GlobalTypes.ReactStateAction<IUser[]>;
};

export const TodoAvatar: React.FC<TProps> = ({
  user,
  index,
  selectedMembers,
  setSelectedMembers,
}) => {
  const getZIndex = useMemo(() => {
    return selectedMembers.includes(user)
      ? ZINDEX_SETTING.ON_SELECT + DEFAULT_DISPLAY_MEMBER_COUNT - index
      : DEFAULT_DISPLAY_MEMBER_COUNT - index;
  }, [index, user, selectedMembers]);

  const [zIndex, setZIndex] = useState<number>(getZIndex);

  useEffect(() => {
    setZIndex(getZIndex);
  }, [getZIndex]);

  const handleSetSelectedMember = () => {
    const selectedItem = user;
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
      className={classNames("transition-all duration-200 group-hover:mb-3", {
        "border-white bg-white": !selectedMembers.includes(user),
        "border-primary-800 bg-primary-800": selectedMembers.includes(user),
      })}
      zIndex={zIndex}
    >
      <Tooltip space={8} content={user.full_name}>
        <Avatar fullName={user.full_name} />
      </Tooltip>
    </TodoCircleBorderWrapper>
  );
};
