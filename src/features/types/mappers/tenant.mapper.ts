import { ITenantCreateUpdateDto, ITenantDto } from "@/features/types";
import { FormDataService } from "@/utils";

import { ITenant, ITenantCreateUpdate } from "../models";

export class TenantMapper {
  public static fromDto(dto: ITenantDto): ITenant {
    return { ...dto };
  }

  public static toDto(model: ITenantCreateUpdate): ITenantCreateUpdateDto {
    return { ...model };
  }

  public static toFormData(model: ITenantCreateUpdateDto): FormData {
    const dataDto = this.toDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
