import { ETodoStatusId } from "@/features/types";

export const COLOR_MAP = {
  [ETodoStatusId.InProgress]: "text-blue-500",
  [ETodoStatusId.Done]: "text-green-500",
  [ETodoStatusId.Review]: "text-yellow-500",
  [ETodoStatusId.Todo]: "text-red-400",
} as const;
