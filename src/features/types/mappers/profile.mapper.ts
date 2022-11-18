import { IProfileDto } from "../dtos";
import { IProfile } from "../models";
import { DepartmentMapper } from "./department.mapper";

export class ProfileMapper {
  public static fromDto(dto: IProfileDto): IProfile {
    return { ...dto, department: DepartmentMapper.fromDto(dto.department) };
  }
}
