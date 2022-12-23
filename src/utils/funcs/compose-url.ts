import { Primitive } from "../types";

export class ComposeUrlService {
  private basePath = "";
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public static composeUrl(url: Primitive) {
    return `${url}/`;
  }

  public getBaseUrl() {
    return ComposeUrlService.composeUrl(this.basePath);
  }

  public constructUrlWithId(id: Primitive) {
    return `${this.basePath}/${id}/`;
  }

  public composeWith(urls: string[]) {
    return urls.reduce((acc, cur) => {
      return ComposeUrlService.composeUrl(`${acc}${cur}`);
    }, this.getBaseUrl());
  }

  public composeCommonAPIMethodUrls() {
    return {
      getAndCreate: this.getBaseUrl(),
      updateAndDeleteWithId: (id: Primitive) => this.constructUrlWithId(id),
    };
  }
}
