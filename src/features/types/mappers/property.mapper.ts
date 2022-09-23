import { FormatService } from "@/utils";

import { IPropertyCreateUpdateDto, IPropertyDto } from "../dtos";
import { IProperty, IPropertyCreateUpdate } from "../models";
import { ProfileMapper } from "./profile.mapper";

export class PropertyMapper {
  public static fromDto(dto: IPropertyDto): IProperty {
    return {
      ...dto,
      price: FormatService.toString(dto.price),
      quantity: FormatService.toString(dto.quantity),
      incharger: ProfileMapper.fromDto(dto.incharger),
      created_by: ProfileMapper.fromDto(dto.created_by),
    };
  }

  public static toDto(model: IPropertyCreateUpdate): IPropertyCreateUpdateDto {
    return {
      ...model,
      price: model.price && FormatService.toNumber(model.price),
      quantity: model.quantity && FormatService.toNumber(model.quantity),
    };
  }
}
