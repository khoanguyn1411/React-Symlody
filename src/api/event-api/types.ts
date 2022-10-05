import { IEventDto } from "@/features/types";

import { GeneralApiProblem } from "../api-problem";

export type RequestGetEventResult =
  | {
      kind: `ok`;
      result: IEventDto[];
    }
  | GeneralApiProblem;
