import {
  AppResponseDto,
  MemberCreationDto,
  MemberDto,
} from "@/features/types/dtos";

export namespace MemberApiResponse {
  export type GetMembers = AppResponseDto<MemberDto[]>;
  export type CreateMember = AppResponseDto<MemberDto, MemberCreationDto>;
  export type DeleteMember = AppResponseDto<boolean>;
  export type UpdateMember = AppResponseDto<MemberDto, MemberCreationDto>;
  export type UploadExcel = AppResponseDto<boolean>;
}
