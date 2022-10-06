import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { TODO_DATA } from "../constant";
import { TTodoColumn } from "../type";
import { TodoColumn } from "./TodoColumn";

export const TodoBoard: React.FC = () => {
  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const handleDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;
    const sourceColumn = columnList.find(
      (col) => col.id === source.droppableId
    );

    if (!sourceColumn || !destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const destinationColumn = columnList.find(
        (col) => col.id === destination.droppableId
      );
      const sourceCards = [...sourceColumn.cards];
      const destinationCards = [...destinationColumn.cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, removed);
      setColumnList((prev) =>
        prev.map((item) => {
          if (item.id === source.droppableId) {
            return { ...item, cards: sourceCards };
          }
          if (item.id === destination.droppableId) {
            return { ...item, cards: destinationCards };
          }
          return item;
        })
      );
      return;
    }
    const copiedItem = [...sourceColumn.cards];
    const [removed] = copiedItem.splice(source.index, 1);
    copiedItem.splice(destination.index, 0, removed);
    setColumnList((prev) =>
      prev.map((item) => {
        if (item.id === source.droppableId) {
          return { ...item, cards: copiedItem };
        }
        return item;
      })
    );
  };

  return (
    <div className="h-full pb-5 mt-5 overflow-auto px-default grid gap-5 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
      <DragDropContext onDragEnd={handleDragEnd}>
        {columnList.map((column) => (
          <TodoColumn key={column.id} columnData={column} />
        ))}
      </DragDropContext>
    </div>
  );
};
