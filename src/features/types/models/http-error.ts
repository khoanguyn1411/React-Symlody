import { Immerable, OmitImmerable } from "../immerable";

/** Interface for error datalist. */
export interface DetailError {
  readonly [key: string]: string[];
}

export type DetailNestedErrorOf<T> = {
  readonly [key in keyof T]: string[];
};

/** Errors that returned from backend. */
export class HttpError extends Immerable {
  /** Data of error. */
  public readonly details?: DetailError;

  /** Detail of error. */
  public readonly error: string;

  public readonly errorArray: string[];

  public constructor(data: PostInitArgs) {
    super();
    this.details = data.details;
    this.error = data.error;
    this.errorArray = data.errorArray;
  }
}

type PostInitArgs = OmitImmerable<HttpError>;
