import { ITaskCreateUpdate } from "@/features/types/models/task";

import { IFormTodoInfo } from "./type";

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
}
