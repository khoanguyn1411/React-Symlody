/**
 * Get form default values (from api)
 * @param data Default values of form.
 */
export function getDefaultValues<T>(data: T) {
  return {
    get(key: keyof T, defaultValue?: string) {
      if (data) {
        return data[key] as unknown as string;
      }
      return defaultValue ?? undefined;
    },
  };
}

/**
 * Make sure dirty fields value correct when reset form data.
 * @param dirtyField dirtyField from formState of useForm.
 */
export function isDirtyFields(dirtyField: unknown): boolean {
  return Object.keys(dirtyField).length === 0;
}
