import dayjs from "dayjs";

export class FormatService {
  public static toCurrency(price: number | string): string {
    let _price = price;
    if (typeof price === "string") {
      _price = FormatService.toNumber(price);
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

  public static removeFormatCurrency(price: string): string {
    return price.replaceAll(".", "");
  }

  public static toString(entity: any): string {
    try {
      return entity.toString();
    } catch (error) {
      throw new Error("Cannot cast this entity to string: ", entity);
    }
  }

  public static toNumber(entity: any): number {
    try {
      return Number(entity);
    } catch (error) {
      throw new Error("Cannot cast this entity to string: ", entity);
    }
  }

  public static normalizeStringNumber(value: string): string {
    return value.replaceAll(".", "");
  }

  public static toCleanedString(value: string): string {
    return this.removeAccent(value).toLowerCase().trim();
  }

  public static toDate(value: string, type: "VN" | "US" | "API"): string {
    if (type === "US") {
      return dayjs(value).format("MM/DD/YYYY");
    }
    if (type === "API") {
      return dayjs(value).format("YYYY-MM-DD");
    }
    return dayjs(value).format("DD/MM/YYYY");
  }
  public static removeAccent(str: string): string {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str;
  }
}
