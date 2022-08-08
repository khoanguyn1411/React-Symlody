export function formatCurrency(price: number): string {
  const formattedPrice = price
    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "₫")
    .replace(/\s+/g, "");
  return formattedPrice;
}
