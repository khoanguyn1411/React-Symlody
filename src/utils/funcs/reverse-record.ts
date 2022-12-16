/**
 * Generate an reverse version from dto.
 * @param model Model of entity.
 * @param isNumberModel Whether model is number or not.
 */
export function reverseRecord<
  Model extends PropertyKey,
  Dto extends PropertyKey
>(
  model: Record<Dto, Model>,
  isNumberModel = false
): Readonly<Record<Model, Dto>> {
  let obj: Readonly<Record<Model, Dto>>;
  Object.entries(model).forEach(([key, value]) => {
    obj = {
      ...obj,
      [value as Dto]: !isNumberModel ? (key as Model) : Number(key),
    };
  });
  return obj;
}
