import { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FieldError, Path, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

import { ErrorResponse, HttpError } from "@/features/types";

import { RecordObject, ReduxThunk, StrictOmit } from "../types";
import { CommonAssertion } from "./common-assertion";
import { isObject } from "./is-object";

type CustomMessage<T> = {
  [P in Path<T>]?: string;
};

interface InputFormError<T> {
  /** HttpError (`error.detail` of request's result) */
  errors: T;

  /** Please do not use this key because it's only for generating recursive function purpose. */
  accumulativeKey?: string;

  /** Custom message if you need to override current backend error. */
  customMessage?: CustomMessage<T>;

  /** setError function of `useForm` hook. */
  setError: UseFormSetError<any>;
}

/** Recursive function for `generateErrors` function.*/
function generateErrorsRecursive<T extends HttpError<RecordObject>>({
  errors,
  accumulativeKey = null,
  customMessage,
  setError,
}: InputFormError<T>): void {
  Object.entries(errors).forEach(([key, value]) => {
    if (!isObject(errors[key])) {
      CommonAssertion.assertString(value);
      if (value == null) {
        return;
      }

      if (accumulativeKey) {
        const newKey = `${accumulativeKey}.${key}`;
        if (customMessage && customMessage[newKey] != null) {
          setError(newKey, { message: customMessage[newKey] });
          return;
        }
        setError(newKey, { message: value });
        return;
      }

      if (customMessage && customMessage[key] != null) {
        setError(key, { message: customMessage[key] });
        return;
      }
      setError(key, { message: value });
      return;
    }
    let currentKey: string;
    if (accumulativeKey) {
      currentKey = `${accumulativeKey}.${key}`;
    } else {
      currentKey = key;
    }
    generateErrorsRecursive({
      errors: errors[key] as T,
      accumulativeKey: currentKey,
      customMessage: customMessage,
      setError,
    });
  });
}

export namespace FormService {
  /**
   * Check if value is changed or not on edit modal view.
   * - Why not using `isDirty` prop from `formState` directly but through this function?
   * - Because `isDirty` prop keep its state when reset form values (or closing edit modal).
   *   Therefore, we have to replace it with dirtyFields and check its change through this
   *   function to make sure every closing modal action will reset the state of dirty value.
   * ----------------------------------
   * @param dirtyFields `dirtyFields` from `formState` of `useForm` hook.
   * @returns Return `true` when the quantity of keys in dirtyFields = 0, otherwise `false`.
   */
  export function isDirtyFields<T extends RecordObject>(
    dirtyFields: T
  ): boolean {
    return Object.keys(dirtyFields).length > 0;
  }

  /**
   * Assert type of error field in react-hook-form.
   * @param errorField Error filed which need to be asserted.
   */
  export function assertErrorField<T extends unknown>(
    errorField: T
  ): FieldError {
    return errorField as FieldError;
  }

  /**
   * Generate form errors returned from backend.
   * Advantages for this usage:
   * - Execute perfectly with nested error objects.
   * - Provide solutions for custom errors.
   * - Provide strict type for validation.
   * ----------------------------------
   * @param input Input object, included following keys:
   * - `httpError`: HttpError (`error.detail` of request's result).
   * - `accumulativeKey`: Please do not use this key because it's only for generating recursive function purpose.
   * - `customMessage`: Custom message if you need to override current backend error.
   * - `setError`: `setError` function of `useForm` hook.
   */
  export function generateErrors<T extends HttpError<RecordObject>>(
    inputValue: StrictOmit<InputFormError<T>, "accumulativeKey">
  ): void {
    if (inputValue.errors == null) {
      return;
    }
    return generateErrorsRecursive(inputValue);
  }

  /**
   * Validate response from asyncThunk.
   * @param config Config to validate.
   */
  export function validateResponse<
    TResult,
    TInput extends RecordObject,
    TAsynThunk extends AsyncThunk<
      TResult,
      TInput,
      ReduxThunk.RejectValue<ErrorResponse<TError, TKeyOfError>>
    >,
    TFormError extends RecordObject,
    TError extends RecordObject,
    TKeyOfError extends keyof TError = undefined
  >(config: {
    /** AsyncThunk function. */
    asyncThunk: TAsynThunk;

    /** Response of request. */
    response:
      | PayloadAction<TResult, string, ReduxThunk.FulfilledRequest<TInput>>
      | PayloadAction<
          ErrorResponse<TError, TKeyOfError>,
          string,
          ReduxThunk.RejectedRequest<TInput>
        >;

    /** Success message to display on toast. */
    successMessage: string;

    /** Error message to display on toast. */
    errorMessage: string;

    /** Set error function of react-hook-form. */
    setError: UseFormSetError<TFormError>;

    /** On success response. */
    onSuccess?: (result: TResult) => void;

    /** On error response. */
    onError?: (errors: ErrorResponse<TError, TKeyOfError>) => void;
  }): void {
    const {
      asyncThunk,
      response,
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      setError,
    } = config;

    if (asyncThunk.fulfilled.match(response)) {
      onSuccess?.(response.payload);
      toast.success(successMessage);
      return;
    }
    onError?.(response.payload);
    const errors = response.payload;
    if (errors && errors.kind === "bad-data") {
      generateErrors({ errors: errors.httpError, setError });
      return;
    }
    toast.error(errorMessage);
  }
}
