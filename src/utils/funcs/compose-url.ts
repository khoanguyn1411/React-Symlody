import { Primitive } from "../types";

export class ComposeUrlService {
  private basePath = "";
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * Compose a new URL from a path.
   * @param path Path to compose.
   * @returns URL's schema string.
   */
  public static composeUrl(path: Primitive): string {
    return `${path}/`;
  }

  /**
   * Get base URL of an instance of this service.
   * @example
   * const BASE_URL_LOGOUT = "logout";
     const logoutUrlService = new ComposeUrlService(BASE_URL_LOGOUT);
     const BASE_URL = logoutUrlService.getBaseUrl();
     console.log(BASE_URL)
     @result logout/
   */
  public getBaseUrl(): string {
    return ComposeUrlService.composeUrl(this.basePath);
  }

  /**
   * Construct URL with an param.
   * @param param Param to construct URL with.
   * @example
   * const BASE_URL_LOGOUT = "logout";
     const logoutUrlService = new ComposeUrlService(BASE_URL_LOGOUT);
     const NEW_URL = logoutUrlService.constructUrlWithParam("test");
     console.log(NEW_URL)
   * @result logout/test/
   */
  public constructUrlWithParam(param: Primitive): string {
    return `${this.basePath}/${param}/`;
  }

  /**
   * Concat multiple path to URL.
   * @param paths Array of paths need to be construct to URL.
   * @example
   * const BASE_URL_LOGOUT = "logout";
     const logoutUrlService = new ComposeUrlService(BASE_URL_LOGOUT);
     const NEW_URL = logoutUrlService.concatWith(["test1", "test2", "test3"]);
     console.log(NEW_URL)
     @result test1/test2/test3/
   */
  public concatWith(paths: string[]) {
    return paths.reduce((acc, cur) => {
      return ComposeUrlService.composeUrl(`${acc}${cur}`);
    }, this.getBaseUrl());
  }

  /** Compose URLs of some common API methods. */
  public composeCommonAPIMethodUrls(): {
    getAndCreate: string;
    updateAndDeleteWithId: (param: Primitive) => string;
  } {
    return {
      getAndCreate: this.getBaseUrl(),
      updateAndDeleteWithId: (param: Primitive) =>
        this.constructUrlWithParam(param),
    };
  }
}
