import { AppResponseDto } from "..";
import { HttpError } from "./http-error";

export interface ErrorResponse<
  Error,
  KeyOfError extends keyof Error = undefined
> extends Pick<AppResponseDto<unknown, Error>, "kind"> {
  readonly unknownError: unknown;
  readonly httpError: HttpError<Error, KeyOfError>;
}
