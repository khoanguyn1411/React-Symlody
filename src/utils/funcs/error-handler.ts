import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

import { AppResponseDto, DetailErrorDto } from "@/features/types";
import { IMapperToHttpError } from "@/features/types/mappers/base-mappers/mapper";
import { errorMapper } from "@/features/types/mappers/error.mapper";
import { ErrorResponse } from "@/features/types/models/error-response";

import { RecordObject } from "../types";

export interface InputRequest<TDto, TCreation, TCreationDto> {
  rejectWithValue: RejectWithValue<TCreation>;
  result: AppResponseDto<TDto, TCreationDto>;
  mapper: IMapperToHttpError<TCreationDto, TCreation>;
  error?: any;
}

export type RejectWithValue<T> = BaseThunkAPI<
  any,
  any,
  any,
  ErrorResponse<T>
>["rejectWithValue"];

export namespace ErrorHandler {
  /**
   * Extract errors message from error data.
   * @param errorData Error data.
   * @returns The first item if error data is a array of error messages.
   * Error message from non_field_errors if it presented.
   * Error message of the first key if error data is error for composite object like City: { id, name }.
   */
  export function extractErrorMessage<T>(
    errorData: DetailErrorDto<T> | string[] | null | undefined
  ): string | undefined {
    if (errorData == null) {
      return;
    }
    if (Array.isArray(errorData)) {
      return extractErrorMessageFromArray(errorData);
    }
    if (typeof errorData === "object") {
      // Otherwise extract an error from first property.
      const key = Object.keys(errorData)[0] as keyof T;
      return extractErrorMessage(errorData[key] as any);
    }
    return void 0;
  }

  /**
   * Extracts a string error from an array of errors.
   * @param errors Errors array.
   * @returns Extracted error string.
   */
  export function extractErrorMessageFromArray(errors: string[]): string {
    if (errors.length === 0) {
      throw new Error("Empty errors array");
    }
    const error = errors[0];
    if (typeof error !== "string") {
      throw new Error(`String expected but ${typeof error} has gotten`);
    }
    return error;
  }

  /**
   * Catch httpError and map error to httpError model.
   * @param mapper Mapper object.
   * @param result Result of request.
   * @param rejectWithValue rejectWithValue function of redux thunk.
   * @param error Returned value when error is not "bad-data"
   * @return Returned value of rejectWithValue function of Redux toolkit.
   */
  export function catchErrors<
    TDto,
    TCreation extends RecordObject,
    TCreationDto extends RecordObject
  >(
    config: InputRequest<TDto, TCreation, TCreationDto>
  ): ReturnType<RejectWithValue<TCreation>> {
    const { result, mapper, rejectWithValue, error = null } = config;
    if (error) {
      return error;
    }
    const errors = errorMapper.fromDto({
      errorDto: result,
      httpErrorFromDtoMapper: mapper.httpErrorFromDto,
    });
    return rejectWithValue(errors);
  }
}
