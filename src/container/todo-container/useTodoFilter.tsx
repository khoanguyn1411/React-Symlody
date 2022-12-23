import { useAppDispatch, useAppSelector } from "@/features";
import {
  setCurrentTaskList,
  taskSelectors,
  userSelectors,
} from "@/features/reducers";

export const useTodoFilter = () => {
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

  return { filterByAssignee };
};
