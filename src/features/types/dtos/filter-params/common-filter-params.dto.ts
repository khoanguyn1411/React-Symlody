export namespace CommonFilterParamsDto {
  export interface PaginationDto {
    page: number;
    limit: number;
  }
  export interface SearchDto {
    search: string;
  }
  export type Combined = PaginationDto & SearchDto;
}
