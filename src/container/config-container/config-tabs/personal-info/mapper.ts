import { Profile, ProfileCreation } from "@/features/types";
import { Gender } from "@/features/types/models/gender";

import { IFormUserConfig } from "./type";

export class PersonalInfoFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: IFormUserConfig): ProfileCreation {
    return {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender as Gender,
      phoneNumber: formData.phone,
      studentId: formData.studentId,
      className: formData.class,
      avatar: formData.avatar,
      dob: formData.birthday,
      address: formData.address,
      homeTown: formData.home,
    };
  }

  public static fromModel(model: Profile): IFormUserConfig {
    return {
      firstName: model.firstName,
      lastName: model.fullName,
      email: model.email,
      class: model.className,
      studentId: model.studentId,
      birthday: model.dob,
      phone: model.phoneNumber,
      home: model.homeTown,
      address: model.address,
      gender: model.gender,
    };
  }
}
