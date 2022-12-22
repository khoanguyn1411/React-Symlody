/** Strict omit with suggestion (because built-in Omit typescript not supporting suggestion) */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * Object type.
 * The main benefit of Record<string, any> is idexable types, compare with pure `object` type.
 */
export type RecordObject = Record<string, any>;

/** Chain of primitive and simple types. */
export type Primitive = string | number | boolean;

/** Check if type is include provided key or not. */
export type IsInclude<
  T extends RecordObject,
  P extends string
> = T[P] extends string ? true : false;
