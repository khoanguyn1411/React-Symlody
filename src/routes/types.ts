export type PageKey =
  | "Home"
  | "Member"
  | "Property"
  | "Config"
  | "Event"
  | "Todo"
  | "Target";

export interface IRoutes {
  path: string;
  component: React.ReactNode | JSX.Element;
  pageKey: PageKey;
  pageTitle: string;
  // layout?: React.FC;
}
