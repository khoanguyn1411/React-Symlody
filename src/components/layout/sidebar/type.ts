import { TIconProps } from "@/assets/icons/type";
import { EPageKey } from "@/routes";

export interface ITabSidebar {
  icon: React.FC<TIconProps>;
  title: string;
  to: string;
  pageActive: EPageKey;
}
