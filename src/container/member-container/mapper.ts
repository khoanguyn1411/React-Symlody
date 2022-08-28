import dayjs from "dayjs";

import { ERoles, IMember, IMemberCreate } from "@/features/types";

import { IFormMemberInfo, IMemberTable } from "./type";

export class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: IFormMemberInfo): IMemberCreate {
    return {
      auth_account: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        groups: formData.role,
      },
      dob: dayjs(formData.birthday).format("YYYY-MM-DD"),
      class_name: formData.class,
      address: formData.address,
      gender: formData.gender as IMemberCreate["gender"],
      student_id: formData.studentId,
      phone_number: formData.phone,
      home_town: formData.home,
      department: {
        name: formData.department,
        id: 2,
      },
      is_archived: false,
    };
  }
  /** Use for map data from model to form values. */
  public static fromModel(model: IMember): IFormMemberInfo {
    const role = model.auth_account.groups as ERoles[];
    const roleMapped =
      role &&
      (role.length === 1 && role[0] === ERoles.Member
        ? [ERoles.Member]
        : role.filter((item) => item !== ERoles.Member));
    return {
      firstName: model.auth_account.first_name,
      lastName: model.auth_account.last_name,
      gender: model.gender,
      birthday: model.dob,
      department: model.department.name,
      role: roleMapped,
      class: model.class_name,
      studentId: model.student_id,
      email: model.auth_account.email,
      phone: model.phone_number,
      address: model.address,
      home: model.home_town,
    };
  }
}

export class MemberTableMapper {
  public static fromModel(model: IMember): IMemberTable {
    return {
      id: model.id,
      name: model.auth_account.first_name + " " + model.auth_account.last_name,
      email: model.auth_account.email,
      department: model.department.name,
      birthday: dayjs(model.dob).format("DD/MM/YYYY"),
      roles:
        model.auth_account.groups.length === 1 &&
        model.auth_account.groups[0] === ERoles.Member
          ? ERoles.Member
          : model.auth_account.groups
              .filter((item) => item !== ERoles.Member)
              .join(", "),
    };
  }
}
