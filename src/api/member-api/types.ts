import {
  IFileUploadedDto,
  MemberCreationDto,
  MemberDto,
} from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestCreateMemberBody = MemberCreationDto;
export type RequestUpdateMemberBody = MemberCreationDto;
export type RequestUploadMemberExcelFile = IFileUploadedDto;

export type RequestGetMembersResult = Response<MemberDto[]>;
export type RequestCreateMembersResult = Response<MemberDto, MemberCreationDto>;
export type RequestDeleteMembersResult = Response<boolean>;
export type RequestUpdateMembersResult = Response<MemberDto, MemberCreationDto>;
export type RequestUploadMemberExcelFileResult = Response<boolean>;
