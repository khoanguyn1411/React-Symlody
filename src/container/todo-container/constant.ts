import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";
import { TodoStatusId } from "@/features/types";
import { generateStatusMessageFor } from "@/utils/services/generate-service";

import { TODO_STATUS_MAP_FROM_ID } from "./mapper";
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
      id: TodoStatusId.Todo,
      title: TODO_STATUS_MAP_FROM_ID[TodoStatusId.Todo],
      cardOrder: [],
      cards: [],
    },
    {
      color: "blue",
      boardId: "board-1",
      id: TodoStatusId.InProgress,
      title: TODO_STATUS_MAP_FROM_ID[TodoStatusId.InProgress],
      cardOrder: [],
      cards: [],
    },
    {
      color: "blue",
      boardId: "board-1",
      id: TodoStatusId.Review,
      title: TODO_STATUS_MAP_FROM_ID[TodoStatusId.Review],
      cardOrder: [],
      cards: [],
    },
    {
      color: "green",
      boardId: "board-1",
      id: TodoStatusId.Done,
      title: TODO_STATUS_MAP_FROM_ID[TodoStatusId.Done],
      cardOrder: [],
      cards: [],
    },
  ],
};
