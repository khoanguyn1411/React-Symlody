import dayjs from "dayjs";

import { IMember, IMemberPost } from "@/features/types/member-type";

import { IMemberTable, TFormMemberInfo } from "./type";

export class MemberMapper {
  /** Use for map data from form values to member dto. */
  public static toDto(formData: TFormMemberInfo): IMemberPost {
    return {
      auth_account: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        groups: [1, 2, 3, 4, 5],
      },
      dob: dayjs(formData.birthday).format("YYYY-MM-DD"),
      class_name: formData.class,
      is_archived: true,
      address: formData.address,
      gender: formData.gender === "Nam" ? 1 : 2,
      student_id: formData.studentId,
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
      firstName: dto.auth_account.first_name,
      lastName: dto.auth_account.last_name,
      gender: dto.gender ? (dto.gender === 1 ? "Nam" : "Nữ") : undefined,
      birthday: dayjs(dto.dob).format("MM/DD/YYYY"),
      department: dto.department.name,
      role: ["HR", "AD"],
      class: dto.class_name,
      studentId: dto.student_id,
      email: dto.auth_account.email,
      phone: dto.phone_number,
      address: dto.address,
      home: dto.home_town,
    };
  }

  /** Use for map data from back-end to table view of member list. */
  public static toTableView(dto: IMember): IMemberTable {
    return {
      id: dto.id,
      name: dto.auth_account.first_name + " " + dto.auth_account.last_name,
      email: dto.auth_account.email,
      department: dto.department.name,
      birthday: dayjs(dto.dob).format("DD/MM/YYYY"),
      roles: dto.auth_account.groups.join(", "),
    };
  }
}
