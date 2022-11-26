import { ETodoStatusId, ITask } from "@/features/types";
import { compareDateWithToday } from "@/utils/services/compare-service";

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
