import { MemberFilterParamsDto } from "../../dtos/filter-params/member-filter-params.dto";
import { MemberFilterParams } from "../../models/filter-params/member-filter-params";
import { IMapperToDto } from "../base-mappers/mapper";

export class MemberFilterParamsMapper
  implements IMapperToDto<MemberFilterParamsDto, MemberFilterParams>
{
  public toDto(data: MemberFilterParams): MemberFilterParamsDto {
    return {
      is_archived: data.isArchived === null ? undefined : data.isArchived,
    };
  }
}

export const memberFilterParamsMapper = new MemberFilterParamsMapper();
