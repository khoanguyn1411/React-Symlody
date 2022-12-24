import { AppResponseDto, IEventDto } from "@/features/types";

export namespace EventApiResponse {
  export type GetEvents = AppResponseDto<IEventDto[]>;
}
