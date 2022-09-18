import { IPropertyDto } from "../dtos";
import { IProperty } from "../models";
import { ProfileMapper } from "./profile.mapper";

export class PropertyMapper {
  public static fromDto(dto: IPropertyDto): IProperty {
    return {
      ...dto,
      price: dto.price.toString(),
      quantity: dto.price.toString(),
      incharger: ProfileMapper.fromDto(dto.incharger),
    };
  }

  public static toDto(model: IProperty): IPropertyDto {
    return {
      ...model,
      price: model.price && Number(model.price),
      quantity: model.price && Number(model.quantity),
      incharger: ProfileMapper.toDto(model.incharger),
    };
  }
}
