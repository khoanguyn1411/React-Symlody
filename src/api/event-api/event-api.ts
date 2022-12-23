import { IEventDto } from "@/features/types";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { EventApiResponse } from "./types";

const BASE_URL = "event";
const eventUrlService = new ComposeUrlService(BASE_URL);

const eventUrls = eventUrlService.composeCommonAPIMethodUrls();

export const EventApi = {
  async getEvents(): Promise<EventApiResponse.GetEvents> {
    const url = eventUrls.getAndCreate;
    return composeHttpMethodResult(http.get<IEventDto[]>(url));
  },
};
