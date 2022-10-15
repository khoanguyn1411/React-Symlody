import { IMemberCreateUpdateDto, IMemberDto } from "@/features/types/dtos";

import { Response } from "../types";

export type RequestCreateMemberBody = IMemberCreateUpdateDto;
export type RequestUpdateMemberBody = IMemberCreateUpdateDto;

export type RequestGetMembersResult = Response<IMemberDto[]>;
export type RequestCreateMembersResult = Response<IMemberDto>;
export type RequestDeleteMembersResult = Response<boolean>;
export type RequestUpdateMembersResult = RequestCreateMembersResult;
