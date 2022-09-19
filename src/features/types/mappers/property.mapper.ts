import { IPropertyCreateUpdateDto, IPropertyDto } from "../dtos";
import { IProperty, IPropertyCreateUpdate } from "../models";
import { ProfileMapper } from "./profile.mapper";

export class PropertyMapper {
  public static fromDto(dto: IPropertyDto): IProperty {
    return {
      ...dto,
      price: dto.price.toString(),
      quantity: dto.quantity.toString(),
      incharger: ProfileMapper.fromDto(dto.incharger),
    };
  }

  public static toDto(model: IPropertyCreateUpdate): IPropertyCreateUpdateDto {
    return {
      ...model,
      price: model.price && Number(model.price),
      quantity: model.quantity && Number(model.quantity),
    };
  }
}
