import { GeneralApiProblem } from "./api-problem";

export type Response<T> = GeneralApiProblem<T> | { kind: "ok"; result: T };
