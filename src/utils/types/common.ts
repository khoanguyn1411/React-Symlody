import { AnySchema } from "yup";

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
export type StrictPick<T, K extends keyof T> = Pick<T, K>;
export type Primitive = string | number | boolean;
export type YupValidation<T> = Record<keyof T, AnySchema>;
