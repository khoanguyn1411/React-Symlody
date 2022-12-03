import { IProfile, IProfileUpdate } from "@/features/types";
import { EGender } from "@/features/types/models/gender";

import { IFormUserConfig } from "./type";

export class PersonalInfoFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: IFormUserConfig): IProfileUpdate {
    return {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender as EGender,
      phone_number: formData.phone,
      student_id: formData.studentId,
      class_name: formData.class,
      avatar: formData.avatar,
      dob: formData.birthday,
      address: formData.address,
      home_town: formData.home,
    };
  }

  public static fromModel(model: IProfile): IFormUserConfig {
    return {
      firstName: model.firstName,
      lastName: model.fullName,
      email: model.email,
      class: model.class_name,
      studentId: model.student_id,
      birthday: model.dob,
      phone: model.phone_number,
      home: model.home_town,
      address: model.address,
      gender: model.gender,
    };
  }
}
