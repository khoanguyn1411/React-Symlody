import { Member, MemberCreationDto, MemberDto } from "@/features/types";
import { MemberFilterParamsDto } from "@/features/types/dtos/filter-params";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "member";
const memberUrlService = new ComposeUrlService(BASE_URL);

const memberUrls = {
  ...memberUrlService.composeCommonAPIMethodUrls(),
  delete: (id: Member["id"]) =>
    memberUrlService.composeWith(["archive", `${id}`]),
  uploadMemberExcelFile: memberUrlService.composeWith(["bulk"]),
};

export const MemberApi = {
  async getMembers(
    param: MemberFilterParamsDto
  ): Promise<Types.RequestGetMembersResult> {
    const url = memberUrls.getAndCreate;
    const method = http.get<MemberDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async deleteMember(
    id: Member["id"]
  ): Promise<Types.RequestDeleteMembersResult> {
    const url = memberUrls.delete(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  },

  async createMember(
    body: MemberCreationDto
  ): Promise<Types.RequestCreateMembersResult> {
    const url = memberUrls.getAndCreate;
    const method = http.post<MemberDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async updateMember(
    id: Member["id"],
    body: MemberCreationDto
  ): Promise<Types.RequestUpdateMembersResult> {
    const url = memberUrls.updateAndDeleteWithId(id);
    const method = http.patch<MemberDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async uploadMemberExcelFile(
    body: FormData
  ): Promise<Types.RequestUploadMemberExcelFileResult> {
    const url = memberUrls.uploadMemberExcelFile;
    const method = http.post<boolean>(url, body);
    return composeHttpMethodResult(method);
  },
};
