import React, { useState } from "react";

import { DEFAULT_DISPLAY_MEMBER_COUNT } from "./constant";
import { TodoAvatar } from "./TodoAvatar";
import { TodoNumberHolder } from "./TodoNumberHolder";

const members = [
  "Khoa",
  "Lam",
  "Truong",
  "Ca",
  "Linh",
  "Hao",
  "Conan",
  "Hoang",
  "Nguyen",
  "Funny",
  "Sad",
];

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
          memberList={members.slice(
            DEFAULT_DISPLAY_MEMBER_COUNT,
            members.length
          )}
        />
      )}
    </div>
  );
};
