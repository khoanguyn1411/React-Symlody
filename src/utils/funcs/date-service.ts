import dayjs from "dayjs";

export namespace DateService {
  /**
   * Format text to date as string.
   * @param value Text need to be formatted to Date.
   * @param type Type of format.
   */
  export function toFormat(
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
   * Compare selected date with today.
   * @param dateStr Input date.
   * @returns "today" if input date is today, "in-past" if input date is not yet today, "in-future" is for the remaining case.
   */
  export function compareWithToday(
    dateStr: string | Date
  ): "in-past" | "in-future" | "today" {
    const userEntered = new Date(dateStr);
    const today = new Date();
    if (toFormat(userEntered, "US") === toFormat(today, "US")) {
      return "today";
    }
    if (userEntered.getTime() < today.getTime()) {
      return "in-past";
    }
    return "in-future";
  }

  /**
   * Get date after a week compare with today.
   * @returns Date string with "US" formatted.
   */
  export function getDayAfterWeek(): string {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return DateService.toFormat(today, "US");
  }
}
