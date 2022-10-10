import { ApiResponse } from "apisauce";

import { GeneralApiProblem, getGeneralApiProblem } from "./api-problem";

export type Response<T> = (GeneralApiProblem | { kind: "ok" | "bad-data" }) & {
  result: T;
};

export function returnResponse<T>(result: ApiResponse<T>): Response<T> {
  try {
    if (result.ok) {
      return { kind: "ok", result: result.data };
    }
    if (!result.ok || result.problem) {
      const problem = getGeneralApiProblem(result);
      if (problem) return { ...problem, result: result.data };
    }
  } catch {
    return { kind: `bad-data`, result: null };
  }
}
