/**
 * Check if file is in a correct extension.
 * @param fileName File name.
 */
export function isCorrectExtension(
  fileName: string,
  availableExtensions: string[]
): boolean {
  const arrStr = fileName.split(".");
  const strExtension = arrStr[arrStr.length - 1];
  return availableExtensions.includes(strExtension);
}

/**
 * Convert image file ito base 64.
 * @param file File need to convert.
 */
export function convertBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

/**
 * Convert file into form data.
 * @param file File need to convert.
 */
export function convertToFormData(file: File): FormData {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}
