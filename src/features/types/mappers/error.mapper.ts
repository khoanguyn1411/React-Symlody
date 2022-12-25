import { AppResponseDto } from "../dtos/app-response.dto";
import { ErrorResponse } from "../models/error-response";
import { IMapperToHttpError } from "./base-mappers/mapper";

interface ErrorFromDtoParams<Result, Error, ErrorDto> {
  errorDto: AppResponseDto<Result, ErrorDto>;
  httpErrorFromDtoMapper: IMapperToHttpError<
    ErrorDto,
    Error
  >["httpErrorFromDto"];
}

export class ErrorMapper {
  public fromDto<Result, Error, ErrorDto>({
    errorDto,
    httpErrorFromDtoMapper,
  }: ErrorFromDtoParams<Result, Error, ErrorDto>): ErrorResponse<Error> {
    return {
      kind: errorDto.kind,
      unknownError: errorDto.unknown_error_dto,
      httpError: httpErrorFromDtoMapper(errorDto.http_error_dto),
    };
  }
}

export const errorMapper = new ErrorMapper();
