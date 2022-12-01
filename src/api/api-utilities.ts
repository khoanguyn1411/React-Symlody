import { ApiErrorResponse, ApiResponse } from "apisauce";

import { HttpErrorDto } from "@/features/types";

import { getGeneralApiProblem, Kind, Response } from "./api-response";

function isAxiosError(error: any): error is ApiErrorResponse<any> {
  const isRequestFailed = error.ok === false;
  const hasProblem = error.problem != null;
  const hasOriginalError = error.originalError;
  return isRequestFailed && hasProblem && hasOriginalError;
}

function validateHttpError<T>(
  error: Record<string, any>,
  kind: Kind
): error is HttpErrorDto<T> {
  const isNotExceedKey = Object.keys(error).length < 3;
  const hasError = error.error != null;
  const isBadData = kind === "bad-data";
  return isNotExceedKey && hasError && isBadData;
}

function assertsHttpErrorDto<T>(
  error: Record<string, any>,
  isHttpError: boolean
): asserts error is HttpErrorDto<T> {
  if (!isHttpError) {
    throw new Error("Invalid error.");
  }
}

function composeErrors<TResult, TError>(
  error: unknown
): Response<TResult, TError> {
  if (!isAxiosError(error)) {
    throw new Error("Invalid error.");
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

export async function composeHttpMethodResult<TResult, TError>(
  method: Promise<ApiResponse<TResult>>
): Promise<Response<TResult, TError>> {
  try {
    const response = await method;
    if (!response.ok) {
      return composeErrors<TResult, TError>(response);
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
