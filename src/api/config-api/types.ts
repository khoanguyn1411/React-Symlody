import {
  AppResponseDto,
  OrganizationCreationDto,
  OrganizationDto,
  UserShortDto,
} from "@/features/types/dtos";
import {
  LeadersAndManagersDto,
  UserPermissionConfigCreationDto,
} from "@/features/types/dtos/config-permission.dto";

export namespace ConfigApiResponse {
  export type GetOrganization = AppResponseDto<OrganizationDto>;
  export type UpdateOrganization = AppResponseDto<
    OrganizationDto,
    OrganizationCreationDto
  >;

  export type GetConfigManager = AppResponseDto<LeadersAndManagersDto>;
  export type UpdateConfigManager = AppResponseDto<LeadersAndManagersDto>;
  export type UpdateConfigRoleUser = AppResponseDto<
    UserShortDto,
    UserPermissionConfigCreationDto
  >;
}
