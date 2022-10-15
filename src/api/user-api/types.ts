import { IUserDto } from "@/features/types/dtos";

import { Response } from "../types";

export type RequestGetUsersResult = Response<IUserDto[]>;
