import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";
import { ETodoStatusId } from "@/features/types";
import { GeneratorService } from "@/utils";

import { TODO_STATUS_MAP_FROM_ID } from "./mapper";
import { TTodo } from "./type";

export const TODO_NO_DATA_CONFIG: TNodataConfig = {
  title: "Tạo công việc",
  content: "Lên lịch và quản lý các công việc một cách dễ dàng và tiện lợi.",
  buttonTitle: "Tạo công việc",
  imageSrc: images.noData.todo,
};

export const TODO_MESSAGES =
  GeneratorService.generateStatusMessageFor("công việc");

export const TODO_DATA: TTodo = {
  id: "board-1",
  columns: [
    {
      color: "blue",
      boardId: "board-1",
      id: ETodoStatusId.Todo,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.Todo],
      cardOrder: [],
      cards: [],
    },
    {
      color: "blue",
      boardId: "board-1",
      id: ETodoStatusId.InProgress,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.InProgress],
      cardOrder: [],
      cards: [],
    },
    {
      color: "blue",
      boardId: "board-1",
      id: ETodoStatusId.Review,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.Review],
      cardOrder: [],
      cards: [],
    },
    {
      color: "green",
      boardId: "board-1",
      id: ETodoStatusId.Done,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.Done],
      cardOrder: [],
      cards: [],
    },
  ],
};
