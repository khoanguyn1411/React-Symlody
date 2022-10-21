import React, { useEffect, useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";

import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getTasksAsync, taskSelectors } from "@/features/reducers/task-reducer";
import { useModal } from "@/hooks";

import { TODO_DATA } from "../constant";
import { ModalEditTodo } from "../todo-modals";
import { TTodoColumn } from "../type";
import { onDragEnd } from "./function";
import { TodoColumn } from "./TodoColumn";
import { TCardHiddenStatus } from "./type";

export const TodoBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskState = useAppSelector((state) => state.task);
  const taskList = useAppSelector(taskSelectors.selectAll);
  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const propsModalEdit = useModal();

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

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);

  if (taskState.pending) {
    return (
      <div className="h-[calc(100vh-7.8rem)] grid place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-auto px-default grid gap-x-7 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {columnList.map((column) => {
          column.cards = taskList.filter((item) => item.status === column.id);
          return (
            <TodoColumn
              onClickCard={handleCardClick}
              draggingCard={draggingCard}
              key={column.id}
              columnData={column}
            />
          );
        })}
      </DragDropContext>
      <ModalEditTodo {...propsModalEdit} />
    </div>
  );
};
