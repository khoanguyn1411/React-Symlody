import { ETodoStatusId } from "../type";
import { ITodoTable } from "./type";

export const PRIORITY_LIST: boolean[] = [true, false];

export const MOCK_DATA_TODO: ITodoTable[] = [
  {
    id: 1,
    job: "Something",
    isPriority: false,
    expiredDate: "12/22/1111",
    status: ETodoStatusId.InProgress,
    assignee: "Khoa Nguyen",
  },
  {
    id: 1,
    job: "Something",
    isPriority: true,
    expiredDate: "12/22/1111",
    status: ETodoStatusId.InProgress,
    assignee: "Khoa Nguyen",
  },

  {
    id: 1,
    job: "Something",
    isPriority: true,
    expiredDate: "12/22/1111",
    status: ETodoStatusId.InProgress,
    assignee: "Khoa Nguyen",
  },
  {
    id: 1,
    job: "Something",
    isPriority: true,
    expiredDate: "12/22/1111",
    status: ETodoStatusId.InProgress,
    assignee: "Khoa Nguyen",
  },
  {
    id: 1,
    job: "Something",
    isPriority: true,
    expiredDate: "12/22/1111",
    status: ETodoStatusId.InProgress,
    assignee: "Khoa Nguyen",
  },
  {
    id: 1,
    job: "Something",
    isPriority: true,
    expiredDate: "12/22/1111",
    status: ETodoStatusId.InProgress,
    assignee: "Khoa Nguyen",
  },
];
