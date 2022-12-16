/**
 * Check whether entity is object or not.
 * @param entity Entity that need to be checked.
 */
export function isObject(entity: any): boolean {
  return entity != null && entity.constructor.name === "Object";
}
