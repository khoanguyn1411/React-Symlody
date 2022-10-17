import { IProperty, IPropertyCreateUpdate } from "@/features/types";
import { FileService, FormatService } from "@/utils";

import { IFormPropertyInfo, IPropertyTable } from "./type";

export class PropertyFormMapper {
  public static fromModel(model: IProperty): IFormPropertyInfo {
    return {
      assetName: model.name,
      quantity: FormatService.toString(model.quantity),
      price: model.price !== "0" ? FormatService.toCurrency(model.price) : "",
      inChargeId: model.incharger.id,
      owner: model.prop_owner,
      note: model.note ?? "",
      imageLink: model.image,
    };
  }
  public static toModel(
    propertyFormData: IFormPropertyInfo
  ): IPropertyCreateUpdate {
    let imageBase64: string | ArrayBuffer;
    if (propertyFormData.image) {
      FileService.convertBase64(propertyFormData.image).then(
        (res) => (imageBase64 = res)
      );
    }
    return {
      name: propertyFormData.assetName,
      quantity: propertyFormData.quantity,
      price: FormatService.removeFormatCurrency(propertyFormData.price),
      prop_owner: propertyFormData.owner,
      note: propertyFormData.note,
      incharger_id: propertyFormData.inChargeId,
      image: !propertyFormData.image ? null : imageBase64,
      is_club_property: propertyFormData.owner === "CLB",
    };
  }
}

export class PropertyTableMapper {
  public static fromModel(model: IProperty): IPropertyTable {
    return {
      assetName: model.name,
      quantity: model.quantity,
      price: model.price !== "0" ? FormatService.toCurrency(model.price) : "--",
      inCharge: model.incharger.full_name,
      owner: model.prop_owner,
    };
  }
}
