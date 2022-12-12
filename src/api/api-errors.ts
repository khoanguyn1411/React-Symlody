import { ApiErrorResponse } from "apisauce";

import { DetailErrorDto, HttpErrorDto } from "@/features/types";

import { getGeneralApiProblem, Kind, Response } from "./api-response";

export function isAxiosError(error: any): error is ApiErrorResponse<any> {
  const isRequestFailed = error.ok === false;
  const hasProblem = error.problem != null;
  const hasOriginalError = error.originalError;
  return isRequestFailed && hasProblem && hasOriginalError;
}

export function validateHttpError<T>(
  _error: Record<string, any>,
  kind: Kind
): _error is HttpErrorDto<T> {
  return kind === "bad-data";
}

export function isErrorWithDetail<T>(
  error: Record<string, any>
): error is { error: string; details: DetailErrorDto<T> } {
  const isNotExceedKey = Object.keys(error).length < 3;
  const hasDetails = error.details != null;
  const hasError = error.error != null;
  return isNotExceedKey && hasDetails && hasError;
}

export function isErrorWithError(
  error: Record<string, any>
): error is { error: string } {
  const isNotExceedKey = Object.keys(error).length === 1;
  const hasError = error.error != null;
  return hasError && isNotExceedKey;
}

export function isErrorWithArrayDetails(
  error: Record<string, any>
): error is { details: string[] } {
  const isNotExceedKey = Object.keys(error).length === 1;
  const hasDetails = error.details != null;
  const isArray = Array.isArray(error.details);
  return hasDetails && isArray && isNotExceedKey;
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
    const rootHttpError = error.data;
    let httpError: Response<TResult, TError>["httpError"];
    if (Array.isArray(rootHttpError)) {
      httpError = { non_field_errors: rootHttpError } as HttpErrorDto<TError>;
    } else if (isErrorWithDetail<TError>(rootHttpError)) {
      httpError = rootHttpError.details;
    } else if (isErrorWithError(rootHttpError)) {
      httpError = {
        non_field_errors: [rootHttpError.error],
      } as HttpErrorDto<TError>;
    } else if (isErrorWithArrayDetails(rootHttpError)) {
      httpError = {
        non_field_errors: rootHttpError.details,
      } as HttpErrorDto<TError>;
    } else {
      httpError = rootHttpError as HttpErrorDto<TError>;
    }
    return {
      kind: kind,
      result: null,
      unknownError: null,
      httpError: httpError,
    };
  }
  return {
    kind: kind,
    result: null,
    unknownError: error.data,
    httpError: null,
  };
}
