import React, { useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";

import { useModal } from "@/hooks";

import { TODO_DATA } from "../constant";
import { ModalEditTodo } from "../todo-modals";
import { TTodoColumn } from "../type";
import { onDragEnd } from "./function";
import { TodoColumn } from "./TodoColumn";
import { TCardHiddenStatus } from "./type";

export const TodoBoard: React.FC = () => {
  const propsModalEdit = useModal();
  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const [draggingCard, setCardHiddenStatus] = useState<TCardHiddenStatus>({
    cardId: null,
    isCardDragging: false,
    columnId: null,
  });

  const handleDragEnd = (dropResult: DropResult) => {
    onDragEnd(dropResult, columnList, setColumnList);
    setCardHiddenStatus({
      cardId: null,
      isCardDragging: false,
      columnId: null,
    });
  };
  const handleDragStart = (initial: DragStart) => {
    setCardHiddenStatus({
      cardId: initial.draggableId,
      isCardDragging: true,
      columnId: initial.source.droppableId,
    });
  };

  const handleCardClick = (cardInfo) => {
    propsModalEdit.toggle.setToggle();
    console.log(cardInfo);
  };

  return (
    <div className="pb-5 mt-5 overflow-auto px-default grid gap-7 grid-cols-4-1fr h-container">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {columnList.map((column) => (
          <TodoColumn
            onClickCard={handleCardClick}
            draggingCard={draggingCard}
            key={column.id}
            columnData={column}
          />
        ))}
      </DragDropContext>
      <ModalEditTodo {...propsModalEdit} />
    </div>
  );
};
