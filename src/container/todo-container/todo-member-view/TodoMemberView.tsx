import React, { useState } from "react";

import { DEFAULT_DISPLAY_MEMBER_COUNT, members } from "./constant";
import { TodoAvatar } from "./TodoAvatar";
import { TodoNumberHolder } from "./TodoNumberHolder";

export const TodoMemberView: React.FC = () => {
  const [selectedMembers, setSelectedMembers] = useState<typeof members>([]);
  return (
    <div className="flex items-center h-9 space-x-[-5px]">
      {members.slice(0, DEFAULT_DISPLAY_MEMBER_COUNT).map((item, index) => (
        <TodoAvatar
          setSelectedMembers={setSelectedMembers}
          selectedMembers={selectedMembers}
          item={item}
          key={index}
          index={index}
        />
      ))}
      {members.length > DEFAULT_DISPLAY_MEMBER_COUNT && (
        <TodoNumberHolder
          setSelectedMembers={setSelectedMembers}
          selectedMembers={selectedMembers}
          memberList={members.slice(
            DEFAULT_DISPLAY_MEMBER_COUNT,
            members.length
          )}
        />
      )}
    </div>
  );
};
