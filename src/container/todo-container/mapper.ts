import { User } from "@/features/types";
import {
  Task,
  TaskCreation,
  TodoStatus,
  TodoStatusId,
} from "@/features/types/models/task";
import { FormatService } from "@/utils";
import { generatePlaceholderEmptyValue } from "@/utils/services/generate-service";

import { UNASSIGNED_TEXT } from "./constant";
import { ITodoTable, TodoForm } from "./type";

export const TODO_STATUS_MAP_FROM_ID: Readonly<
  Record<TodoStatusId, TodoStatus>
> = {
  [TodoStatusId.Todo]: TodoStatus.Todo,
  [TodoStatusId.InProgress]: TodoStatus.InProgress,
  [TodoStatusId.Review]: TodoStatus.Review,
  [TodoStatusId.Done]: TodoStatus.Done,
};

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
      avatar: assignee?.avatar ?? "",
      isUnassigned,
      title: generatePlaceholderEmptyValue(model.title),
      expiredDate: model.endDate
        ? FormatService.toDateString(model.endDate, "VN")
        : generatePlaceholderEmptyValue(model.endDate),
    };
  }
}

export const todoViewMapper = new TodoViewMapper();
export const todoFormMapper = new TodoFormMapper();
