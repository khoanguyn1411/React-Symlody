import { ETodoStatusId, ITask, IUser } from "@/features/types";
import { compareDateWithToday } from "@/utils/services/compare-service";

export const getTaskCommonInfo = (userList: IUser[], task: ITask) => {
  const assignee = userList.find((user) => user.id === task.assignee.id);
  const fullName = assignee?.full_name ?? "";
  return {
    fullName: fullName,
    avatar: assignee?.avatar ?? "",
    isUnassigned: fullName === "",
  };
};

export const checkStatusOfExpiredDate = (task: ITask) => {
  const dateComparedResult = compareDateWithToday(task.end_date);
  return {
    is(status: typeof dateComparedResult) {
      const isTaskNotDone = task.status !== ETodoStatusId.Done;
      const isMatchStatus = status === dateComparedResult;
      if (!isTaskNotDone) {
        return status === "in-future";
      }
      return isMatchStatus;
    },
  };
};
