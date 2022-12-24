import { ApiResponse } from "apisauce";

import { AppResponseDto } from "@/features/types/dtos/app-response.dto";

import { apiError } from "./api-errors";

export async function composeHttpMethodResult<TResultDto, TErrorDto>(
  method: Promise<ApiResponse<TResultDto>>
): Promise<AppResponseDto<TResultDto, TErrorDto>> {
  try {
    const response = await method;
    if (!response.ok) {
      return apiError.composeErrors<TResultDto, TErrorDto>(response);
    }
    return {
      kind: "ok",
      result_dto: response.data,
      unknown_error_dto: null,
      http_error_dto: null,
    };
  } catch (error: unknown) {
    return apiError.composeErrors(error);
  }
}
