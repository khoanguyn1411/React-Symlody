import React, { useState } from "react";

import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { IUser } from "@/features/types";

import { DEFAULT_DISPLAY_MEMBER_COUNT } from "./constant";
import { TodoAvatar } from "./TodoAvatar";
import { TodoMemberViewLoading } from "./TodoMemberViewLoading";
import { TodoNumberHolder } from "./TodoNumberHolder";

export const TodoMemberView: React.FC = () => {
  const userList = useAppSelector(userSelectors.selectAll);
  const userStore = useAppSelector((state) => state.user);
  const userCount = useAppSelector(userSelectors.selectTotal);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [selectedMembers, setSelectedMembers] = useState<IUser[]>([
    userList.find((user) => user.id === currentUser.id),
  ]);
  return (
    <div className="flex items-center mb-2 h-9 space-x-[-8px]">
      {userStore.pending && <TodoMemberViewLoading />}
      {!userStore.pending &&
        userList
          .slice(0, DEFAULT_DISPLAY_MEMBER_COUNT)
          .map((user, index) => (
            <TodoAvatar
              setSelectedMembers={setSelectedMembers}
              selectedMembers={selectedMembers}
              user={user}
              key={index}
              index={index}
            />
          ))}
      {userCount > DEFAULT_DISPLAY_MEMBER_COUNT && (
        <TodoNumberHolder
          setSelectedMembers={setSelectedMembers}
          selectedMembers={selectedMembers}
          memberList={userList.slice(DEFAULT_DISPLAY_MEMBER_COUNT, userCount)}
        />
      )}
    </div>
  );
};
