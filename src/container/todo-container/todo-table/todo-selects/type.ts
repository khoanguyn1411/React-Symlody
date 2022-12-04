import { TodoStatusId } from "@/features/types";

export const COLOR_MAP = {
  [TodoStatusId.InProgress]: "text-blue-500",
  [TodoStatusId.Done]: "text-green-500",
  [TodoStatusId.Review]: "text-yellow-500",
  [TodoStatusId.Todo]: "text-red-400",
} as const;
