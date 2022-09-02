import { EEventStatus } from "../../constant";

export const TYPE_MAP = {
  [EEventStatus.Incoming]: "text-primary-800 border-primary-800 bg-primary-50",
  [EEventStatus.Ongoing]: "text-success-600 border-success-600 bg-success-50",
  [EEventStatus.End]: "text-alert-400 border-alert-400 bg-alert-50",
} as const;
