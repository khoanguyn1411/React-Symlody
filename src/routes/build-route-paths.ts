import { IsInclude, RecordObject, StrictOmit } from "@/utils/types";

export type ExtractPageKey<T extends RoutePaths<RecordObject>> =
  | keyof T
  | keyof {
      [Key in keyof T as T[Key] extends {
        children: RecordObject;
      }
        ? // Using `Extract` type to transfer keyof T to string type for usage of Template Literal Types.
          `${Extract<Key, string>}.${Extract<
            ExtractPageKey<T[Key]["children"]>,
            string
          >}`
        : never]: never;
    };

/** Config types. */
interface RoutePathBaseOptions {
  path: string;
  children?: RoutePathsConfig;
}
interface RoutePathOptions extends RoutePathBaseOptions {
  title?: string;
}

type RoutePathsConfig = Record<string, RoutePathOptions>;

/** Returned types. */
interface RoutePathBaseReturned {
  path: string;
  url: string;
  title?: string;
}

type RoutePathWithChildren<
  T extends RoutePathsConfig,
  HasTitle extends boolean
> = {
  children: RoutePaths<T>;
} & ShouldReturnRoutePathBaseWithTitle<HasTitle>;

type ShouldReturnRoutePathBaseWithTitle<T extends boolean> = T extends false
  ? StrictOmit<RoutePathBaseReturned, "title">
  : Required<RoutePathBaseReturned>;

type RoutePaths<InputConfig extends RoutePathsConfig> = {
  [Key in keyof InputConfig]: InputConfig[Key]["children"] extends RoutePathsConfig
    ? IsInclude<InputConfig[Key], "title"> extends true
      ? RoutePathWithChildren<InputConfig[Key]["children"], true>
      : RoutePathWithChildren<InputConfig[Key]["children"], false>
    : IsInclude<InputConfig[Key], "title"> extends true
    ? Required<RoutePathBaseReturned>
    : StrictOmit<RoutePathBaseReturned, "title">;
};

/**
 * Check if entity is RoutePathOptions or not.
 * @param entity Entity need to be checked.
 */
function isRoutePathsRootConfig(
  entity: RoutePathBaseOptions
): entity is RoutePathOptions {
  return !!(entity as RoutePathOptions).title;
}

/**
 * Build route object from config.
 * @param config Route paths config.
 * @param parentRouteUrl Parent route path (first route of path).
 * @returns Routes path object with url and type validation support.
 */
export function buildRoutePaths<T extends RoutePathsConfig>(
  config: T,
  parentRouteUrl = "/"
): RoutePaths<T> {
  return Object.keys(config).reduce((acc, key: keyof T) => {
    const value = config[key];
    const fullUrl = `${parentRouteUrl}${value.path}`;
    if (!value.children) {
      return {
        ...acc,
        [key]: {
          title: isRoutePathsRootConfig(value) ? value.title : undefined,
          path: value.path,
          url: fullUrl,
          children: value.children
            ? buildRoutePaths(value.children, fullUrl)
            : undefined,
        },
      };
    }
    return {
      ...acc,
      [key]: {
        title: isRoutePathsRootConfig(value) ? value.title : undefined,
        path: value.path,
        url: fullUrl,
        children: value.children
          ? buildRoutePaths(value.children, `${fullUrl}/`)
          : undefined,
      },
    };
  }, {} as RoutePaths<T>);
}
