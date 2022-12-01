export type DetailErrorDto<T> = {
  readonly [P in keyof T]?: T[P] extends Record<string, any>
    ? string[]
    : DetailErrorDto<T[P]>;
};

export interface HttpErrorDto<T> {
  /** Error detail. */
  readonly details?: DetailErrorDto<T>;

  /** Error detail. */
  readonly error: string;
}
