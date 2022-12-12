import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

import { Response } from "@/api";
import { DetailErrorDto, HttpError } from "@/features/types";
import {
  IMapperFromDto,
  IMapperToHttpError,
} from "@/features/types/mappers/base-mappers/mapper";

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
function extractErrorMessageFromArray(errors: string[]): string {
  if (errors.length === 0) {
    throw new Error("Empty errors array");
  }
  const error = errors[0];
  if (typeof error !== "string") {
    throw new Error(`String expected but ${typeof error} has gotten`);
  }
  return error;
}

type InputRequest<TDto, TModel, TCreation, TCreationDto> = {
  rejectWithValue: RejectWithValue<TCreation>;
  result: Response<TDto, TCreationDto>;
  fromDtoMapperSupport?: IMapperFromDto<TDto, TModel>;
  mapper:
    | IMapperToHttpError<TCreationDto, TCreation>
    | (IMapperFromDto<TDto, TModel> &
        IMapperToHttpError<TCreationDto, TCreation>);
  error?: any;
};

type RejectWithValue<T, E extends keyof T = undefined> = BaseThunkAPI<
  any,
  any,
  any,
  HttpError<T, E>
>["rejectWithValue"];

/** Validate simple request result. */
export function validateSimpleRequestResult<
  TDto extends Record<string, any>,
  TModel extends Record<string, any>,
  TCreation extends Record<string, any>,
  TCreationDto extends Record<string, any>,
  TKeyOfTCreation extends keyof TCreation = undefined
>({
  result,
  mapper,
  rejectWithValue,
  error = null,
  fromDtoMapperSupport,
}: InputRequest<TDto, TModel, TCreation, TCreationDto>):
  | ReturnType<RejectWithValue<TCreation, TKeyOfTCreation>>
  | TModel {
  if (result.kind === "ok") {
    const _mapper = mapper as IMapperFromDto<TDto, TModel> &
      IMapperToHttpError<TCreationDto, TCreation>;
    if (_mapper.fromDto) {
      return _mapper.fromDto(result.result);
    }
    if (fromDtoMapperSupport == null) {
      throw new Error(
        "Please provide an fromDto class to map the result to model. If it was in another mapper model, please use `fromDtoMapperSupport`. If not, please provide fromDto to mapper of corresponding model."
      );
    }
    return fromDtoMapperSupport.fromDto(result.result);
  }
  return catchHttpError(mapper, result, rejectWithValue, error);
}

/**
 * Catch httpError and map error to httpError model.
 * @param mapper Mapper object.
 * @param result Result of request.
 * @param rejectWithValue rejectWithValue function of redux thunk.
 * @param error Returned value when error is not "bad-data"
 */
export function catchHttpError<
  TDto,
  TCreation,
  TCreationDto extends Record<string, any>,
  TKeyOfTCreation extends keyof TCreation = undefined
>(
  mapper: IMapperToHttpError<TCreationDto, TCreation>,
  result: Response<TDto, TCreationDto>,
  rejectWithValue: RejectWithValue<TCreation, TKeyOfTCreation>,
  error = null
): ReturnType<RejectWithValue<TCreation, TKeyOfTCreation>> {
  if (result.kind === "bad-data") {
    const httpError = mapper.httpErrorFromDto(result.httpError);
    return rejectWithValue(httpError);
  }
  return rejectWithValue(error);
}
