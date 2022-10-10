import React, { useState } from "react";

import { DEFAULT_DISPLAY_MEMBER_COUNT, members } from "./constant";
import { TodoAvatar } from "./TodoAvatar";
import { TodoNumberHolder } from "./TodoNumberHolder";

export const TodoMemberView: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<typeof members>([]);
  return (
    <div className="flex items-center h-9 space-x-[-5px]">
      {members.slice(0, DEFAULT_DISPLAY_MEMBER_COUNT).map((item, index) => (
        <TodoAvatar
          setSelectedMember={setSelectedMember}
          selectedMember={selectedMember}
          item={item}
          key={index}
          index={index}
        />
      ))}
      {members.length > DEFAULT_DISPLAY_MEMBER_COUNT && (
        <TodoNumberHolder
          setSelectedMember={setSelectedMember}
          selectedMember={selectedMember}
          memberList={members.slice(
            DEFAULT_DISPLAY_MEMBER_COUNT,
            members.length
          )}
        />
      )}
    </div>
  );
};
