import { MemberFormMapper } from "@/container/member-container/mapper";
import { IMemberCreateUpdate, IProfile } from "@/features/types";

import { IFormUserConfig } from "./type";

export class PersonalInfoFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: IFormUserConfig): IMemberCreateUpdate {
    return MemberFormMapper.toModel({ formData: formData, isArchived: true });
  }

  public static fromProfile(model: IProfile): IFormUserConfig {
    return {
      firstName: model.first_name,
      lastName: model.last_name,
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
