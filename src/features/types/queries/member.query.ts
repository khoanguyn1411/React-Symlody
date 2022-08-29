import {
  MEMBER_FILTER_VALUE,
  MEMBER_QUERY_PARAM_KEY,
} from "@/container/member-container/constant";

/** Param query types. */
export type TMemberParamQuery = {
  [MEMBER_QUERY_PARAM_KEY.filter]?: "get_all" | "is_archived";
};

/** Param query dto types. */
export type TMemberFilterParamDto = {
  [MEMBER_FILTER_VALUE.isArchived]?: boolean;
  [MEMBER_FILTER_VALUE.all]?: boolean;
};

export type TMemberParamQueryDto = {
  [key in keyof TMemberFilterParamDto]: TMemberFilterParamDto[key];
};

/** Mapper child. */
const mapKeyFilter = (filterType: TMemberParamQuery["filter"]) => {
  if (!filterType) {
    return;
  }
  return {
    [filterType]: true,
  };
};

/** Mapper method. */
export class MemberQueryMapper {
  public static toParamDto(param: TMemberParamQuery): TMemberParamQueryDto {
    return {
      ...mapKeyFilter(param.filter),
    };
  }
}
