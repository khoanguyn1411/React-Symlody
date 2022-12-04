import { CommonFilterParamsDto } from "../../dtos/filter-params/common-filter-params.dto";
import { CommonFilterParams } from "../../models/filter-params/common-filter-params";
import { IMapperToDto } from "../base-mappers/mapper";

export class CommonFilterParamsMapper
  implements
    IMapperToDto<CommonFilterParams.Combined, CommonFilterParamsDto.Combined>
{
  public toDto(
    data: CommonFilterParams.Combined
  ): CommonFilterParamsDto.Combined {
    return {
      ...this.toSearchFilterDto(data),
      ...this.toPaginationFilterDto(data),
    };
  }
  public toSearchFilterDto(
    data: CommonFilterParams.Search
  ): CommonFilterParamsDto.SearchDto {
    return {
      search: data.search,
    };
  }

  public toPaginationFilterDto(
    data: CommonFilterParams.Pagination
  ): CommonFilterParamsDto.PaginationDto {
    return {
      page: data.page,
      limit: data.limit,
    };
  }
}

export const commonFilterParamsMapper = new CommonFilterParamsMapper();
