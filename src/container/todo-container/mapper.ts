import { ITask, ITaskCreateUpdate } from "@/features/types/models/task";
import { FormatService } from "@/utils";
import { generatePlaceholderEmptyValue } from "@/utils/services/generate-service";

import { EPriority, IFormTodoInfo, ITodoTable } from "./type";

export class TodoFormMapper {
  public static toModel(formData: IFormTodoInfo): ITaskCreateUpdate {
    return {
      title: formData.name,
      isPriority: formData.priority === EPriority.High,
      assignee: {
        id: formData.assignee,
      },
      reporter: {
        id: formData.reporter,
      },
      description: formData.description,
      end_date: formData.expiredDate,
      sent_email: false,
    };
  }

  public static fromModel(model: ITaskCreateUpdate): IFormTodoInfo {
    return {
      name: model.title,
      priority: model.isPriority ? EPriority.High : EPriority.Normal,
      expiredDate: model.end_date,
      assignee: model.assignee.id,
      reporter: model.reporter.id,
      description: model.description,
    };
  }

  public static toTableView(model: ITask): ITodoTable {
    return {
      title: generatePlaceholderEmptyValue(model.title),
      expiredDate: model.end_date
        ? FormatService.toDate(model.end_date, "VN")
        : generatePlaceholderEmptyValue(model.end_date),
    };
  }
}
