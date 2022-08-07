import dayjs from "dayjs";

import { IMember, IMemberPost } from "@/features/types/member-type";

import { TFormMemberInfo } from "./type";

export class MemberMapper {
  /** Use for map data from form values to member dto. */
  public static toDto(formData: TFormMemberInfo): IMemberPost {
    return {
      auth_account: {
        first_name: formData.fullName,
        last_name: formData.fullName,
        email: formData.email,
        groups: [1, 2, 3, 4, 5],
      },
      dob: dayjs().format("YYYY-MM-DD"),
      class_name: formData.class,
      is_archived: true,
      address: formData.address,
      gender: formData.gender === "Nam" ? 1 : 2,
      student_id: formData.id,
      phone_number: formData.phone,
      home_town: formData.home,
      last_modified_by: "someguys",
      created_by: 12,
      department: {
        name: "khoa",
      },
    };
  }

  /** Use for map data from back-end to form values. */
  public static toFormValue(dto: IMember): TFormMemberInfo {
    return {
      fullName: dto.auth_account.first_name + " " + dto.auth_account.last_name,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      birthday: dayjs().format("DD/MM/YYYY"),
      department: dto.department.name,
      role: ["HR", "AD"],
      class: dto.class_name,
      id: dto.student_id,
      email: dto.auth_account.email,
      phone: dto.phone_number,
      address: dto.address,
      home: dto.home_town,
    };
  }
}
