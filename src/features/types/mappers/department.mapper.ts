import { ErrorHandler } from "@/utils/funcs/error-handler";

import { DepartmentCreationDto, DepartmentDto, HttpErrorDto } from "../dtos";
import { Department, DepartmentCreation, HttpError } from "../models";
import { dateMapper } from "./base-mappers/date.mapper";
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";

export class DepartmentMapper
  implements
    IMapperFromDto<DepartmentDto, Department>,
    IMapperToCreationDto<DepartmentCreationDto, DepartmentCreation>,
    IMapperToHttpError<DepartmentCreationDto, DepartmentCreation>
{
  public httpErrorFromDto(
    errorDto: HttpErrorDto<DepartmentCreationDto>
  ): HttpError<DepartmentCreation> {
    return {
      name:
        ErrorHandler.extractErrorMessage(errorDto.name) ??
        ErrorHandler.extractErrorMessage(errorDto.non_field_errors),
      abbreviationName: ErrorHandler.extractErrorMessage(
        errorDto.abbreviation_name
      ),
    };
  }

  public fromDto(dto: DepartmentDto): Department {
    return {
      id: dto.id,
      name: dto.name,
      abbreviationName: dto.abbreviation_name,
      memberCount: dto.member_count,
      createdDate: dateMapper.fromDto(dto.created_date),
    };
  }

  public toCreationDto(model: DepartmentCreation): DepartmentCreationDto {
    return {
      name: model.name,
      abbreviation_name: model.abbreviationName,
    };
  }
}

export const departmentMapper = new DepartmentMapper();
