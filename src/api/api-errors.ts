import { ApiErrorResponse } from "apisauce";

import { DetailErrorDto, HttpErrorDto } from "@/features/types";
import { AppResponseDto } from "@/features/types/dtos/app-response.dto";
import { RecordObject } from "@/utils/types";

import { getGeneralApiProblem, Kind } from "./api-response";

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

  public composeErrors<TResultDto, TErrorDto>(
    error: unknown
  ): AppResponseDto<TResultDto, TErrorDto> {
    if (!this.isAxiosError(error)) {
      return {
        kind: "unknown",
        result_dto: null,
        unknown_error_dto: error,
        http_error_dto: null,
      };
    }
    const kind = getGeneralApiProblem(error);
    const isHttpError = this.validateHttpError(error.data, kind);
    if (isHttpError) {
      const rootHttpError = error.data;
      let httpError: AppResponseDto<TResultDto, TErrorDto>["http_error_dto"];
      if (Array.isArray(rootHttpError)) {
        httpError = {
          non_field_errors: rootHttpError,
        } as HttpErrorDto<TErrorDto>;
      } else if (this.isErrorWithDetail<TErrorDto>(rootHttpError)) {
        httpError = rootHttpError.details;
      } else if (this.isErrorWithError(rootHttpError)) {
        httpError = {
          non_field_errors: [rootHttpError.error],
        } as HttpErrorDto<TErrorDto>;
      } else if (this.isErrorWithArrayDetails(rootHttpError)) {
        httpError = {
          non_field_errors: rootHttpError.details,
        } as HttpErrorDto<TErrorDto>;
      } else {
        httpError = rootHttpError as HttpErrorDto<TErrorDto>;
      }
      return {
        kind: kind,
        result_dto: null,
        unknown_error_dto: null,
        http_error_dto: httpError,
      };
    }
    return {
      kind: kind,
      result_dto: null,
      unknown_error_dto: error.data,
      http_error_dto: null,
    };
  }
}

export const apiError = new ApiError();
