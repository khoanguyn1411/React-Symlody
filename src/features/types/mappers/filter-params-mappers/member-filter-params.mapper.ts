import { MemberFilterParamsDto } from "../../dtos/filter-params/member-filter-params.dto";
import { MemberFilterParams } from "../../models/filter-params/member-filter-params";

export class MemberFilterParamsMapper {
  public static toDto(data: MemberFilterParams): MemberFilterParamsDto {
    return {
      is_archived: data.isArchived === null ? undefined : data.isArchived,
    };
  }
}
