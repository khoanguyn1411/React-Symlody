export namespace CommonFilterParams {
  export interface Pagination {
    page: number;
    limit: number;
  }
  export interface Search {
    search: string;
  }
  export type Combined = Pagination & Search;
}
