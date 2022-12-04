import { PropertyFilterParamsDto } from "../../dtos/filter-params/property-filter-params.dto";
import { PropertyFilterParams } from "../../models/filter-params/property-filter-params";

export class PropertyFilterParamsMapper {
  public static toDto(data: PropertyFilterParams): PropertyFilterParamsDto {
    return {
      is_archived: data.isArchived,
    };
  }
}
