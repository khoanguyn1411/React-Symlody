import { ITaskCreateUpdate } from "@/features/types/models/task";

import { EPriority, IFormTodoInfo } from "./type";

export class TodoFormMapper {
  public static toModel(formData: IFormTodoInfo): ITaskCreateUpdate {
    return {
      title: formData.name,
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
}
