import { Primitive } from "../types/common";

export namespace CommonAssertion {
  /**
   * Assert entity to be an array.
   * @param entity Entity to be asserted.
   */
  export function assertArray(entity: unknown): asserts entity is any[] {
    if (!Array.isArray(entity) && entity != null) {
      throw new Error(`Suppose to be array but got ${typeof entity}.`);
    }
  }

  /**
   * Assert entity to not being an array.
   * @param entity Entity to be asserted.
   */
  export function assertNotArray<T>(entity: unknown): asserts entity is T {
    if (Array.isArray(entity) && entity != null) {
      throw new Error(`Suppose to be not array type.`);
    }
  }

  /**
   * Assert entity to be string.
   * @param entity Entity to be asserted.
   */
  export function assertString(entity: unknown): asserts entity is string {
    if (typeof entity !== "string" && entity != null) {
      throw new Error(`Suppose to be string but got ${typeof entity}.`);
    }
  }

  /**
   * Assert entity to be primitive type (string, boolean and number).
   * @param entity Entity to be asserted.
   */
  export function assertPrimitive(
    entity: unknown
  ): asserts entity is Primitive {
    if (
      typeof entity !== "string" &&
      typeof entity !== "boolean" &&
      typeof entity !== "number" &&
      entity != null
    ) {
      throw new Error(`Suppose to be string but got ${typeof entity}.`);
    }
  }
}
