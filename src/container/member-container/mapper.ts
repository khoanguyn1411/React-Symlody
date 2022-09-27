import {
  ERoles,
  IDepartment,
  IDepartmentCreateUpdate,
  IMember,
  IMemberCreateUpdate,
} from "@/features/types";
import { FormatService } from "@/utils";

import { IFormMemberInfo, IMemberTable } from "./type";

export class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(
    departmentModel: IDepartment[],
    formData: IFormMemberInfo
  ): IMemberCreateUpdate {
    return {
      auth_account: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        groups: [ERoles.Member],
      },
      dob: FormatService.toDate(formData.birthday, "US"),
      class_name: formData.class,
      address: formData.address,
      gender: formData.gender as IMemberCreateUpdate["gender"],
      student_id: formData.studentId,
      phone_number: formData.phone,
      home_town: formData.home,
      department: DepartmentFormMapper.toModel(
        departmentModel,
        formData.department
      ),
      is_archived: false,
    };
  }
  /** Use for map data from model to form values. */
  public static fromModel(model: IMember): IFormMemberInfo {
    return {
      firstName: model.auth_account.first_name,
      lastName: model.auth_account.last_name,
      gender: model.gender,
      birthday: model.dob,
      department: model.department.name,
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
      fullName: model.auth_account.full_name,
      firstName: model.auth_account.first_name,
      email: model.auth_account.email,
      department: model.department.name,
      birthday: FormatService.toDate(model.dob, "VN"),
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

export class DepartmentFormMapper {
  public static toModel(
    model: IDepartment[],
    formData: string
  ): IDepartmentCreateUpdate {
    return {
      ...model.find((item) => item.name === formData),
    };
  }
}
