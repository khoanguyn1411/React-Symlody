import { PropertyFilterParamsDto } from "../../dtos/filter-params/property-filter-params.dto";
import { PropertyFilterParams } from "../../models/filter-params/property-filter-params";
import { IMapperToDto } from "../base-mappers/mapper";

export class PropertyFilterParamsMapper
  implements IMapperToDto<PropertyFilterParamsDto, PropertyFilterParams>
{
  public toDto(data: PropertyFilterParams): PropertyFilterParamsDto {
    return {
      is_archived: data.isArchived === null ? undefined : data.isArchived,
    };
  }
}
export const propertyFilterParamsMapper = new PropertyFilterParamsMapper();
