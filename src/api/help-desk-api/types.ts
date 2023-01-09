import { AppResponseDto, HelpDeskDto } from "@/features/types";

export namespace HelpDeskResponse {
  export type PostQuestion = AppResponseDto<boolean, HelpDeskDto>;
}
