import { Icon } from "@/assets/icons";

import { ETodoStatusId } from "../type";
import { ITodoTable, TPriority } from "./type";

export const PRIORITY_LIST: TPriority[] = [
  {
    isPriority: true,
    icon: <Icon.ArrowUp size="small" customColor="warning" />,
  },
  {
    isPriority: false,
    icon: <Icon.Hamburger2 size="small" />,
  },
];

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
