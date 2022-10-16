import { GeneralApiProblem } from "./api-problem";

export type Response<T> = GeneralApiProblem | { kind: "ok"; result: T };
