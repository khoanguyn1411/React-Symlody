export type ReduxThunkRejectValue<T> = { rejectValue: T };

export type ReduxThunkRestorePayload<T, K extends { id: number | string }> = {
  payload: T;
  isRestore: boolean;
  id: K["id"];
};
export type ReduxThunkRestoreResult<T> = {
  result: T;
  isRestore: boolean;
};

export type ReduxThunkRestoreRejected<T> = ReduxThunkRejectValue<
  ReduxThunkRestoreResult<T>
>;
