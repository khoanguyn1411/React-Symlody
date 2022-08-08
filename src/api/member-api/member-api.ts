import { ApiResponse, ApisauceInstance } from "apisauce";

import { IMember, IMemberPost } from "@/features/types/member-type";

import { API_URL } from "../api-config";
import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";
const prefix = API_URL + "/api";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  createMember: () => `${prefix}/member/`,
  getMembers: () => `${prefix}/member/`,
};

export const MemberApi = {
  async getMembers(): Promise<Types.RequestGetMembersResult> {
    const url = routes.getMembers();
    const result: ApiResponse<IMember[]> = await api.get(url);

    return returnResponse(result);
  },

  async createMember(
    body: Types.RequestCreateMemberBody
  ): Promise<Types.RequestCreateMembersResult> {
    const url = routes.getMembers();
    const result: ApiResponse<IMemberPost> = await api.post(url, { ...body });

    return returnResponse(result);
  },
};
