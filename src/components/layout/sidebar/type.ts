import { Page_Key } from "@/routes";

export interface ITabSidebar {
  icon: string;
  title: string;
  to: string;
  pageActive: Page_Key;
}
