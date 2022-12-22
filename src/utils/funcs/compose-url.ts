import { Primitive } from "../types";

export class ComposeUrlService {
  private baseUrl = "";
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public composeUrl(url: Primitive) {
    return `${url}/`;
  }

  public constructUrlWithId(id: Primitive) {
    return `${this.baseUrl}/${id}/`;
  }

  public composeWith(urls: string[]) {
    return urls.reduce((acc, cur) => {
      return this.composeUrl(`${acc}${cur}`);
    }, this.composeUrl(this.baseUrl));
  }

  public composeCommonAPIMethodUrls() {
    return {
      create: this.composeUrl(this.baseUrl),
      get: this.composeUrl(this.baseUrl),
      update: (id: Primitive) => this.constructUrlWithId(id),
      delete: (id: Primitive) => this.constructUrlWithId(id),
    };
  }
}
