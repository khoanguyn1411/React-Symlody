import { FieldError, Path, UseFormSetError } from "react-hook-form";

import { HttpError } from "@/features/types";

import { assertString, isObject } from "./common-service";

/**
 * Closure interaction function for form default values (values from api).
 * -- DEPRECATED --
 * @param data Default values of form.
 */
export function getDefaultValues<T extends Record<string, any>>(data: T) {
  return {
    /**
     * Get value by key in default value object (with suggestion).
     * @param key Key of value need to get.
     * @param defaultValue Value returned when the value of key need to get is undefined or null.
     * @returns Return value of key if value != `null`, otherwise, return `defaultValue` and if there is
     * no `defaultValue`, return `undefined`.
     */
    get<P extends keyof T = keyof T>(key: P, defaultValue?: any): T[P] {
      if (data) {
        return data[key] as T[P];
      }
      return defaultValue ?? undefined;
    },
  };
}

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
export function isDirtyFields<T extends Record<string, any>>(
  dirtyFields: T
): boolean {
  return Object.keys(dirtyFields).length > 0;
}

/**
 * Assert type of error field in react-hook-form.
 * @param errorField Error filed which need to be asserted.
 */
export function assertErrorField<T extends unknown>(errorField: T): FieldError {
  return errorField as FieldError;
}

type CustomMessage<T> = {
  [P in Path<T>]?: string;
};

type InputFormError<T> = {
  /** HttpError (`error.detail` of request's result) */
  errors: T;

  /** Please do not use this key because it's only for generating recursive function purpose. */
  previousKey?: string;

  /** Custom message if you need to override current backend error. */
  customMessage?: CustomMessage<T>;

  /** setError function of `useForm` hook. */
  setError: UseFormSetError<any>;
};

/**
 * Generate form errors returned from backend.
 * Advantages for this usage:
 * - Execute perfectly with nested error objects.
 * - Provide solutions for custom errors.
 * - Provide strict type for validation.
 * ----------------------------------
 * @param input Input object, please see docs in this type for more detail.
 */
export function generateFormErrors<T extends HttpError<any>["detail"]>({
  errors,
  previousKey = null,
  customMessage,
  setError,
}: InputFormError<T>): void {
  Object.entries(errors).forEach(([key, value]) => {
    if (!isObject(errors[key])) {
      assertString(value);
      if (value == null) {
        return;
      }

      if (previousKey) {
        const newKey = `${previousKey}.${key}`;
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
    let newPreviousKey: string;
    if (previousKey) {
      newPreviousKey = `${previousKey}.${key}`;
    } else {
      newPreviousKey = key;
    }
    generateFormErrors({
      errors: errors[key] as T,
      previousKey: newPreviousKey,
      customMessage: customMessage,
      setError,
    });
  });
}
