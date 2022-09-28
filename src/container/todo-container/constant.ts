import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";

import { ETodoStatusId, TODO_STATUS_MAP_FROM_ID, TTodo } from "./type";

export const TODO_NO_DATA_CONFIG: TNodataConfig = {
  title: "Tạo công việc",
  content: "Lên lịch và quản lý các công việc một cách dễ dàng và tiện lợi.",
  buttonTitle: "Tạo công việc",
  imageSrc: images.noData.todo,
};

export const TODO_DATA: TTodo = {
  id: "board-1",
  columns: [
    {
      boardId: "board-1",
      id: ETodoStatusId.Todo,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.Todo],
      cardOrder: ["card-1", "card-2", "card-3"],
      cards: [
        {
          id: "card-1",
          boardId: "board-1",
          columnId: ETodoStatusId.Todo,
          title: "Symlody - Thiết kế giao diện trang công việc",
          date: "01/10/2022",
          isPriority: true,
        },
        {
          id: "card-2",
          boardId: "board-1",
          columnId: ETodoStatusId.Todo,
          title: "Symlody - Thiết kế giao diện trang công việc",
          date: "01/10/2022",
          isPriority: true,
        },
        {
          id: "card-3",
          boardId: "board-1",
          columnId: ETodoStatusId.Todo,
          title: "Symlody - Thiết kế giao diện trang công việc",
          date: "01/10/2022",
          isPriority: true,
        },
      ],
    },
    {
      boardId: "board-1",
      id: ETodoStatusId.InProgress,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.InProgress],
      cardOrder: [],
      cards: [],
    },
    {
      boardId: "board-1",
      id: ETodoStatusId.Review,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.Review],
      cardOrder: [],
      cards: [],
    },
    {
      boardId: "board-1",
      id: ETodoStatusId.Done,
      title: TODO_STATUS_MAP_FROM_ID[ETodoStatusId.Done],
      cardOrder: ["card-5", "card-4"],
      cards: [
        {
          id: "card-4",
          boardId: "board-1",
          columnId: ETodoStatusId.Done,
          title: "Symlody - Developer 4",
          date: "01/10/2022",
          isPriority: false,
        },
        {
          id: "card-5",
          boardId: "board-1",
          columnId: ETodoStatusId.Done,
          title: "Symlody - Developer 5",
          date: "01/10/2022",
          isPriority: false,
        },
      ],
    },
  ],
};
