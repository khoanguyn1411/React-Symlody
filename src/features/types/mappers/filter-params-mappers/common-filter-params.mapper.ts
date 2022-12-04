import { CommonFilterParamsDto } from "../../dtos/filter-params/common-filter-params.dto";
import { CommonFilterParams } from "../../models/filter-params/common-filter-params";

export class CommonFilterParamsMapper {
  public static toDto(
    data: CommonFilterParams.Combined
  ): CommonFilterParamsDto.Combined {
    return {
      ...this.toSearchFilterDto(data),
      ...this.toPaginationFilterDto(data),
    };
  }
  public static toSearchFilterDto(
    data: CommonFilterParams.Search
  ): CommonFilterParamsDto.SearchDto {
    return {
      search: data.search,
    };
  }

  public static toPaginationFilterDto(
    data: CommonFilterParams.Pagination
  ): CommonFilterParamsDto.PaginationDto {
    return {
      page: data.page,
      limit: data.limit,
    };
  }
}
