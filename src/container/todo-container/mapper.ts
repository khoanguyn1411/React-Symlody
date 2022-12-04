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
import { IFormTodoInfo, ITodoTable, Priority } from "./type";

export const TODO_STATUS_MAP_FROM_ID: Readonly<
  Record<TodoStatusId, TodoStatus>
> = {
  [TodoStatusId.Todo]: TodoStatus.Todo,
  [TodoStatusId.InProgress]: TodoStatus.InProgress,
  [TodoStatusId.Review]: TodoStatus.Review,
  [TodoStatusId.Done]: TodoStatus.Done,
};

export class TodoFormMapper {
  public static toModel(formData: IFormTodoInfo): TaskCreation {
    return {
      title: formData.name,
      isPriority: formData.priority === Priority.High,
      assignee: {
        id: formData.assignee,
      },
      reporter: {
        id: formData.reporter,
      },
      description: formData.description,
      endDate: formData.expiredDate,
      isSentEmail: formData.isNotifyEmail,
    };
  }

  public static fromModel(model: TaskCreation): IFormTodoInfo {
    return {
      name: model.title,
      priority: model.isPriority ? Priority.High : Priority.Normal,
      expiredDate: model.endDate,
      assignee: model.assignee.id,
      reporter: model.reporter.id,
      description: model.description,
      isNotifyEmail: model.isSentEmail,
    };
  }
}

export class TodoViewMapper {
  public static fromModel(userList: User[], model: Task): ITodoTable {
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
