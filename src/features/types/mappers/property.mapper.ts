import { IPropertyDto } from "../dtos";
import { IProperty } from "../models";
import { ProfileMapper } from "./profile.mapper";

export class PropertyMapper {
  public static fromDto(dto: IPropertyDto): IProperty {
    return { ...dto, incharger: ProfileMapper.fromDto(dto.incharger) };
  }

  public static toDto(model: IProperty): IPropertyDto {
    return { ...model, incharger: ProfileMapper.toDto(model.incharger) };
  }
}
