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
  const emailsSelectedMembers = selectedMembers.map((member) => member.email);

  useEffect(() => {
    setZIndex(getZIndex);
  }, [getZIndex]);

  const handleSetSelectedMember = () => {
    const selectedItem = user;
    setSelectedMembers((prev) => {
      const emailsSelectedMembers = prev.map((member) => member.email);
      if (emailsSelectedMembers.includes(selectedItem.email)) {
        return prev.filter((item) => item.email !== selectedItem.email);
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
        "border-white bg-white": !emailsSelectedMembers.includes(user.email),
        "border-primary-800 bg-primary-800": emailsSelectedMembers.includes(
          user.email
        ),
      })}
      zIndex={zIndex}
    >
      <Tooltip space={10} content={user.full_name}>
        <Avatar src={user.avatar} fullName={user.full_name} />
      </Tooltip>
    </TodoCircleBorderWrapper>
  );
};
