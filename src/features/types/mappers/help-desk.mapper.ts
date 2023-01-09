import { ErrorHandler } from "@/utils/funcs/error-handler";

import { HelpDeskCategoriesDto, HelpDeskDto, HttpErrorDto } from "../dtos";
import { HelpDesk, HelpDeskCategories, HttpError } from "../models";
import { IMapperToDto, IMapperToHttpError } from "./base-mappers/mapper";

const HELP_DESK_CATEGORIES_TO_DTO: Record<
  HelpDeskCategories,
  HelpDeskCategoriesDto
> = {
  [HelpDeskCategories.UserGuild]: HelpDeskCategoriesDto.UserGuild,
  [HelpDeskCategories.Other]: HelpDeskCategoriesDto.Other,
  [HelpDeskCategories.Suggestion]: HelpDeskCategoriesDto.Suggestion,
  [HelpDeskCategories.SystemBug]: HelpDeskCategoriesDto.SystemBug,
};

export class HelpDeskMapper
  implements
    IMapperToDto<HelpDeskDto, HelpDesk>,
    IMapperToHttpError<HelpDeskDto, HelpDesk>
{
  public httpErrorFromDto(
    errorDto: HttpErrorDto<HelpDeskDto>
  ): HttpError<HelpDesk, undefined> {
    return {
      title: ErrorHandler.extractErrorMessage(errorDto.title),
      category: ErrorHandler.extractErrorMessage(errorDto.category),
      content: ErrorHandler.extractErrorMessage(
        errorDto.content ?? errorDto.non_field_errors
      ),
    };
  }
  public toDto(model: HelpDesk): HelpDeskDto {
    return {
      title: model.title,
      category: HELP_DESK_CATEGORIES_TO_DTO[model.category],
      content: model.content,
    };
  }
}

export const helpDeskMapper = new HelpDeskMapper();
