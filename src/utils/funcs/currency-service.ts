export namespace CurrencyService {
  /**
   * Format text to currency (VND).
   * @param price Number as string need to be formatted to currency.
   */
  export function toCurrency(price: number | string): string {
    let _price = price;
    if (typeof price === "string") {
      _price = Number(price);
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
}
