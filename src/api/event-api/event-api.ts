import { IEventDto } from "@/features/types";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "event";
const eventUrls = new ComposeUrlService(BASE_URL);

const apiModuleUrls = eventUrls.composeCommonAPIMethodUrls();

export const EventApi = {
  async getEvents(): Promise<Types.RequestGetEventResult> {
    const url = apiModuleUrls.getAndCreate;
    return composeHttpMethodResult(http.get<IEventDto[]>(url));
  },
};
