import { UserFilterParamsDto } from "../../dtos/filter-params/user-filter-param.dto";
import { UserTargetViewDto } from "../../dtos/user-view.dto";
import { UserFilterParams } from "../../models/filter-params/user-filter-param";
import { UserTargetView } from "../../models/user-view";
import { IMapperToDto } from "../base-mappers/mapper";

const USER_VIEW_TO_DTO: Record<UserTargetView, UserTargetViewDto> = {
  [UserTargetView.Property]: UserTargetViewDto.Property,
  [UserTargetView.Task]: UserTargetViewDto.Task,
};

export class UserFilterParamsMapper
  implements IMapperToDto<UserFilterParamsDto, UserFilterParams>
{
  public toDto(data: UserFilterParams): UserFilterParamsDto {
    return {
      target: USER_VIEW_TO_DTO[data.target],
    };
  }
}
export const userFilterParamsMapper = new UserFilterParamsMapper();
