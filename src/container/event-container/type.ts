import { EEventStatus } from "./constant";

export interface TEventTable {
  eventName: string;
  time: string;
  status: EEventStatus;
}

export interface TFormEventInfo {
  eventName: string;
  startTime: string;
  endTime: string;
  place: string;
  status: EEventStatus;
  department: string;
  description: string;
}
