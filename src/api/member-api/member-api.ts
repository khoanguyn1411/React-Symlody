import { ApiResponse, ApisauceInstance } from "apisauce";

import { IMemberDto, IMemberDtoCU } from "@/features/types";
import { TParamQueryMemberDto } from "@/features/types/queries";

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
  async getMembers(
    param?: TParamQueryMemberDto
  ): Promise<Types.RequestGetMembersResult> {
    const url = routes.getMembers();
    const result: ApiResponse<IMemberDto[]> = await api.get(url, { ...param });

    return returnResponse(result);
  },

  async createMember(
    body: Types.RequestCreateMemberBody
  ): Promise<Types.RequestCreateMembersResult> {
    const url = routes.getMembers();
    const result: ApiResponse<IMemberDtoCU> = await api.post(url, { ...body });

    return returnResponse(result);
  },
};
