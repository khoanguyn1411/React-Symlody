import { Task } from "@/features/types";

export const COLOR_MAP = {
  [Task.StatusIds.InProgress]: "text-blue-500",
  [Task.StatusIds.Done]: "text-green-500",
  [Task.StatusIds.Review]: "text-yellow-500",
  [Task.StatusIds.Todo]: "text-red-400",
} as const;
