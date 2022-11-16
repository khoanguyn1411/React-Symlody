import React, { useLayoutEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { setSelectedMemberList } from "@/features/reducers/task-reducer";
import { IUser, UserMapper } from "@/features/types";

import { DEFAULT_DISPLAY_MEMBER_COUNT } from "./constant";
import { TodoAvatar } from "./TodoAvatar";
import { TodoMemberViewLoading } from "./TodoMemberViewLoading";
import { TodoNumberHolder } from "./TodoNumberHolder";

type TProps = {
  isLoading: boolean;
};

export const TodoMemberView: React.FC<TProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const taskStore = useAppSelector((state) => state.task);
  const userList = useAppSelector(userSelectors.selectAll);
  const currentUserProfile = useAppSelector((state) => state.auth.user);

  const getUserWithCurrentUserList = () => {
    const _currentUser = UserMapper.fromProfile(currentUserProfile);
    const userListWithoutCurrentUser = userList.filter(
      (user) => user.email !== _currentUser.email
    );
    return [_currentUser].concat(userListWithoutCurrentUser);
  };

  const currentUserList = getUserWithCurrentUserList();

  const [selectedMembers, setSelectedMembers] = useState<IUser[]>(() => {
    if (taskStore.selectedMemberList === null) {
      return [
        currentUserList.find((user) => user.email === currentUserProfile.email),
      ];
    }
    return taskStore.selectedMemberList;
  });

  useLayoutEffect(() => {
    dispatch(setSelectedMemberList(selectedMembers));
  }, [dispatch, selectedMembers]);

  return (
    <div className="flex items-center mb-2 h-9 space-x-[-8px]">
      {isLoading && <TodoMemberViewLoading />}
      {!isLoading &&
        currentUserList
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
      {currentUserList.length > DEFAULT_DISPLAY_MEMBER_COUNT && (
        <TodoNumberHolder
          setSelectedMembers={setSelectedMembers}
          selectedMembers={selectedMembers}
          memberList={currentUserList.slice(
            DEFAULT_DISPLAY_MEMBER_COUNT,
            currentUserList.length
          )}
        />
      )}
    </div>
  );
};
