import { IEventDto } from "@/features/types";

import { Response } from "../api-response";

export type RequestGetEventResult = Response<IEventDto[]>;
