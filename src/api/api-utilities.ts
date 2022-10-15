import { ApiResponse } from "apisauce";

import { getGeneralApiProblem } from "./api-problem";
import { Response } from "./types";
export function returnResponse<T>(response: ApiResponse<T>): Response<T> {
  try {
    if (response.ok) {
      return { kind: "ok", result: response.data };
    }
    if (!response.ok || response.problem) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }
  } catch {
    return { kind: "unknown", result: response };
  }
}
