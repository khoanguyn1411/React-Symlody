import {
  FileUploadedDto,
  MemberCreationDto,
  MemberDto,
} from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestUploadMemberExcelFile = Response<FileUploadedDto>;

export type RequestGetMembersResult = Response<MemberDto[]>;
export type RequestCreateMembersResult = Response<MemberDto, MemberCreationDto>;
export type RequestDeleteMembersResult = Response<boolean>;
export type RequestUpdateMembersResult = Response<MemberDto, MemberCreationDto>;
export type RequestUploadMemberExcelFileResult = Response<boolean>;
