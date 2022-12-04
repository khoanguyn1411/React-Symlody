import { Property, PropertyCreation } from "@/features/types";
import { FormatService } from "@/utils";

import { IFormPropertyInfo, IPropertyTable } from "./type";

export class PropertyFormMapper {
  public static fromModel(model: Property): IFormPropertyInfo {
    return {
      assetName: model.name,
      quantity: FormatService.toString(model.quantity),
      price: model.price !== "0" ? FormatService.toCurrency(model.price) : "",
      inChargeId: model.inCharger.id,
      owner: model.propOwner,
      note: model.note ?? "",
      imageLink: model.image,
    };
  }
  public static toModel(propertyFormData: IFormPropertyInfo): PropertyCreation {
    return {
      name: propertyFormData.assetName,
      quantity: propertyFormData.quantity,
      price: FormatService.removeFormatCurrency(propertyFormData.price),
      propOwner: propertyFormData.owner,
      note: propertyFormData.note,
      inChargerId: propertyFormData.inChargeId,
      image: propertyFormData.image,
      isClubProperty: propertyFormData.owner === "CLB",
    };
  }
}

export class PropertyTableMapper {
  public static fromModel(model: Property): IPropertyTable {
    return {
      assetName: model.name,
      quantity: model.quantity,
      price: model.price !== "0" ? FormatService.toCurrency(model.price) : "--",
      inCharge: model.inCharger.fullName,
      owner: model.propOwner,
    };
  }
}
