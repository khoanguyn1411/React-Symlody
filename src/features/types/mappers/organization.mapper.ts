import { OrganizationCreationDto, OrganizationDto } from "@/features/types";
import { FormDataService } from "@/utils";

import { Organization, OrganizationCreation } from "../models";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";

export class OrganizationMapper
  implements
    IMapperFromDto<OrganizationDto, Organization>,
    IMapperToCreationDto<OrganizationCreationDto, OrganizationCreation>
{
  public fromDto(dto: OrganizationDto): Organization {
    return {
      id: dto.id,
      email: dto.email,
      phoneNumber: dto.phone_number,
      abbreviationName: dto.abbreviation_name,
      school: dto.school,
      address: dto.address,
      logo: dto.logo,
      name: dto.name,
    };
  }

  public toCreationDto(model: OrganizationCreation): OrganizationCreationDto {
    return {
      name: model.name,
      abbreviation_name: model.abbreviationName,
      email: model.email,
      phone_number: model.phoneNumber,
      school: model.school,
      address: model.address,
      logo: model.logo,
    };
  }

  public toFormData(model: OrganizationCreation): FormData {
    const dataDto = this.toCreationDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}

export const organizationMapper = new OrganizationMapper();
