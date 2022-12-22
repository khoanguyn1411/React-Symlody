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

type NormalRoute<InputConfig extends RoutePathBaseOptions> =
  InputConfig["children"] extends RoutePathsConfig
    ? IsInclude<InputConfig, "title"> extends true
      ? RoutePathWithChildren<InputConfig["children"], true>
      : RoutePathWithChildren<InputConfig["children"], false>
    : IsInclude<InputConfig, "title"> extends true
    ? Required<RoutePathBaseReturned>
    : StrictOmit<RoutePathBaseReturned, "title">;

type FunctionalChildren<
  InputConfig extends RoutePathBaseOptions,
  Start extends string
> = (
  param: Record<Start, string>
) => InputConfig["children"] extends RoutePathsConfig
  ? RoutePaths<InputConfig["children"]>
  : ShouldReturnRoutePathBaseWithTitle<false>;

interface DynamicUrlWithChildren<
  InputConfig extends RoutePathBaseOptions,
  Param extends string
> extends DynamicUrl<Param> {
  children: FunctionalChildren<InputConfig, Param>;
}

type DynamicRouteParam<
  InputConfig extends RoutePathBaseOptions,
  Param extends string
> = InputConfig["children"] extends RoutePathsConfig
  ? DynamicUrlWithChildren<InputConfig, Param>
  : DynamicUrl<Param>;

interface DynamicUrl<Param extends string> {
  dynamicUrl: (param: Record<Param, string>) => string;
}

type DynamicRoute<
  InputConfig extends RoutePathBaseOptions,
  Param extends string
> = StrictOmit<RoutePathBaseReturned, "title"> &
  DynamicRouteParam<InputConfig, Param>;

type ExtractToRoutePathOption<T extends RoutePathBaseOptions> = Extract<
  T,
  RoutePathBaseOptions
>;

type RoutePaths<InputConfig extends RoutePathsConfig> = {
  [Key in keyof InputConfig]: InputConfig[Key]["path"] extends `:${infer Param}`
    ? DynamicRoute<ExtractToRoutePathOption<InputConfig[Key]>, Param>
    : NormalRoute<ExtractToRoutePathOption<InputConfig[Key]>>;
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
    const paramFromPath = value.path.match(/:(\w+)/g);
    if (paramFromPath?.length) {
      return {
        ...acc,
        [key]: {
          title: isRoutePathsRootConfig(value) ? value.title : undefined,
          path: value.path,
          url: fullUrl,
          dynamicUrl: (param: Record<string, string>) =>
            `${parentRouteUrl + buildNavigateUrl(value.path, param)}/`,
          children: (param: Record<string, string>) => {
            if (value.children) {
              return buildRoutePaths(
                value.children,
                `${parentRouteUrl + buildNavigateUrl(value.path, param)}/`
              );
            }
            return undefined;
          },
        },
      };
    }
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

/**
 * Build an url with a path and its parameters.
 * @example
 * buildNavigateUrl(
 *   '/a/:first/:last',
 *   { first: 'p', last: 'q' },
 * ) // returns '/a/p/q'
 * @param path Target path.
 * @param params Parameters.
 */
function buildNavigateUrl<P extends string>(
  path: P,
  params: Record<string, string>
): string {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`:${key}`, params[key]),
    path
  );
}
