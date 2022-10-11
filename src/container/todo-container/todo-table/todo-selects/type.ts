import { ETodoStatusId } from "../../type";

export const COLOR_MAP = {
  [ETodoStatusId.InProgress]: "text-primary-800",
  [ETodoStatusId.Done]: "text-green-500",
  [ETodoStatusId.Review]: "text-primary-800",
  [ETodoStatusId.Todo]: "text-primary-800",
} as const;
