import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

import { Avatar, Tooltip } from "@/components";
import { useAppSelector } from "@/features";
import { User } from "@/features/types";
import { GlobalTypes } from "@/utils";

import { DEFAULT_DISPLAY_MEMBER_COUNT, ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  user: User;
  index: number;
  selectedMembers: User[];
  setSelectedMembers: GlobalTypes.ReactStateAction<User[]>;
};

export const TodoAvatar: React.FC<TProps> = ({
  user,
  index,
  selectedMembers,
  setSelectedMembers,
}) => {
  const taskStore = useAppSelector((state) => state.task);
  const idsSelectedMembers = selectedMembers.map((member) => member.id);
  const getZIndex = useMemo(() => {
    return idsSelectedMembers.includes(user.id)
      ? ZINDEX_SETTING.ON_SELECT + DEFAULT_DISPLAY_MEMBER_COUNT - index
      : DEFAULT_DISPLAY_MEMBER_COUNT - index;
  }, [idsSelectedMembers, user.id, index]);

  const [zIndex, setZIndex] = useState<number>(getZIndex);
  const isAvatarSelected = idsSelectedMembers.includes(user.id);

  useEffect(() => {
    setZIndex(getZIndex);
  }, [getZIndex]);

  const handleSetSelectedMember = () => {
    const selectedItem = user;
    setSelectedMembers((prev) => {
      const idsSelectedMembers = prev.map((member) => member.id);
      if (idsSelectedMembers.includes(selectedItem.id)) {
        return prev.filter((item) => item.id !== selectedItem.id);
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

  useEffect(() => {
    setSelectedMembers([]);
  }, [setSelectedMembers, taskStore.filterParamsTask.departmentId]);

  return (
    <TodoCircleBorderWrapper
      onMouseOver={handleChangeZIndexOnMouseOver}
      onMouseOut={handleChangeZIndexOnMouseOut}
      onClick={handleSetSelectedMember}
      className={classNames("transition-all duration-200 group-hover:mb-3", {
        "border-white bg-white": !isAvatarSelected,
        "border-primary-800 bg-primary-800": isAvatarSelected,
      })}
      zIndex={zIndex}
    >
      <Tooltip space={10} content={user.fullName}>
        <Avatar src={user.avatar} fullName={user.fullName} />
      </Tooltip>
    </TodoCircleBorderWrapper>
  );
};
