import {
  MEMBER_FILTER_VALUE,
  MEMBER_QUERY_PARAM_KEY,
} from "@/container/member-container/constant";

/** Param query types. */
export type TParamQueryMember = {
  [MEMBER_QUERY_PARAM_KEY.filter]?: "get_all" | "is_archived";
};

/** Param query dto types. */
export type TFilterListParamDto = {
  [MEMBER_FILTER_VALUE.isArchived]?: boolean;
  [MEMBER_FILTER_VALUE.all]?: boolean;
};

export type TParamQueryMemberDto = {
  [key in keyof TFilterListParamDto]: TFilterListParamDto[key];
};

/** Mapper child. */
const mapKeyFilter = (filterType: TParamQueryMember["filter"]) => {
  if (!filterType) {
    return;
  }
  return {
    [filterType]: true,
  };
};

/** Mapper method. */
export class MemberQueryMapper {
  public static toParamDto(param: TParamQueryMember): TParamQueryMemberDto {
    return {
      ...mapKeyFilter(param.filter),
    };
  }
}
