import React from "react";

import { Avatar } from "@/components";

import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  item: string;
  index: number;
};

export const TodoAvatar: React.FC<TProps> = ({ item, index }) => {
  return (
    <TodoCircleBorderWrapper zIndex={5 - index}>
      <Avatar size="small" fullName={item} />
    </TodoCircleBorderWrapper>
  );
};
