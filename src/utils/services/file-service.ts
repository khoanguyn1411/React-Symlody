/**
 * Check if file is in a correct extension.
 * @param fileName File name.
 */
export function isCorrectExtension(fileName: string): boolean {
  const arrStr = fileName.split(".");
  const strExtension = arrStr[arrStr.length - 1];
  if (strExtension === "xlsx") {
    return true;
  }
  return false;
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
