import dayjs from "dayjs";

/**
 * Format text to currency (VND).
 * @param price Number as string need to be formatted to currency.
 */
export function toCurrency(price: number | string): string {
  let _price = price;
  if (typeof price === "string") {
    _price = toNumber(price);
  }
  const formattedPrice = _price
    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "")
    .replace(/\s+/g, "");
  return formattedPrice;
}

/**
 * Remove format currency of text (remove . from text).
 * @param price Text need to remove format currency.
 */
export function removeFormatCurrency(price: string): string {
  if (price) {
    return price.replaceAll(".", "");
  }
}

/**
 * Cast entity to string.
 * @param entity Entity need to be casted to string.
 */
export function toString(entity: any): string {
  try {
    return entity.toString();
  } catch (error) {
    throw new Error("Cannot cast this entity to string: ", entity);
  }
}

/**
 * Cast entity to number.
 * @param entity Entity need to be casted to number.
 */
export function toNumber(entity: any): number {
  try {
    return Number(entity);
  } catch (error) {
    throw new Error("Cannot cast this entity to string: ", entity);
  }
}

/**
 * Clean text (remove accents, lowercase and trim).
 * @param value Text need to be cleaned.
 */
export function toCleanedString(value: string): string {
  return removeAccent(value).toLowerCase().trim();
}

/**
 * Format text to date as string.
 * @param value Text need to be formatted to Date.
 * @param type Type of format.
 */
export function toDateString(
  value: string | Date,
  type: "VN" | "US" | "API"
): string {
  if (type === "US") {
    return dayjs(value).format("MM/DD/YYYY");
  }
  if (type === "API") {
    return dayjs(value).format("YYYY-MM-DD");
  }
  return dayjs(value).format("DD/MM/YYYY");
}

/**
 * Remove accents from text.
 * @param str Text need to remove accents.
 */
export function removeAccent(str: string): string {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return str;
}

/**
 * Capitalize first letter of a string.
 * @param string String need to be capitalized letter.
 * @param index Index of character need to capitalize (default is 0).
 */
export function capitalizeLetter(string: string, index = 0): string {
  return string.charAt(index).toUpperCase() + string.slice(index + 1);
}

/**
 * Format text to date.
 * @param string Text need to be formatted to Date.
 */
export function toDate(string: string): Date {
  try {
    return new Date(string);
  } catch (err) {
    throw new Error("Invalid date string!");
  }
}
