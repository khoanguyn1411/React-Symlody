import { DropResult } from "react-smooth-dnd";

import { TTodoCard } from "./type";

export function applyDrag(arr: TTodoCard[], dropResult: DropResult) {
  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex === null && addedIndex === null) {
    return arr;
  }
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
}
