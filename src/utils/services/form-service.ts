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
