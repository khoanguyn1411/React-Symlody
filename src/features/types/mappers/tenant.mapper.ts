import { ITenantCreateUpdateDto, ITenantDto } from "@/features/types";

import { ITenant, ITenantCreateUpdate } from "../models";

export class TenantMapper {
  public static fromDto(dto: ITenantDto): ITenant {
    return { ...dto };
  }

  public static toDto(model: ITenantCreateUpdate): ITenantCreateUpdateDto {
    return { ...model };
  }
}
