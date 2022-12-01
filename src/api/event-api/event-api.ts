import { ApiResponse } from "apisauce";

import { IEventDto } from "@/features/types";

import { http } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getEvent: () => `event/`,
};

export const EventApi = {
  async getEvents(): Promise<Types.RequestGetEventResult> {
    const url = routes.getEvent();
    const result: ApiResponse<IEventDto[]> = await http.get(url);

    return returnResponse(result);
  },
};
