import {
  ERoles,
  IDepartment,
  IMember,
  IMemberCreateUpdate,
} from "@/features/types";
import { FormatService } from "@/utils";

import { IFormMemberInfo, IMemberTable } from "./type";

export class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel({
    departmentModel,
    formData,
    isArchived,
  }: {
    departmentModel?: IDepartment[];
    formData: IFormMemberInfo;
    isArchived: IMember["is_archived"];
  }): IMemberCreateUpdate {
    return {
      auth_account: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
      avatar: formData.avatar,
      dob: FormatService.toDateString(formData.birthday, "US"),
      class_name: formData.class,
      address: formData.address,
      gender: formData.gender as IMemberCreateUpdate["gender"],
      student_id: formData.studentId,
      phone_number: formData.phone,
      home_town: formData.home,
      department: departmentModel
        ? DepartmentFormMapper.toModel(departmentModel, formData.department)
        : undefined,
      is_archived: isArchived,
    };
  }
  /** Use for map data from model to form values. */
  public static fromModel(model: IMember): IFormMemberInfo {
    return {
      firstName: model.auth_account.firstName,
      lastName: model.auth_account.lastName,
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
    const { groups } = model.auth_account;

    const isOnlyIncludeMemberRole =
      groups.length === 1 && groups[0].name === ERoles.Member;
    const isNotIncludeAnyRole = groups.length === 0;

    const shouldReturnMemberText =
      isNotIncludeAnyRole || isOnlyIncludeMemberRole;
    return {
      avatar: model.avatar,
      id: model.id,
      fullName: model.auth_account.fullName,
      firstName: model.auth_account.firstName,
      email: model.auth_account.email,
      department: model.department.name,
      birthday: FormatService.toDateString(model.dob, "VN"),
      roles: shouldReturnMemberText
        ? ERoles.Member
        : model.auth_account.groups
            .filter((item) => item.name !== ERoles.Member)
            .map((item) => item.name)
            .join(", "),
    };
  }
}

export class DepartmentFormMapper {
  public static toModel(model: IDepartment[], formData: string): IDepartment {
    return {
      ...model.find((item) => item.name === formData),
    };
  }
}
