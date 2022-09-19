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
