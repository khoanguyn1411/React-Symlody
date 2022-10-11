import { IUserDto } from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getUsers: () => `user/`,
};

export const UserApi = {
  async getUsers(): Promise<Types.RequestGetUsersResult> {
    const url = routes.getUsers();
    const result = await Api.http.get<IUserDto[]>(url);
    return returnResponse(result);
  },
};
