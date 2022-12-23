import { Task } from "@/features/types";
import { DateService } from "@/utils/funcs/date-service";

export const checkStatusOfExpiredDate = (task: Task) => {
  const dateComparedResult = DateService.compareWithToday(task.endDate);
  return {
    is(status: typeof dateComparedResult) {
      const isTaskNotDone = task.status !== Task.StatusIds.Done;
      const isMatchStatus = status === dateComparedResult;
      if (!isTaskNotDone) {
        return status === "in-future";
      }
      return isMatchStatus;
    },
  };
};
