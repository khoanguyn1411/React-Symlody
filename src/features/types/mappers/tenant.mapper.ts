import { ITenantDto } from "@/features/types";

import { ITenant } from "../models";

export class TenantMapper {
  public static fromDto(dto: ITenantDto): ITenant {
    return { ...dto };
  }
}
