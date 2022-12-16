import {
  HttpErrorDto,
  OrganizationCreationDto,
  OrganizationDto,
} from "@/features/types";
import { ErrorHandler } from "@/utils/funcs/error-handler";
import { repairFormData } from "@/utils/funcs/repair-form-data";

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
      name: ErrorHandler.extractErrorMessage(name),
      abbreviationName: ErrorHandler.extractErrorMessage(abbreviation_name),
      email: ErrorHandler.extractErrorMessage(email),
      phoneNumber: ErrorHandler.extractErrorMessage(phone_number),
      school: ErrorHandler.extractErrorMessage(school),
      address: ErrorHandler.extractErrorMessage(address),
      logo: ErrorHandler.extractErrorMessage(logo),
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
    return repairFormData(dataDto);
  }
}

export const organizationMapper = new OrganizationMapper();
