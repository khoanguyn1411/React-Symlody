import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";
import { Task, TASK_STATUS_FROM_ID_TO_READABLE } from "@/features/types";
import { generateStatusMessageFor } from "@/utils/funcs/generate-app-status-messages";

import { TTodo } from "./type";

export const TODO_NO_DATA_CONFIG: TNodataConfig = {
  title: "Tạo công việc",
  content: "Lên lịch và quản lý các công việc một cách dễ dàng và tiện lợi.",
  buttonTitle: "Tạo công việc",
  imageSrc: images.noData.todo,
};

export const TODO_MESSAGES = generateStatusMessageFor("công việc");

export const UNASSIGNED_TEXT = "Chưa giao";

export const TODO_DATA: TTodo = {
  id: "board-1",
  columns: [
    {
      color: "blue",
      boardId: "board-1",
      id: Task.StatusIds.Todo,
      title: TASK_STATUS_FROM_ID_TO_READABLE[Task.StatusIds.Todo],
      cardOrder: [],
      cards: [],
    },
    {
      color: "blue",
      boardId: "board-1",
      id: Task.StatusIds.InProgress,
      title: TASK_STATUS_FROM_ID_TO_READABLE[Task.StatusIds.InProgress],
      cardOrder: [],
      cards: [],
    },
    {
      color: "blue",
      boardId: "board-1",
      id: Task.StatusIds.Review,
      title: TASK_STATUS_FROM_ID_TO_READABLE[Task.StatusIds.Review],
      cardOrder: [],
      cards: [],
    },
    {
      color: "green",
      boardId: "board-1",
      id: Task.StatusIds.Done,
      title: TASK_STATUS_FROM_ID_TO_READABLE[Task.StatusIds.Done],
      cardOrder: [],
      cards: [],
    },
  ],
};
