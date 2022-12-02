export type DetailErrorDto<T> = {
  [P in keyof T]?: T[P] extends File
    ? string[]
    : T[P] extends any[]
    ? string[]
    : T[P] extends Record<string, any>
    ? DetailErrorDto<T[P]>
    : string[];
};

export interface HttpErrorDto<T> {
  /** Error detail. */
  readonly details?: DetailErrorDto<T>;

  /** Error detail. */
  readonly error: string;
}
