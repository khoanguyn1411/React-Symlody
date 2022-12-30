import { Member, MemberCreationDto, MemberDto } from "@/features/types";
import { MemberFilterParamsDto } from "@/features/types/dtos/filter-params";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { MemberApiResponse } from "./types";

const BASE_PATH = "member";
const memberUrlService = new ComposeUrlService(BASE_PATH);

const memberUrls = {
  ...memberUrlService.composeCommonAPIMethodUrls(),
  delete: (id: Member["id"]) =>
    memberUrlService.concatWith(["archive", `${id}`]),
  uploadMemberExcelFile: memberUrlService.concatWith(["bulk"]),
};

export namespace MemberApi {
  export async function getMembers(
    param: MemberFilterParamsDto
  ): Promise<MemberApiResponse.GetMembers> {
    const url = memberUrls.getAndCreate;
    const method = http.get<MemberDto[]>(url, param);
    return composeHttpMethodResult(method);
  }

  export async function deleteMember(
    id: Member["id"]
  ): Promise<MemberApiResponse.DeleteMember> {
    const url = memberUrls.delete(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  }

  export async function createMember(
    body: MemberCreationDto
  ): Promise<MemberApiResponse.CreateMember> {
    const url = memberUrls.getAndCreate;
    const method = http.post<MemberDto>(url, body);
    return composeHttpMethodResult(method);
  }

  export async function updateMember(
    id: Member["id"],
    body: MemberCreationDto
  ): Promise<MemberApiResponse.UpdateMember> {
    const url = memberUrls.updateAndDeleteWithId(id);
    const method = http.patch<MemberDto>(url, body);
    return composeHttpMethodResult(method);
  }

  export async function uploadMemberExcelFile(
    body: FormData
  ): Promise<MemberApiResponse.UploadExcel> {
    const url = memberUrls.uploadMemberExcelFile;
    const method = http.post<boolean>(url, body);
    return composeHttpMethodResult(method);
  }
}
