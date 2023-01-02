import { Primitive } from "@/utils/types";

import { Option } from "../select/type";

const MONTHS = [...Array(12)].map((_, index) => index + 1);

const YEARS: number[] = [...Array(100)].map((_, index) => 1990 + index);

export const YEAR_LIST: Option<undefined, Primitive>[] = YEARS.map((year) => ({
  value: year,
  label: year.toString(),
}));

export const MONTH_LIST: Option<undefined, Primitive>[] = MONTHS.map(
  (month) => ({
    value: month,
    label: `Th. ${month}`,
  })
);

export const WEEK_DAY_ENG = {
  Sunday: "CN",
  Monday: "T2",
  Tuesday: "T3",
  Wednesday: "T4",
  Thursday: "T5",
  Friday: "T6",
  Saturday: "T7",
} as const;
