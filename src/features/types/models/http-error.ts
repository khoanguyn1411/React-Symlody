export type EntityValidationErrors<T> = {
  [P in keyof T]?: PropValidationMessage<T[P]>;
};

/**
 * Validation message type for specific property type.
 * Could be a just error message for simple field or nested validation error for composite fields.
 */
export type PropValidationMessage<T> = T extends unknown[]
  ? string
  : T extends Record<"id", any>
  ? string
  : T extends Record<string, any>
  ? EntityValidationErrors<T>
  : string;

export interface HttpError<T> {
  readonly detail: EntityValidationErrors<T>;
  readonly error: string;
}
