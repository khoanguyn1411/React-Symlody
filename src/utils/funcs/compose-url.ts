import { Primitive } from "../types";

export class ComposeUrlService {
  private basePath = "";
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public composeUrl(url: Primitive) {
    return `${url}/`;
  }

  public constructUrlWithId(id: Primitive) {
    return `${this.basePath}/${id}/`;
  }

  public composeWith(urls: string[]) {
    return urls.reduce((acc, cur) => {
      return this.composeUrl(`${acc}${cur}`);
    }, this.composeUrl(this.basePath));
  }

  public composeCommonAPIMethodUrls() {
    return {
      create: this.composeUrl(this.basePath),
      get: this.composeUrl(this.basePath),
      update: (id: Primitive) => this.constructUrlWithId(id),
      delete: (id: Primitive) => this.constructUrlWithId(id),
    };
  }
}
