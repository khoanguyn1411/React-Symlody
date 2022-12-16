import { Property, PropertyCreation } from "@/features/types";
import { CurrencyService } from "@/utils/funcs/currency-service";

import { IPropertyTable, PropertyForm } from "./type";

export class PropertyFormMapper {
  public fromModel(model: Property): PropertyForm {
    return {
      name: model.name,
      quantity: model.quantity.toString(),
      price: model.price !== 0 ? CurrencyService.toCurrency(model.price) : "",
      inChargerId: model.inCharger.id,
      propOwner: model.propOwner,
      note: model.note,
      imageLink: model.image,
      image: null,
    };
  }
  public toModel(propertyFormData: PropertyForm): PropertyCreation {
    return {
      name: propertyFormData.name,
      quantity: Number(propertyFormData.quantity),
      price: Number(
        CurrencyService.removeFormatCurrency(propertyFormData.price)
      ),
      propOwner: propertyFormData.propOwner,
      note: propertyFormData.note,
      inChargerId: propertyFormData.inChargerId,
      image: propertyFormData.image,
      isClubProperty: propertyFormData.propOwner === "CLB",
    };
  }
}

export class PropertyTableMapper {
  public fromModel(model: Property): IPropertyTable {
    return {
      assetName: model.name,
      quantity: model.quantity,
      price: model.price !== 0 ? CurrencyService.toCurrency(model.price) : "--",
      inCharge: model.inCharger.fullName,
      owner: model.propOwner,
    };
  }
}

export const propertyTableMapper = new PropertyTableMapper();
export const propertyFormMapper = new PropertyFormMapper();
