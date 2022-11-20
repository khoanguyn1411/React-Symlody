import { ITenantDto } from "@/features/types";

import { ITenant } from "../models";

export class TenantMapper {
  public static fromDto(dto: ITenantDto): ITenant {
    return { ...dto };
  }

  public static toDto(model: ITenant): ITenantDto {
    return { ...model };
  }
}
