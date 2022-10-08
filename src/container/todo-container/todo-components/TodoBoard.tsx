import React, { useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";

import { TODO_DATA } from "../constant";
import { TTodoColumn } from "../type";
import { onDragEnd } from "./function";
import { TodoColumn } from "./TodoColumn";
import { TCardHiddenStatus } from "./type";

export const TodoBoard: React.FC = () => {
  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const [cardHiddenStatus, setCardHiddenStatus] = useState<TCardHiddenStatus>({
    cardId: null,
    isCardDragging: false,
    columnId: null,
  });

  const handleDragEnd = (dropResult: DropResult) => {
    onDragEnd(dropResult, columnList, setColumnList);
    setCardHiddenStatus({
      cardId: null,
      isCardDragging: false,
      columnId: dropResult.source.droppableId,
    });
  };
  const handleDragStart = (initial: DragStart) => {
    setCardHiddenStatus({
      cardId: initial.draggableId,
      isCardDragging: true,
      columnId: initial.source.droppableId,
    });
  };

  return (
    <div className="h-full pb-5 mt-5 overflow-auto px-default grid gap-5 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {columnList.map((column) => (
          <TodoColumn
            cardHiddenStatus={cardHiddenStatus}
            key={column.id}
            columnData={column}
          />
        ))}
      </DragDropContext>
    </div>
  );
};
