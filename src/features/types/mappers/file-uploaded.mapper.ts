import { repairFormData } from "@/utils/funcs/repair-form-data";

import { FileUploadedDto } from "../dtos";
import { FileUploaded } from "../models";
import { IMapperToDto } from "./base-mappers/mapper";

export class FileUploadedMapper
  implements IMapperToDto<FileUploadedDto, FileUploaded>
{
  public toDto(model: FileUploaded): FileUploadedDto {
    return { file: model.file };
  }

  public toFormData(model: FileUploaded): FormData {
    return repairFormData(this.toDto(model));
  }
}

export const fileUploadedMapper = new FileUploadedMapper();
