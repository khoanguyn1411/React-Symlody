import { Property, PropertyCreation } from "@/features/types";
import { FormatService } from "@/utils";

import { IPropertyTable, PropertyForm } from "./type";

export class PropertyFormMapper {
  public static fromModel(model: Property): PropertyForm {
    return {
      name: model.name,
      quantity: FormatService.toString(model.quantity),
      price: model.price !== 0 ? FormatService.toCurrency(model.price) : "",
      inChargerId: model.inCharger.id,
      propOwner: model.propOwner,
      note: model.note,
      imageLink: model.image,
      image: null,
    };
  }
  public static toModel(propertyFormData: PropertyForm): PropertyCreation {
    return {
      name: propertyFormData.name,
      quantity: Number(propertyFormData.quantity),
      price: Number(FormatService.removeFormatCurrency(propertyFormData.price)),
      propOwner: propertyFormData.propOwner,
      note: propertyFormData.note,
      inChargerId: propertyFormData.inChargerId,
      image: propertyFormData.image,
      isClubProperty: propertyFormData.propOwner === "CLB",
    };
  }
}

export class PropertyTableMapper {
  public static fromModel(model: Property): IPropertyTable {
    return {
      assetName: model.name,
      quantity: model.quantity,
      price: model.price !== 0 ? FormatService.toCurrency(model.price) : "--",
      inCharge: model.inCharger.fullName,
      owner: model.propOwner,
    };
  }
}
