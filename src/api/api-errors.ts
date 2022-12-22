import { ApiErrorResponse } from "apisauce";

import { DetailErrorDto, HttpErrorDto } from "@/features/types";
import { RecordObject } from "@/utils/types";

import { getGeneralApiProblem, Kind, Response } from "./api-response";

class ApiError {
  private isAxiosError(error: any): error is ApiErrorResponse<any> {
    const isRequestFailed = error.ok === false;
    const hasProblem = error.problem != null;
    const hasOriginalError = error.originalError;
    return isRequestFailed && hasProblem && hasOriginalError;
  }

  private validateHttpError<T>(
    _error: RecordObject,
    kind: Kind
  ): _error is HttpErrorDto<T> {
    return kind === "bad-data";
  }

  private isErrorWithDetail<T>(
    error: RecordObject
  ): error is { error: string; details: DetailErrorDto<T> } {
    const isNotExceedKey = Object.keys(error).length < 3;
    const hasDetails = error.details != null;
    const hasError = error.error != null;
    return isNotExceedKey && hasDetails && hasError;
  }

  private isErrorWithError(error: RecordObject): error is { error: string } {
    const isNotExceedKey = Object.keys(error).length === 1;
    const hasError = error.error != null;
    return hasError && isNotExceedKey;
  }

  private isErrorWithArrayDetails(
    error: RecordObject
  ): error is { details: string[] } {
    const isNotExceedKey = Object.keys(error).length === 1;
    const hasDetails = error.details != null;
    const isArray = Array.isArray(error.details);
    return hasDetails && isArray && isNotExceedKey;
  }

  public composeErrors<TResult, TError>(
    error: unknown
  ): Response<TResult, TError> {
    if (!this.isAxiosError(error)) {
      return {
        kind: "unknown",
        result: null,
        unknownError: error,
        httpError: null,
      };
    }
    const kind = getGeneralApiProblem(error);
    const isHttpError = this.validateHttpError(error.data, kind);
    if (isHttpError) {
      const rootHttpError = error.data;
      let httpError: Response<TResult, TError>["httpError"];
      if (Array.isArray(rootHttpError)) {
        httpError = { non_field_errors: rootHttpError } as HttpErrorDto<TError>;
      } else if (this.isErrorWithDetail<TError>(rootHttpError)) {
        httpError = rootHttpError.details;
      } else if (this.isErrorWithError(rootHttpError)) {
        httpError = {
          non_field_errors: [rootHttpError.error],
        } as HttpErrorDto<TError>;
      } else if (this.isErrorWithArrayDetails(rootHttpError)) {
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
}

export const apiError = new ApiError();
