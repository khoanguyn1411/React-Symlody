export function isCorrectExtension(fileName: string) {
  const arrStr = fileName.split(".");
  const strExtension = arrStr[arrStr.length - 1];
  console.log(strExtension);
  if (strExtension === "xlsx") {
    return true;
  }
  return false;
}
