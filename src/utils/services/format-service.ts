import dayjs from "dayjs";

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

export function removeFormatCurrency(price: string): string {
  return price.replaceAll(".", "");
}

export function toString(entity: any): string {
  try {
    return entity.toString();
  } catch (error) {
    throw new Error("Cannot cast this entity to string: ", entity);
  }
}

export function toNumber(entity: any): number {
  try {
    return Number(entity);
  } catch (error) {
    throw new Error("Cannot cast this entity to string: ", entity);
  }
}

export function normalizeStringNumber(value: string): string {
  return value.replaceAll(".", "");
}

export function toCleanedString(value: string): string {
  return removeAccent(value).toLowerCase().trim();
}

export function toDate(value: string, type: "VN" | "US" | "API"): string {
  if (type === "US") {
    return dayjs(value).format("MM/DD/YYYY");
  }
  if (type === "API") {
    return dayjs(value).format("YYYY-MM-DD");
  }
  return dayjs(value).format("DD/MM/YYYY");
}

export function removeAccent(str: string): string {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return str;
}
