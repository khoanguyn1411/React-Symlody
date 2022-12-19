import { ApiResponse } from "apisauce";

import { apiError } from "./api-errors";
import { Response } from "./api-response";

export async function composeHttpMethodResult<TResult, TError>(
  method: Promise<ApiResponse<TResult>>
): Promise<Response<TResult, TError>> {
  try {
    const response = await method;
    if (!response.ok) {
      return apiError.composeErrors<TResult, TError>(response);
    }
    return {
      kind: "ok",
      result: response.data,
      unknownError: null,
      httpError: null,
    };
  } catch (error: unknown) {
    return apiError.composeErrors(error);
  }
}
