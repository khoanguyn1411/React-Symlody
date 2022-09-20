import dayjs from "dayjs";

export class FormatService {
  public static toCurrency(price: number): string {
    const formattedPrice = price
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

  public static toNormalNumber(value: string): string {
    return value.replaceAll(".", "");
  }

  public static toCleanedString(value: string): string {
    return value.toLowerCase().trim();
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

  public static reverseToDto<
    Model extends string | number | symbol,
    Dto extends string | number | symbol
  >(
    model: Readonly<Record<Dto, Model>>,
    isNumberModel = false
  ): Readonly<Record<Model, Dto>> {
    let obj: Readonly<Record<Model, Dto>>;
    Object.entries(model).forEach(([key, value]) => {
      obj = {
        ...obj,
        [value as Dto]: !isNumberModel ? (key as Model) : Number(key),
      };
    });
    return obj;
  }
}
