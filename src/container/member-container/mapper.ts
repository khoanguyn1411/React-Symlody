import dayjs from "dayjs";

import { IMemberPost } from "@/features/types/member-type";

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
}
