import { HelpDeskDto } from "@/features/types";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { HelpDeskResponse } from "./types";

const BASE_PATH = "helpdesk";
const helpDeskUrlService = new ComposeUrlService(BASE_PATH);

export namespace HelpDeskApi {
  export async function sendQuestion(
    body: HelpDeskDto
  ): Promise<HelpDeskResponse.PostQuestion> {
    const url = helpDeskUrlService.getBaseUrl();
    const method = http.post<boolean>(url, body);
    return composeHttpMethodResult(method);
  }
}
