import { Department, Member, MemberCreation, Roles } from "@/features/types";
import { FormatService } from "@/utils";

import { IFormMemberInfo, IMemberTable } from "./type";

export class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel({
    departmentModel,
    formData,
    isArchived,
  }: {
    departmentModel?: Department[];
    formData: IFormMemberInfo;
    isArchived: Member["isArchived"];
  }): MemberCreation {
    return {
      authAccount: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
      avatar: formData.avatar,
      dob: FormatService.toDateString(formData.birthday, "US"),
      className: formData.class,
      address: formData.address,
      gender: formData.gender as MemberCreation["gender"],
      studentId: formData.studentId,
      phoneNumber: formData.phone,
      homeTown: formData.home,
      department: departmentModel
        ? DepartmentFormMapper.toModel(departmentModel, formData.department)
        : undefined,
      isArchived: isArchived,
    };
  }
  /** Use for map data from model to form values. */
  public static fromModel(model: Member): IFormMemberInfo {
    return {
      firstName: model.authAccount.firstName,
      lastName: model.authAccount.lastName,
      gender: model.gender,
      birthday: model.dob,
      department: model.department.name,
      class: model.className,
      studentId: model.studentId,
      email: model.authAccount.email,
      phone: model.phoneNumber,
      address: model.address,
      home: model.homeTown,
    };
  }
}

export class MemberTableMapper {
  public static fromModel(model: Member): IMemberTable {
    const { groups } = model.authAccount;

    const isOnlyIncludeMemberRole =
      groups.length === 1 && groups[0].name === Roles.Member;
    const isNotIncludeAnyRole = groups.length === 0;

    const shouldReturnMemberText =
      isNotIncludeAnyRole || isOnlyIncludeMemberRole;
    return {
      avatar: model.avatar,
      id: model.id,
      fullName: model.authAccount.fullName,
      firstName: model.authAccount.firstName,
      email: model.authAccount.email,
      department: model.department.name,
      birthday: FormatService.toDateString(model.dob, "VN"),
      roles: shouldReturnMemberText
        ? Roles.Member
        : model.authAccount.groups
            .filter((item) => item.name !== Roles.Member)
            .map((item) => item.name)
            .join(", "),
    };
  }
}

export class DepartmentFormMapper {
  public static toModel(model: Department[], formData: string): Department {
    return {
      ...model.find((item) => item.name === formData),
    };
  }
}
