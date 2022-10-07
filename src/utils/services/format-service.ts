import dayjs from "dayjs";

/**
 * Format text to currency (VND)
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
 * Remove format currency of text (remove . from text)
 * @param price Text need to remove format currency.
 */
export function removeFormatCurrency(price: string): string {
  return price.replaceAll(".", "");
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
export function toDate(value: string, type: "VN" | "US" | "API"): string {
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
