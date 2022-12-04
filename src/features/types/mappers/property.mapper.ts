import { FormatService, FormDataService } from "@/utils";

import { PropertyCreationDto, PropertyDto } from "../dtos";
import { Property, PropertyCreation } from "../models";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";
import { userMapper } from "./user.mapper";

export class PropertyMapper
  implements
    IMapperFromDto<PropertyDto, Property>,
    IMapperToCreationDto<PropertyCreationDto, PropertyCreation>
{
  public fromDto(dto: PropertyDto): Property {
    return {
      id: dto.id,
      lastModifiedBy: dto.last_modified_by,
      image: dto.image,
      organization: dto.organization,
      createdDate: dateMapper.fromDto(dto.created_date),
      lastModifiedDate: dateMapper.fromDto(dto.last_modified_date),
      archivedDate: dateMapper.fromDto(dto.archived_date),
      isArchived: dto.is_archived,
      propOwner: dto.prop_owner,
      name: dto.name,
      isClubProperty: dto.is_club_property,
      note: dto.note,
      archivedBy: dto.archived_by,
      price: FormatService.toString(dto.price),
      quantity: FormatService.toString(dto.quantity),
      inCharger: userMapper.fromDto(dto.incharger),
      createdBy: userMapper.fromDto(dto.created_by),
    };
  }

  public toCreationDto(model: PropertyCreation): PropertyCreationDto {
    return {
      name: model.name,
      is_club_property: model.isClubProperty,
      note: model.note,
      prop_owner: model.propOwner,
      incharger_id: model.inChargerId,
      image: model.image,
      price: model.price && FormatService.toNumber(model.price),
      quantity: model.quantity && FormatService.toNumber(model.quantity),
    };
  }

  public toFormData(model: PropertyCreation): FormData {
    const dataDto = this.toCreationDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
export const propertyMapper = new PropertyMapper();
