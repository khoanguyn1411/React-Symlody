import { generateFullName } from "@/utils/funcs/generate-full-name";
export class NameMapper {
  public fromDto(dto: { first_name: string; last_name: string }) {
    return {
      firstName: dto.first_name,
      lastName: dto.last_name,
      fullName: generateFullName(dto.last_name, dto.first_name),
    };
  }
}

export const nameMapper = new NameMapper();
