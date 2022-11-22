import { HttpErrorDto } from "../dtos";
import { HttpError } from "../models";

export class HttpErrorMapper {
  /**
   * Maps dto to model.
   * @param httpDto HttpError dto.
   */
  public static fromDto(httpDto: HttpErrorDto): HttpError {
    return new HttpError({
      error: httpDto.error,
      details: httpDto.details,
      errorArray: Array.isArray(httpDto.details)
        ? (httpDto.details as string[])
        : [],
    });
  }
}
