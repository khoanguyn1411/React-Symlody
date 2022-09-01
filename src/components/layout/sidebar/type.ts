import { TIconProps } from "@/assets/icons/type";
import { Page_Key } from "@/routes";

export interface ITabSidebar {
  icon: React.FC<TIconProps>;
  title: string;
  to: string;
  pageActive: Page_Key;
}
