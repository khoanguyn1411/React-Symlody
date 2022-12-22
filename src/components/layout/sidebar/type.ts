import { TIconProps } from "@/assets/icons/type";
import { PageKey } from "@/routes";

export interface ITabSidebar {
  icon: React.FC<TIconProps>;
  title: string;
  to: string;
  pageActive: PageKey;
}
