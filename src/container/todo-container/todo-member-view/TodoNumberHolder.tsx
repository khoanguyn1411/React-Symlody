import React from "react";

import { Avatar } from "@/components";

import { ZINDEX_SETTING } from "./constant";
import { TodoCircleBorderWrapper } from "./TodoCircleBorderWrapper";

type TProps = {
  memberList: string[];
};

export const TodoNumberHolder: React.FC<TProps> = ({ memberList }) => {
  return (
    <TodoCircleBorderWrapper zIndex={ZINDEX_SETTING.NUMBER_HOLDER}>
      <Avatar
        fontSize={15}
        fontColor={"black"}
        fontWeight={600}
        backgroundColor="#dadee0"
        isFullText
        size="small"
        fullName={`+${memberList && memberList.length}`}
      />
    </TodoCircleBorderWrapper>
  );
};
