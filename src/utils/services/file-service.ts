export function isCorrectExtension(fileName: string): boolean {
  const arrStr = fileName.split(".");
  const strExtension = arrStr[arrStr.length - 1];
  if (strExtension === "xlsx") {
    return true;
  }
  return false;
}
