import { Department, Member, MemberCreation, Roles } from "@/features/types";
import { FormatService } from "@/utils";

import { MemberForm } from "./schema";
import { IMemberTable } from "./type";

export class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel({
    departmentModel,
    formData,
    isArchived,
  }: {
    departmentModel?: Department[];
    formData: MemberForm;
    isArchived: Member["isArchived"];
  }): MemberCreation {
    return {
      authAccount: {
        firstName: formData.authAccount.firstName,
        lastName: formData.authAccount.lastName,
        email: formData.authAccount.email,
      },
      dob: FormatService.toDateString(formData.dob, "US"),
      className: formData.className,
      address: formData.address,
      gender: formData.gender,
      studentId: formData.studentId,
      phoneNumber: formData.phoneNumber,
      homeTown: formData.homeTown,
      department: departmentModel
        ? DepartmentFormMapper.toModel(departmentModel, formData.department)
        : undefined,
      isArchived: isArchived,
    };
  }
  /** Use for map data from model to form values. */
  public static fromModel(model: Member): MemberForm {
    return {
      authAccount: {
        firstName: model.authAccount.firstName,
        lastName: model.authAccount.lastName,
        email: model.authAccount.email,
      },
      gender: model.gender,
      dob: model.dob,
      department: model.department.name,
      className: model.className,
      studentId: model.studentId,
      phoneNumber: model.phoneNumber,
      address: model.address,
      homeTown: model.homeTown,
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
