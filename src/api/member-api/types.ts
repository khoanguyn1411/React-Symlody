import {
  IFileUploadedDto,
  IMemberCreateUpdateDto,
  IMemberDto,
} from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestCreateMemberBody = IMemberCreateUpdateDto;
export type RequestUpdateMemberBody = IMemberCreateUpdateDto;
export type RequestUploadMemberExcelFile = IFileUploadedDto;

export type RequestGetMembersResult = Response<IMemberDto[]>;
export type RequestCreateMembersResult = Response<IMemberDto>;
export type RequestDeleteMembersResult = Response<boolean>;
export type RequestUpdateMembersResult = Response<IMemberDto>;
export type RequestUploadMemberExcelFileResult = Response<boolean>;
