import React from "react";

import { Avatar } from "@/components";

import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

export const TodoNumberHolder: React.FC = () => {
  return (
    <TodoCircleBorderWrapper zIndex={0}>
      <Avatar
        fontSize={15}
        fontColor={"black"}
        fontWeight={600}
        backgroundColor="#dadee0"
        isFullText
        size="small"
        fullName="+15"
      />
    </TodoCircleBorderWrapper>
  );
};
