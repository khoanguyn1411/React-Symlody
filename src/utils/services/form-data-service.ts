export function repairFormData<T extends Record<string, any>>(
  value: T
): FormData {
  const formData = new FormData();
  Object.entries(value).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
}
