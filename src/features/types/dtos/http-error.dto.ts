export type DetailErrorDto<T> = {
  [P in keyof T]?: T[P] extends File
    ? string[]
    : T[P] extends any[]
    ? string[]
    : T[P] extends Record<string, any>
    ? DetailErrorDto<T[P]>
    : string[];
};

export type HttpErrorDto<T> = DetailErrorDto<T> & {
  non_field_errors?: string[];
};
