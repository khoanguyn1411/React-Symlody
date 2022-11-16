import React, { useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";

import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import {
  getTasksAsync,
  getTasksByAssignee,
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

type TProps = {
  isLoading: boolean;
};

export const TodoBoard: React.FC<TProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const taskStore = useAppSelector((state) => state.task);
  const taskList = useAppSelector(taskSelectors.selectAll);
  const userList = useAppSelector(userSelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);

  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const propsModalEdit = useModal<ITask>();

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
    if (dropResult.destination.droppableId === dropResult.source.droppableId) {
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
  const handleCardClick = (cardInfo: ITask) => {
    propsModalEdit.toggle.setToggle();
    propsModalEdit.setData(cardInfo);
  };

  useEffect(() => {
    const columnWithTasks: TTodoColumn[] = columnList.map((column) => {
      return {
        ...column,
        cards: taskStore.listTasksByAssignee.filter(
          (item) => item.status === column.id
        ),
      };
    });
    setColumnList(columnWithTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStore.listTasksByAssignee]);

  useLayoutEffect(() => {
    const { department_id } = taskStore.listQueryTask;
    dispatch(getTasksAsync({ department_id }));
  }, [currentUser.organization.id, dispatch, taskStore.listQueryTask]);

  useEffect(() => {
    dispatch(getTasksByAssignee({ taskList, userList }));
  }, [dispatch, taskList, taskStore.selectedMemberList, userList]);

  if (isLoading) {
    return (
      <div className="mt-5 overflow-auto px-default grid gap-x-5 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
        {[...Array(4)].map((_, index) => {
          return (
            <div
              key={index}
              className="bg-gray-300 rounded-lg dark:bg-gray-200 animate-skeleton h-[calc(100vh_-_160px)] min-w-[200px]"
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
