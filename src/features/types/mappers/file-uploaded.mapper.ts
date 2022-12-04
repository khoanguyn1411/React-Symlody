import { FormDataService } from "@/utils";

import { FileUploadedDto } from "../dtos";
import { FileUploaded } from "../models";

export class FileUploadedMapper {
  public static toDto(model: FileUploaded): FileUploadedDto {
    return { file: model.file };
  }

  public static toFormData(model: FileUploaded): FormData {
    return FormDataService.repairFormData(this.toDto(model));
  }
}
