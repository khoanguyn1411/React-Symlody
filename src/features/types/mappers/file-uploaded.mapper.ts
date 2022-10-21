import { FileService } from "@/utils";

import { IFileUploadedDto } from "../dtos";
import { IFileUploaded } from "../models";

export class FileUploadedMapper {
  public static toDto(model: IFileUploaded): IFileUploadedDto {
    const formData = FileService.convertToFormData(model.file);
    return {
      file: formData,
    };
  }
}
