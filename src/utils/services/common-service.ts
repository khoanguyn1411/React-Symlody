import { Primitive } from "../types";

/**
 * Check whether entity is object or not.
 * @param entity Entity that need to be checked.
 */
export function isObject(entity: any): boolean {
  return entity != null && entity.constructor.name === "Object";
}

/**
 * Check whether elements in array 1 included in array 2.
 * @param arr1 First array.
 * @param arr2 Second array.
 */
export function hasElementOfArray<T extends any[]>(arr1: T, arr2: T): boolean {
  return arr1.some((v) => arr2.includes(v));
}

export function assertArray(entity: unknown): asserts entity is any[] {
  if (!Array.isArray(entity) && entity != null) {
    throw new Error(`Suppose to be array but got ${typeof entity}.`);
  }
}

export function assertNotArray<T>(entity: unknown): asserts entity is T {
  if (Array.isArray(entity) && entity != null) {
    throw new Error(`Suppose to be not array type.`);
  }
}

export function assertString(entity: unknown): asserts entity is string {
  if (typeof entity !== "string" && entity != null) {
    throw new Error(`Suppose to be string but got ${typeof entity}.`);
  }
}

export function assertPrimitive(entity: unknown): asserts entity is Primitive {
  if (
    typeof entity !== "string" &&
    typeof entity !== "boolean" &&
    typeof entity !== "number" &&
    entity != null
  ) {
    throw new Error(`Suppose to be string but got ${typeof entity}.`);
  }
}
