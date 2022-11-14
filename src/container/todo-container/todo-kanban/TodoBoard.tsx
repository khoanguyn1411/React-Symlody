import React, { useEffect, useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";

import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getTasksAsync,
  taskSelectors,
  updateTaskAsync,
} from "@/features/reducers/task-reducer";
import { ITask } from "@/features/types";
import { useModal } from "@/hooks";
import { FormatService } from "@/utils";

import { TODO_DATA, TODO_MESSAGES } from "../constant";
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

  const handleDragEnd = async (dropResult: DropResult) => {
    onDragEnd(dropResult, columnList, setColumnList);
    setCardHiddenStatus({
      cardId: null,
      isCardDragging: false,
      columnId: null,
    });
    const result = await dispatch(
      updateTaskAsync({
        id: FormatService.toNumber(dropResult.draggableId),
        payload: {
          ...taskList.find((task) => task),
          status: dropResult.destination.droppableId as ITask["status"],
        },
      })
    );
    if (result.meta.requestStatus === "rejected") {
      toast.error(TODO_MESSAGES.update.error);
    }
  };
  const handleDragStart = (initial: DragStart) => {
    setCardHiddenStatus({
      cardId: initial.draggableId,
      isCardDragging: true,
      columnId: initial.source.droppableId,
    });
  };
  const handleCardClick = () => {
    propsModalEdit.toggle.setToggle();
  };

  useEffect(() => {
    const columnWithTasks: TTodoColumn[] = columnList.map((column) => {
      return {
        ...column,
        cards: taskList.filter((item) => item.status === column.id),
      };
    });
    setColumnList(columnWithTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);

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
