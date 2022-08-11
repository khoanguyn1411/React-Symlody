export function isCorrectExtension(fileName: string) {
  const arrStr = fileName.split(".");
  const strExtension = arrStr[arrStr.length - 1];
  if (strExtension === "xlsx") {
    return true;
  }
  return false;
}

export function formDefaultValueService<T>(data: T) {
  return {
    get(key: keyof T, defaultValue?: string) {
      if (data) {
        return data[key] as unknown as string;
      }
      return defaultValue ?? undefined;
    },
  };
}
