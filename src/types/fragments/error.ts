export type ErrorOf<T> = {
  readonly [K in keyof T]: string[];
};
