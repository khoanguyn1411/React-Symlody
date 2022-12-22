import { Response } from "@/api";
import {
  IMapperFromDto,
  IMapperToHttpError,
} from "@/features/types/mappers/base-mappers/mapper";

import { RecordObject } from "../types";
import { ErrorHandler, RejectWithValue } from "./error-handler";

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

/**
 * Validate simple request result.
 * @param data Included such keys:
 * - `result`: Result of request.
 * - `rejectWithValue`: rejectWithValue function of redux thunk.
   - `mapper`: Mapper supported function of entity.
 * - `error`: Returned value when error is not "bad-data"
 * - `fromDtoMapperSupport`: Mapper supported fromDto.
 */
export function validateSimpleRequestResult<
  TDto,
  TModel extends RecordObject,
  TCreation extends RecordObject,
  TCreationDto extends RecordObject,
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
  return ErrorHandler.catchHttpError(mapper, result, rejectWithValue, error);
}
