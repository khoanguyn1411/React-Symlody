import { IEventDto } from "@/features/types";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getEvent: () => `event/`,
};

export const EventApi = {
  async getEvents(): Promise<Types.RequestGetEventResult> {
    const url = routes.getEvent();
    return composeHttpMethodResult(http.get<IEventDto[]>(url));
  },
};
