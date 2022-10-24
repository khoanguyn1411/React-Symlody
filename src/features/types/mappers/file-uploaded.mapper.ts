import { FormDataService } from "@/utils";

import { IFileUploadedDto } from "../dtos";
import { IFileUploaded } from "../models";

export class FileUploadedMapper {
  public static toDto(model: IFileUploaded): IFileUploadedDto {
    return model;
  }

  public static toFormData(model: IFileUploaded): FormData {
    return FormDataService.repairFormData(this.toDto(model));
  }
}
