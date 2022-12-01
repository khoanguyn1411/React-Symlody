import { IUserDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestGetUsersResult = Response<IUserDto[]>;
