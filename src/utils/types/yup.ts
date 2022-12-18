import { AnySchema } from "yup";

/** Validation type for Yup generic object type. */
export type YupValidation<T> = Record<keyof T, AnySchema>;
