import {
  HttpErrorDto,
  OrganizationCreationDto,
  OrganizationDto,
} from "@/features/types";
import { FormDataService } from "@/utils";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpError, Organization, OrganizationCreation } from "../models";
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";

export class OrganizationMapper
  implements
    IMapperFromDto<OrganizationDto, Organization>,
    IMapperToCreationDto<OrganizationCreationDto, OrganizationCreation>,
    IMapperToHttpError<OrganizationCreationDto, OrganizationCreation>
{
  public httpErrorFromDto(
    errorDto: HttpErrorDto<OrganizationCreationDto>
  ): HttpError<OrganizationCreation> {
    const {
      name,
      abbreviation_name,
      email,
      phone_number,
      school,
      address,
      logo,
    } = errorDto;
    return {
      name: extractErrorMessage(name),
      abbreviationName: extractErrorMessage(abbreviation_name),
      email: extractErrorMessage(email),
      phoneNumber: extractErrorMessage(phone_number),
      school: extractErrorMessage(school),
      address: extractErrorMessage(address),
      logo: extractErrorMessage(logo),
    };
  }
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
