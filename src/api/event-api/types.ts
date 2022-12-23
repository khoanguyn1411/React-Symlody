import { IEventDto } from "@/features/types";

import { Response } from "../api-response";

export namespace EventApiResponse {
  export type GetEvents = Response<IEventDto[]>;
}
