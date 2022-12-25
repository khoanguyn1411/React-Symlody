import { Kind } from "@/api";
import { HttpErrorDto } from "@/features/types";

export type AppResponseDto<TResultDto, TErrorDto = TResultDto> = {
  readonly kind: Kind;
  readonly result_dto: TResultDto;
  readonly unknown_error_dto: unknown;
  readonly http_error_dto: HttpErrorDto<TErrorDto>;
};
