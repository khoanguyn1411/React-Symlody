import { FormDataService } from "@/utils";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto, PropertyCreationDto, PropertyDto } from "../dtos";
import { HttpError, Property, PropertyCreation } from "../models";
import { dateMapper } from "./base-mappers/date.mapper";
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";
import { userMapper } from "./user.mapper";

export class PropertyMapper
  implements
    IMapperFromDto<PropertyDto, Property>,
    IMapperToCreationDto<PropertyCreationDto, PropertyCreation>,
    IMapperToHttpError<PropertyCreationDto, PropertyCreation>
{
  public httpErrorFromDto(
    errorDto: HttpErrorDto<PropertyCreationDto>
  ): HttpError<PropertyCreation> {
    const {
      name,
      is_club_property,
      note,
      prop_owner,
      incharger_id,
      image,
      price,
      quantity,
      non_field_errors,
    } = errorDto;
    return {
      name: extractErrorMessage(name),
      isClubProperty: extractErrorMessage(is_club_property),
      note: extractErrorMessage(note),
      propOwner: extractErrorMessage(prop_owner),
      inChargerId: extractErrorMessage(incharger_id),
      image: extractErrorMessage(image),
      price: extractErrorMessage(price),
      quantity: extractErrorMessage(quantity),
      non_field_errors: extractErrorMessage(non_field_errors),
    };
  }
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
      price: dto.price,
      quantity: dto.quantity,
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
      image: model.image ?? undefined,
      price: model.price,
      quantity: model.quantity,
    };
  }

  public toFormData(model: PropertyCreation): FormData {
    const dataDto = this.toCreationDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
export const propertyMapper = new PropertyMapper();
