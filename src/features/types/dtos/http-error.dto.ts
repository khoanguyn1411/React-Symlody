export interface DetailErrorDto {
  readonly [key: string]: string[];
}

export interface HttpErrorDto {
  /** Error detail. */
  readonly details?: DetailErrorDto;

  /** Error detail. */
  readonly error: string;
}
