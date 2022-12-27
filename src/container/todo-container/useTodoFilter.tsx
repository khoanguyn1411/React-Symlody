import { useEffect, useLayoutEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/features";
import {
  getTasksAsync,
  setCurrentTaskList,
  taskSelectors,
  userSelectors,
} from "@/features/reducers";

export const useTodoFilter = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const taskList = useAppSelector(taskSelectors.selectAll);
  const userList = useAppSelector(userSelectors.selectAll);
  const taskStore = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const filterByAssignee = () => {
    const selectedMemberIdsList =
      taskStore.filterParamsTask.selectedMemberList.map((member) => member.id);

    if (selectedMemberIdsList.length === 0) {
      dispatch(setCurrentTaskList(taskList));
      return;
    }
    const newTaskList = taskList.filter((task) => {
      const taskInfo = userList.find((user) => user.id === task.assignee.id);
      if (taskInfo) {
        return selectedMemberIdsList.includes(taskInfo.id);
      }
    });
    dispatch(setCurrentTaskList(newTaskList));
  };

  useEffect(() => {
    filterByAssignee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList, taskStore.filterParamsTask.selectedMemberList, userList]);

  useLayoutEffect(() => {
    const { departmentId } = taskStore.filterParamsTask;
    if (!departmentId) {
      return;
    }
    dispatch(
      getTasksAsync({
        ...taskStore.filterParamsTask,
        departmentId: departmentId ?? currentUser.department.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, taskStore.filterParamsTask.departmentId]);
};
