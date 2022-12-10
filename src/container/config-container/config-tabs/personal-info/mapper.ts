import { Profile, ProfileCreation } from "@/features/types";

import { PersonalInfoForm } from "./type";

export class PersonalInfoFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: PersonalInfoForm): ProfileCreation {
    return {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      studentId: formData.studentId,
      className: formData.className,
      avatar: formData.avatar,
      dob: formData.dob,
      address: formData.address,
      homeTown: formData.homeTown,
    };
  }

  public static fromModel(model: Profile): PersonalInfoForm {
    return {
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      className: model.className,
      studentId: model.studentId,
      dob: model.dob,
      phoneNumber: model.phoneNumber,
      homeTown: model.homeTown,
      address: model.address,
      gender: model.gender,
      avatarUrl: model.avatar,
      avatar: undefined,
    };
  }
}
