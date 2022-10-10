/**
 * Closure interaction function for form default values (values from api).
 * @param data Default values of form.
 */
export function getDefaultValues<T>(data: T) {
  return {
    /**
     * Get value by key in default value object (with suggestion).
     * @param key Key of value need to get.
     * @param defaultValue Value returned when the value of key need to get is undefined or null.
     * @returns Return value of key as string if value != `null`, otherwise, return `defaultValue` and if there is
     * no `defaultValue`, return `undefined`.
     */
    get(key: keyof T, defaultValue?: string) {
      if (data) {
        return data[key] as unknown as string;
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
export function isDirtyFields(dirtyFields: unknown): boolean {
  return Object.keys(dirtyFields).length > 0;
}
