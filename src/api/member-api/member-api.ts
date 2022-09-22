import { IMember, IMemberDto } from "@/features/types";
import { TMemberParamQueryDto } from "@/features/types/queries";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";
const routes = {
  createMember: () => `member/`,
  getMembers: () => `member/`,
  updateMember: (id: IMember["id"]) => `member/${id}`,
  deleteMember: (id: IMember["id"]) => `member/archive/${id}`,
};

export const MemberApi = {
  async getMembers(
    param: TMemberParamQueryDto
  ): Promise<Types.RequestGetMembersResult> {
    const url = routes.getMembers();
    const result = await Api.http.get<IMemberDto[]>(url, { ...param });

    return returnResponse(result);
  },

  async deleteMember(
    id: IMember["id"]
  ): Promise<Types.RequestDeleteMembersResult> {
    const url = routes.deleteMember(id);
    const result = await Api.http.delete<boolean>(url);

    return returnResponse(result);
  },

  async createMember(
    body: Types.RequestCreateMemberBody
  ): Promise<Types.RequestCreateMembersResult> {
    const url = routes.createMember();
    const result = await Api.http.post<IMemberDto>(url, body);

    return returnResponse(result);
  },

  async updateMember(
    id: IMember["id"],
    body: Types.RequestUpdateMemberBody
  ): Promise<Types.RequestUpdateMembersResult> {
    const url = routes.updateMember(id);
    const result = await Api.http.patch<IMemberDto>(url, body);
    return returnResponse(result);
  },
};
