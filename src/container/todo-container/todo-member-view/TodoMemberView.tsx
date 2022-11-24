import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

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

  const [selectedMembers, setSelectedMembers] = useState<IUser[]>(
    taskStore.listQueryTask.selected_member_list
  );

  const getUserWithCurrentUserList = useCallback(() => {
    const _currentUser = UserMapper.fromProfile(currentUserProfile);
    const userListWithoutCurrentUser = userList.filter(
      (user) => user.id !== _currentUser.id
    );
    return [_currentUser].concat(userListWithoutCurrentUser);
  }, [currentUserProfile, userList]);

  const [currentUserList, setCurrentUserList] = useState(() =>
    getUserWithCurrentUserList()
  );

  const isShowCollapsedView =
    currentUserList.length > DEFAULT_DISPLAY_MEMBER_COUNT;

  useEffect(() => {
    setCurrentUserList(getUserWithCurrentUserList());
  }, [currentUserProfile, getUserWithCurrentUserList]);

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
      {isShowCollapsedView && (
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
