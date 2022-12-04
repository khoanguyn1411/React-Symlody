import { generateReverseRecord } from "@/utils/services/generate-service";

import { GenderDto } from "../../dtos/gender.dto";
import { Gender } from "../../models/gender";

const GENDER_MAP_FROM_DTO: Readonly<Record<GenderDto, Gender>> = {
  [GenderDto.Male]: Gender.Male,
  [GenderDto.Female]: Gender.Female,
};

const GENDER_MAP_TO_DTO = generateReverseRecord(GENDER_MAP_FROM_DTO);

export class GenderMapper {
  public static fromDto(gender: GenderDto): Gender {
    return GENDER_MAP_FROM_DTO[gender];
  }

  public static toDto(gender: Gender): GenderDto {
    return GENDER_MAP_TO_DTO[gender];
  }
}
