import { ApiErrorResponse, ApiResponse } from "apisauce";

import { HttpErrorDto } from "@/features/types";

import { getGeneralApiProblem, Kind, Response } from "./api-response";

function isAxiosError(error: any): error is ApiErrorResponse<any> {
  const isRequestFailed = error.ok === false;
  const hasProblem = error.problem != null;
  const hasOriginalError = error.originalError;
  return isRequestFailed && hasProblem && hasOriginalError;
}

function validateHttpError(error: any, kind: Kind): error is HttpErrorDto {
  const isNotExceedKey = Object.keys(error).length < 3;
  const hasError = error.error != null;
  const isBadData = kind === "bad-data";
  return isNotExceedKey && hasError && isBadData;
}

function composeErrors<T>(error: unknown): Response<T> {
  if (!isAxiosError(error)) {
    throw new Error("Invalid error.");
  }
  const kind = getGeneralApiProblem(error);
  const isHttpError = validateHttpError(error.data, kind);
  return {
    kind: kind,
    result: null,
    unknownError: !isHttpError ? null : error.data,
    httpError: isHttpError ? error.data : null,
  };
}

export async function composeHttpMethodResult<T>(
  method: Promise<ApiResponse<T>>
): Promise<Response<T>> {
  try {
    const response = await method;
    if (!response.ok) {
      return composeErrors(response);
    }
    return {
      kind: "ok",
      result: response.data,
      unknownError: null,
      httpError: null,
    };
  } catch (error: unknown) {
    return composeErrors(error);
  }
}
