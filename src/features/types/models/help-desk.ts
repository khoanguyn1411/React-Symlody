export interface HelpDesk {
  title: string;
  category: HelpDeskCategories;
  content: string;
}

export enum HelpDeskCategories {
  UserGuild = "Hướng dẫn người dùng",
  SystemBug = "Lỗi hệ thống",
  Suggestion = "Góp ý",
  Other = "Khác",
}
