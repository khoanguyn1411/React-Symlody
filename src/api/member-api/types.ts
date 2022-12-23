import { MemberCreationDto, MemberDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export namespace MemberApiResponse {
  export type GetMembers = Response<MemberDto[]>;
  export type CreateMember = Response<MemberDto, MemberCreationDto>;
  export type DeleteMember = Response<boolean>;
  export type UpdateMember = Response<MemberDto, MemberCreationDto>;
  export type UploadExcel = Response<boolean>;
}
