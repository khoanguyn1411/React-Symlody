import { generateReverseRecord } from "@/utils/services/generate-service";

import { EGenderDto } from "../../dtos/gender.dto";
import { EGender } from "../../models/gender";

const GENDER_MAP_FROM_DTO: Readonly<Record<EGenderDto, EGender>> = {
  [EGenderDto.Male]: EGender.Male,
  [EGenderDto.Female]: EGender.Female,
};

const GENDER_MAP_TO_DTO = generateReverseRecord(GENDER_MAP_FROM_DTO);

export class GenderMapper {
  public static fromDto(gender: EGenderDto): EGender {
    return GENDER_MAP_FROM_DTO[gender];
  }

  public static toDto(gender: EGender): EGenderDto {
    return GENDER_MAP_TO_DTO[gender];
  }
}
