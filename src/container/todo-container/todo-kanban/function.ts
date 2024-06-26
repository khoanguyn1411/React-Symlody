import { DropResult } from "react-beautiful-dnd";

import { AppReact } from "@/utils/types";

import { TTodoColumn } from "../type";

/**
 * Handle drag end for `onDragEnd` event.
 * @param dropResult `dropResult` from `onDragEnd` of `DragDropContext` from `react-beautiful-dnd`
 * @param columnList Column list state.
 * @param setColumnList Set state event of column list state.
 */
export const onDragEnd = (
  dropResult: DropResult,
  columnList: TTodoColumn[],
  setColumnList: AppReact.State.Dispatch<TTodoColumn[]>
): void => {
  const { destination, source } = dropResult;
  const sourceColumn = columnList.find((col) => col.id === source.droppableId);

  if (!sourceColumn || !destination) {
    return;
  }
  // Handle dragging action from an column to another column.
  if (source.droppableId !== destination.droppableId) {
    const destinationColumn = columnList.find(
      (col) => col.id === destination.droppableId
    );
    const sourceCards = [...sourceColumn.cards];
    const destinationCards = [...destinationColumn.cards];
    const [removed] = sourceCards.splice(source.index, 1);
    // Replace destination.index with 0 to move dragging item into 1st position when drop it.
    // @example: destinationCards.splice(destination.index, 0, removed);
    destinationCards.splice(0, 0, removed);
    setColumnList((prev) =>
      prev.map((item) => {
        if (item.id === source.droppableId) {
          return {
            ...item,
            cards: sourceCards,
            cardOrder: sourceCards.map((item) => item.id),
          };
        }
        if (item.id === destination.droppableId) {
          return {
            ...item,
            cards: destinationCards,
            cardOrder: destinationCards.map((item) => item.id),
          };
        }
        return item;
      })
    );
    return;
  }
  // Handle dragging action in 1 column.
  const copiedItem = [...sourceColumn.cards];
  const [removed] = copiedItem.splice(source.index, 1);
  copiedItem.splice(destination.index, 0, removed);
  setColumnList((prev) =>
    prev.map((item) => {
      if (item.id === source.droppableId) {
        return {
          ...item,
          cards: copiedItem,
          cardOrder: copiedItem.map((item) => item.id),
        };
      }
      return item;
    })
  );
};
