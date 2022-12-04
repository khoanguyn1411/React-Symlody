import { Task, TodoStatusId } from "@/features/types";
import { compareDateWithToday } from "@/utils/services/compare-service";

export const checkStatusOfExpiredDate = (task: Task) => {
  const dateComparedResult = compareDateWithToday(task.endDate);
  return {
    is(status: typeof dateComparedResult) {
      const isTaskNotDone = task.status !== TodoStatusId.Done;
      const isMatchStatus = status === dateComparedResult;
      if (!isTaskNotDone) {
        return status === "in-future";
      }
      return isMatchStatus;
    },
  };
};
