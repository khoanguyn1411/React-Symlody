import { IProperty } from "@/features/types";
import { FormatService } from "@/utils";

import { IFormPropertyInfo, IPropertyTable } from "./type";

export class PropertyFormMapper {
  public static fromModel(model: IProperty): IFormPropertyInfo {
    return {
      assetName: model.name,
      quantity: model.quantity.toString(),
      price:
        model.price !== "0"
          ? FormatService.toCurrency(Number(model.price))
          : "",
      inCharge: model.incharger.last_name + " " + model.incharger.first_name,
      owner: model.prop_owner,
      note: model.note,
      imageLink: model.image,
    };
  }
}

export class PropertyTableMapper {
  public static fromModel(model: IProperty): IPropertyTable {
    return {
      assetName: model.name,
      quantity: model.quantity,
      price:
        model.price !== "0"
          ? FormatService.toCurrency(Number(model.price))
          : "--",
      inCharge: model.incharger.last_name + " " + model.incharger.first_name,
      owner: model.prop_owner,
    };
  }
}
