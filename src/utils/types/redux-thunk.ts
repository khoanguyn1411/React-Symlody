/** Redux common type in application. */
export namespace ReduxThunk {
  /** Rejected value type of redux thunk. */
  export type RejectValue<T> = { rejectValue: T };

  /** Payload type specialize for entity updating feature included restore handler (entity included `is_archived` key). */
  export type RestorePayload<T, K extends { id: number | string }> = {
    payload: T;
    isRestore: boolean;
    id: K["id"];
  };

  /** Result type specialize for entity updating feature included restore handler (entity included `is_archived` key). */
  export type RestoreResult<T> = {
    result: T;
    isRestore: boolean;
  };

  /** Rejected type specialize for entity updating feature included restore handler (entity included `is_archived` key). */
  export type RestoreRejected<T> = RejectValue<RestoreResult<T>>;

  export interface FulfilledRequest<TInput> {
    arg: TInput;
    requestId: string;
    requestStatus: "fulfilled";
  }

  export interface RejectedRequest<TInput> {
    arg: TInput;
    requestId: string;
    requestStatus: "rejected";
  }
}
