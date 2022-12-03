import { UserDto } from "@/features/types";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getUsers: () => `user/`,
};

export const UserApi = {
  async getUsers(): Promise<Types.RequestGetUsersResult> {
    const url = routes.getUsers();
    const method = http.get<UserDto[]>(url);
    return composeHttpMethodResult(method);
  },
};
