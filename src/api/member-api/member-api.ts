import { IMember, IMemberDto } from "@/features/types";
import { TMemberParamQueryDto } from "@/features/types/queries";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";
const routes = {
  createMember: () => `member/`,
  getMembers: () => `member/`,
  updateMember: (id: IMember["id"]) => `member/${id}/`,
  deleteMember: (id: IMember["id"]) => `member/archive/${id}/`,
  uploadMemberExcelFile: () => `member/bulk/`,
};

export const MemberApi = {
  async getMembers(
    param: TMemberParamQueryDto
  ): Promise<Types.RequestGetMembersResult> {
    const url = routes.getMembers();
    const method = http.get<IMemberDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async deleteMember(
    id: IMember["id"]
  ): Promise<Types.RequestDeleteMembersResult> {
    const url = routes.deleteMember(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  },

  async createMember(
    body: Types.RequestCreateMemberBody
  ): Promise<Types.RequestCreateMembersResult> {
    const url = routes.createMember();
    const method = http.post<IMemberDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async updateMember(
    id: IMember["id"],
    body: Types.RequestUpdateMemberBody
  ): Promise<Types.RequestUpdateMembersResult> {
    const url = routes.updateMember(id);
    const method = http.patch<IMemberDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async uploadMemberExcelFile(
    body: FormData
  ): Promise<Types.RequestUploadMemberExcelFileResult> {
    const url = routes.uploadMemberExcelFile();
    const method = http.post<boolean>(url, body);
    return composeHttpMethodResult(method);
  },
};
