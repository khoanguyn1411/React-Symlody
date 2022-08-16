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

  public static toNormalNumber(value: string): string {
    return value.replaceAll(".", "");
  }
}
