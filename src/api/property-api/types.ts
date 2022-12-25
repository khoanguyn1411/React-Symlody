import {
  AppResponseDto,
  PropertyCreationDto,
  PropertyDto,
} from "@/features/types/dtos";

export namespace PropertyApiResponse {
  export type GetProperties = AppResponseDto<PropertyDto[]>;
  export type CreateProperty = AppResponseDto<PropertyDto, PropertyCreationDto>;
  export type DeleteProperty = AppResponseDto<boolean>;
  export type UpdateProperty = AppResponseDto<PropertyDto, PropertyCreationDto>;
}
