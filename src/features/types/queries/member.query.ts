/** Param query types. */
export type TParamQueryMember = {
  filter?: "all" | "in_active";
};

/** Param query dto types. */
export type TFilterListParamDto = {
  is_archived?: boolean;
  get_all?: boolean;
};

export type TParamQueryMemberDto = {
  [key in keyof TFilterListParamDto]: TFilterListParamDto[key];
};

/** Mapper child. */
const mapKeyFilter = (filterType: TParamQueryMember["filter"]) => {
  let keyFilter: keyof TFilterListParamDto;
  switch (filterType) {
    case "all":
      keyFilter = "get_all";
      break;
    case "in_active":
      keyFilter = "is_archived";
      break;
    default:
      keyFilter = undefined;
      break;
  }
  if (!keyFilter) {
    return;
  }
  return {
    [keyFilter]: true,
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
