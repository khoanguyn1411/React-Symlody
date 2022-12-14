import { Department, Member, MemberCreation, Roles } from "@/features/types";
import { FormatService } from "@/utils";

import { IMemberTable, MemberForm } from "./type";

class MemberFormMapper {
  /** Use for map data from form values to member model. */
  public toModel({
    departmentModel,
    formData,
    isArchived,
  }: {
    departmentModel?: Department[];
    formData: MemberForm;
    isArchived: Member["isArchived"];
  }): MemberCreation {
    return {
      ...formData,
      department: departmentModel
        ? departmentFormMapper.toModel(departmentModel, formData.department)
        : undefined,
      isArchived: isArchived,
    };
  }
  /** Use for map data from model to form values. */
  public fromModel(model: Member): MemberForm {
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

class MemberTableMapper {
  public fromModel(model: Member): IMemberTable {
    const { groups } = model.authAccount;

    const isOnlyIncludeMemberRole =
      groups.length === 1 && groups[0].name === Roles.Member;
    const isNotIncludeAnyRole = groups.length === 0;

    const shouldReturnMemberText =
      isNotIncludeAnyRole || isOnlyIncludeMemberRole;
    return {
      avatar: model.avatarUrl,
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

class DepartmentFormMapper {
  public toModel(model: Department[], formData: string): Department {
    return {
      ...model.find((item) => item.name === formData),
    };
  }
}

export const departmentFormMapper = new DepartmentFormMapper();
export const memberTableMapper = new MemberTableMapper();
export const memberFormMapper = new MemberFormMapper();
