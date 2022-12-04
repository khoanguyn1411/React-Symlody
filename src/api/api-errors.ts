import { ApiErrorResponse } from "apisauce";

import { HttpErrorDto } from "@/features/types";

import { getGeneralApiProblem, Kind, Response } from "./api-response";

export function isAxiosError(error: any): error is ApiErrorResponse<any> {
  const isRequestFailed = error.ok === false;
  const hasProblem = error.problem != null;
  const hasOriginalError = error.originalError;
  return isRequestFailed && hasProblem && hasOriginalError;
}

export function validateHttpError<T>(
  error: Record<string, any>,
  kind: Kind
): error is HttpErrorDto<T> {
  const isNotExceedKey = Object.keys(error).length < 3;
  const hasError = error.error != null;
  const isBadData = kind === "bad-data";
  return isNotExceedKey && hasError && isBadData;
}

export function assertsHttpErrorDto<T>(
  error: Record<string, any>,
  isHttpError: boolean
): asserts error is HttpErrorDto<T> {
  if (!isHttpError) {
    throw new Error("Invalid error.");
  }
}

export function composeErrors<TResult, TError>(
  error: unknown
): Response<TResult, TError> {
  if (!isAxiosError(error)) {
    return {
      kind: "unknown",
      result: null,
      unknownError: error,
      httpError: null,
    };
  }
  const kind = getGeneralApiProblem(error);
  const isHttpError = validateHttpError(error.data, kind);
  if (isHttpError) {
    assertsHttpErrorDto<TError>(error.data, isHttpError);
    return {
      kind: kind,
      result: null,
      unknownError: null,
      httpError: error.data,
    };
  }
  return {
    kind: kind,
    result: null,
    unknownError: error.data,
    httpError: null,
  };
}
