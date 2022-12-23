import { User } from "@/features/types";
import { Task, TaskCreation } from "@/features/types/models/task";
import { DateService } from "@/utils/funcs/date-service";
import { generatePlaceholderEmptyValue } from "@/utils/funcs/generate-place-holder";

import { UNASSIGNED_TEXT } from "./constant";
import { ITodoTable, TodoForm } from "./type";

class TodoFormMapper {
  public toModel(formData: TodoForm): TaskCreation {
    return {
      ...formData,
      assignee: {
        id: formData.assignee,
      },
      reporter: {
        id: formData.reporter,
      },
    };
  }

  public fromModel(model: TaskCreation): TodoForm {
    return {
      ...model,
      assignee: model.assignee.id,
      reporter: model.reporter.id,
    };
  }
}

class TodoViewMapper {
  public fromModel(userList: User[], model: Task): ITodoTable {
    const assignee = userList.find((user) => user.id === model.assignee.id);
    const fullName = assignee?.fullName ?? UNASSIGNED_TEXT;
    const isUnassigned = fullName === UNASSIGNED_TEXT;
    return {
      fullName: isUnassigned ? UNASSIGNED_TEXT : fullName,
      avatar: assignee?.avatarUrl ?? "",
      isUnassigned,
      title: generatePlaceholderEmptyValue(model.title),
      expiredDate: model.endDate
        ? DateService.toFormat(model.endDate, "VN")
        : generatePlaceholderEmptyValue(model.endDate),
    };
  }
}

export const todoViewMapper = new TodoViewMapper();
export const todoFormMapper = new TodoFormMapper();
