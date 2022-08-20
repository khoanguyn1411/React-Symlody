import dayjs from "dayjs";

import { IMember, IMemberCU } from "@/features";

import { IFormMemberInfo, IMemberTable } from "./type";

export class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: IFormMemberInfo): IMemberCU {
    return {
      authAccount: {
        fistName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        groups: formData.role,
      },
      birthday: dayjs(formData.birthday).format("YYYY-MM-DD"),
      className: formData.class,
      address: formData.address,
      gender: formData.gender,
      studentId: formData.studentId,
      phone: formData.phone,
      home: formData.home,
      lastModifierDate: "someguys",
      createBy: 123123,
      department: {
        name: formData.department,
      },
    };
  }
  /** Use for map data from model to form values. */
  public static fromModel(model: IMember): IFormMemberInfo {
    return {
      firstName: model.authAccount.fistName,
      lastName: model.authAccount.lastName,
      gender: model.gender,
      birthday: model.birthday,
      department: model.department.name,
      role: model.authAccount.groups,
      class: model.className,
      studentId: model.studentId,
      email: model.authAccount.email,
      phone: model.phone,
      address: model.address,
      home: model.home,
    };
  }
}

export class MemberTableMapper {
  public static fromModel(model: IMember): IMemberTable {
    return {
      id: model.id,
      name: model.authAccount.fistName + " " + model.authAccount.lastName,
      email: model.authAccount.email,
      department: model.department.name,
      birthday: dayjs(model.birthday).format("DD/MM/YYYY"),
      roles: model.authAccount.groups.join(", "),
    };
  }
}
