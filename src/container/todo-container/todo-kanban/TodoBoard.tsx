import React, { useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import {
  filterTaskByAssignee,
  getTasksAsync,
  taskSelectors,
  updateTaskAsync,
} from "@/features/reducers/task-reducer";
import { Task } from "@/features/types";
import { useModal } from "@/hooks";
import { FormatService } from "@/utils";

import { TODO_DATA, TODO_MESSAGES } from "../constant";
import { ModalEditTodo } from "../todo-modals";
import { TTodoColumn } from "../type";
import { onDragEnd } from "./function";
import { TodoColumn } from "./TodoColumn";
import { TCardHiddenStatus } from "./type";

type TProps = {
  isLoading: boolean;
};

export const TodoBoard: React.FC<TProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const taskStore = useAppSelector((state) => state.task);
  const taskList = useAppSelector(taskSelectors.selectAll);
  const userList = useAppSelector(userSelectors.selectAll);

  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const propsModalEdit = useModal<Task>();

  const [draggingCard, setCardHiddenStatus] = useState<TCardHiddenStatus>({
    cardId: null,
    isCardDragging: false,
    columnId: null,
  });

  const handleDragEnd = async (dropResult: DropResult) => {
    onDragEnd(dropResult, columnList, setColumnList);
    const { destination, source } = dropResult;
    setCardHiddenStatus({
      cardId: null,
      isCardDragging: false,
      columnId: null,
    });
    if (destination.droppableId === source.droppableId) {
      return;
    }
    const currentTask = taskList.find(
      (task) => task.id === FormatService.toNumber(dropResult.draggableId)
    );
    const result = await dispatch(
      updateTaskAsync({
        id: FormatService.toNumber(dropResult.draggableId),
        payload: {
          ...currentTask,
          status: destination.droppableId as Task["status"],
        },
      })
    );
    if (updateTaskAsync.rejected.match(result)) {
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
  const handleCardClick = (cardInfo: Task) => {
    propsModalEdit.toggle.setToggle();
    propsModalEdit.setData(cardInfo);
  };

  useLayoutEffect(() => {
    const columnWithTasks: TTodoColumn[] = columnList.map((column) => {
      return {
        ...column,
        cards: taskStore.currentListTask.filter(
          (item) => item.status === column.id
        ),
      };
    });
    setColumnList(columnWithTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStore.currentListTask]);

  useLayoutEffect(() => {
    if (!taskStore.filterParamsTask.departmentId) {
      return;
    }
    dispatch(getTasksAsync(taskStore.filterParamsTask));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, taskStore.filterParamsTask.departmentId]);

  useEffect(() => {
    dispatch(filterTaskByAssignee());
  }, [
    dispatch,
    taskList,
    taskStore.filterParamsTask.selectedMemberList,
    userList,
  ]);

  if (isLoading || taskStore.pending) {
    return (
      <div className="mt-5 overflow-auto px-default grid gap-x-5 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
        {[...Array(4)].map((_, index) => {
          return (
            <div
              key={index}
              className="bg-gray-300 rounded-lg dark:bg-gray-200 animate-skeleton h-[calc(100vh_-_160px)] min-w-[275px]"
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-auto px-default grid gap-x-5 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
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
