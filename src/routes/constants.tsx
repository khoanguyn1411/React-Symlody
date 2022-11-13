import { EPageKey, EPagePath, EPageTitle, PageComponent } from "./types";

export const PAGE_KEY_MAP_TO_TITLE: Readonly<Record<EPageKey, EPageTitle>> = {
  [EPageKey.Home]: EPageTitle.Home,
  [EPageKey.Member]: EPageTitle.Member,
  [EPageKey.Property]: EPageTitle.Property,
  [EPageKey.Config]: EPageTitle.Config,
  [EPageKey.ConfigWithTab]: EPageTitle.ConfigWithTab,
  [EPageKey.Event]: EPageTitle.Event,
  [EPageKey.Target]: EPageTitle.Target,
  [EPageKey.Todo]: EPageTitle.Todo,
  [EPageKey.NotFound]: EPageTitle.NotFound,
  [EPageKey.Login]: EPageTitle.Login,
};

export const PAGE_KEY_MAP_TO_PATH: Readonly<Record<EPageKey, EPagePath>> = {
  [EPageKey.Home]: EPagePath.Home,
  [EPageKey.Member]: EPagePath.Member,
  [EPageKey.Property]: EPagePath.Property,
  [EPageKey.Config]: EPagePath.Config,
  [EPageKey.ConfigWithTab]: EPagePath.ConfigWithTab,
  [EPageKey.Event]: EPagePath.Event,
  [EPageKey.Target]: EPagePath.Target,
  [EPageKey.Todo]: EPagePath.Todo,
  [EPageKey.NotFound]: EPagePath.NotFound,
  [EPageKey.Login]: EPagePath.Login,
};

export const PAGE_KEY_MAP_TO_COMPONENT: Readonly<
  Record<EPageKey, JSX.Element>
> = {
  [EPageKey.Home]: PageComponent.Home,
  [EPageKey.Member]: PageComponent.Member,
  [EPageKey.Property]: PageComponent.Property,
  [EPageKey.Config]: PageComponent.Config,
  [EPageKey.ConfigWithTab]: PageComponent.Config,
  [EPageKey.Event]: PageComponent.Event,
  [EPageKey.Target]: PageComponent.Target,
  [EPageKey.Todo]: PageComponent.Todo,
  [EPageKey.NotFound]: PageComponent.NotFound,
  [EPageKey.Login]: PageComponent.Login,
};

export const PRIVATE_ROUTE_KEYS = [
  EPageKey.Home,
  EPageKey.Member,
  EPageKey.Property,
  EPageKey.Config,
  EPageKey.Event,
  EPageKey.Target,
  EPageKey.Todo,
  EPageKey.NotFound,
  EPageKey.ConfigWithTab,
];

export const PUBLIC_ROUTE_KEYS = [EPageKey.Login];

export const APP_DEFAULT_PAGE = EPagePath.Todo;
