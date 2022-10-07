import React from "react";

import { TodoAvatar } from "./TodoAvatar";
import { TodoNumberHolder } from "./TodoNumberHolder";

const members = [
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
  "SDDD",
];

export const TodoMemberView: React.FC = () => {
  return (
    <div className="flex space-x-[-5px]">
      {members.slice(0, 5).map((item, index) => (
        <TodoAvatar item={item} key={index} index={index} />
      ))}
      {members.length > 5 && members.slice(5, members.length) && (
        <TodoNumberHolder />
      )}
    </div>
  );
};
