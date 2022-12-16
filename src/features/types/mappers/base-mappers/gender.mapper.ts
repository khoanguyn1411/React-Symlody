import { reverseRecord } from "@/utils/funcs/reverse-record";

import { GenderDto } from "../../dtos/gender.dto";
import { Gender } from "../../models/gender";
import { IMapperToDto } from "./mapper";

const GENDER_MAP_FROM_DTO: Readonly<Record<GenderDto, Gender>> = {
  [GenderDto.Male]: Gender.Male,
  [GenderDto.Female]: Gender.Female,
};

const GENDER_MAP_TO_DTO = reverseRecord(GENDER_MAP_FROM_DTO);

export class GenderMapper implements IMapperToDto<GenderDto, Gender> {
  public fromDto(gender: GenderDto): Gender {
    return GENDER_MAP_FROM_DTO[gender];
  }

  public toDto(gender: Gender): GenderDto {
    return GENDER_MAP_TO_DTO[gender];
  }
}

export const genderMapper = new GenderMapper();
