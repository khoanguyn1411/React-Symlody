/** Config */
interface RoutePathOptions {
  path: string;
  children?: RoutePathsConfig;
}

type RoutePathsConfig = Record<string, RoutePathOptions>;

/** Returned */
interface RoutePathBaseReturned {
  path: string;
  url: string;
}

interface RoutePathWithChildren<T extends RoutePathsConfig>
  extends RoutePathBaseReturned {
  children: RoutePaths<T>;
}

type RoutePaths<InputConfig extends RoutePathsConfig> = {
  [Key in keyof InputConfig]: InputConfig[Key]["children"] extends RoutePathsConfig
    ? RoutePathWithChildren<InputConfig[Key]["children"]>
    : RoutePathBaseReturned;
} & { root: RoutePathBaseReturned };

/**
 * Build route object from config.
 * @param config Route paths config.
 * @param parentRoutePath Parent route path (first route of path).
 * @returns Routes path object with url and type validation support.
 */
export function buildRoutePaths<T extends RoutePathsConfig>(
  config: T,
  parentRoutePath = ""
): RoutePaths<T> {
  return Object.keys(config).reduce((acc, key: keyof T) => {
    const baseRoutePath: RoutePaths<T> = {
      root: {
        path: "",
      },
      ...acc,
    };
    const value = config[key];
    if (value.path === "") {
      throw new Error(
        "Please do not provide an empty string for the value of `path` key."
      );
    }
    if (parentRoutePath) {
      const newUrl = `${parentRoutePath}/${value.path}`;
      return {
        ...baseRoutePath,
        [key]: {
          path: value.path,
          url: newUrl,
          children: value.children
            ? buildRoutePaths(value.children, newUrl)
            : undefined,
        },
      };
    }
    const newUrl = `/${value.path}`;
    return {
      ...baseRoutePath,
      [key]: {
        path: value.path,
        url: newUrl,
        children: value.children
          ? buildRoutePaths(value.children, newUrl)
          : undefined,
      },
    };
  }, {} as RoutePaths<T>);
}
