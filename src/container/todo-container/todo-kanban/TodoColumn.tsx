import classNames from "classnames";
import { useLayoutEffect, useMemo, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { Task, TASK_STATUS_FROM_ID_TO_READABLE } from "@/features/types";
import { mapOrder } from "@/utils/funcs/map-order";

import { TODO_DATA } from "../constant";
import { TTodoColumn } from "../type";
import { TodoCard } from "./TodoCard";
import { TCardHiddenStatus } from "./type";

type TProps = {
  columnData: TTodoColumn;
  draggingCard: TCardHiddenStatus;
  onClickCard?: (item: any) => void;
};

export const TodoColumn: React.FC<TProps> = ({
  columnData,
  draggingCard,
  onClickCard,
}) => {
  const [listCard, setListCard] = useState<Task[]>(columnData.cards);

  useLayoutEffect(() => {
    const sortedCardList = mapOrder(
      columnData.cards,
      columnData.cardOrder,
      "id"
    );
    setListCard(sortedCardList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnData.cards]);

  const isColumnDraggingFrom = useMemo(() => {
    return (
      columnData.id === draggingCard.columnId || !draggingCard.isCardDragging
    );
  }, [columnData.id, draggingCard.columnId, draggingCard.isCardDragging]);

  const shouldHaveColor = useMemo(
    () => (color: TTodoColumn["color"]) => {
      return (
        draggingCard.columnId &&
        TODO_DATA.columns.find((item) => item.id === draggingCard.columnId)
          .color === color
      );
    },
    [draggingCard.columnId]
  );

  const _onCardClick = (cardInfo: Task) => () => {
    onClickCard(cardInfo);
  };

  const hasTasks = columnData.cards.length > 0;
  const taskQuantity = columnData.cards.length; // Task quantity of specific column, not all.
  const isColumnNotInDragging = draggingCard.columnId !== columnData.id;

  return (
    <div className="bg-gray-100 rounded-lg h-[calc(100%_-_15px)] min-w-[275px]">
      <div className="sticky top-0 z-[2] bg-gray-50">
        <h1 className="px-3 py-4 font-medium bg-gray-100 rounded-t-lg">
          {columnData.title} {hasTasks && `${taskQuantity} công việc`}
        </h1>
        <div
          hidden={isColumnDraggingFrom}
          className={classNames({
            "flex items-center justify-center absolute w-full top-20 px-4":
              !isColumnDraggingFrom,
          })}
        >
          <div className="flex flex-wrap items-start justify-center w-full">
            <span
              className={classNames(
                "font-medium text-sm px-1 mb-2 py-[0.5px] rounded-sm",
                {
                  "bg-green-50 text-green-800": shouldHaveColor("green"),
                  "bg-gray-50 text-primary-800": shouldHaveColor("blue"),
                }
              )}
            >
              {TASK_STATUS_FROM_ID_TO_READABLE[draggingCard.columnId]}
            </span>
            <span className="mx-2 mt-1 text-xs">
              <i className="fas fa-arrow-right" />
            </span>
            <span
              className={classNames(
                "font-medium text-sm px-1 py-[0.5px] rounded-sm",
                {
                  "bg-green-50 text-green-800": columnData.color === "green",
                  "bg-gray-50 text-primary-800": columnData.color === "blue",
                }
              )}
            >
              {columnData.title}
            </span>
          </div>
        </div>
      </div>

      <div
        className={classNames("flex flex-col px-2 pb-3 h-[calc(100%-3.8rem)]", {
          "overflow-y-hidden":
            isColumnNotInDragging && draggingCard.isCardDragging,
        })}
      >
        <Droppable droppableId={columnData.id}>
          {(providedDrop, snapshot) => {
            return (
              <>
                <div
                  className={classNames(
                    "transition-colors duration-150 pb-3 h-full border-2 rounded-md",
                    {
                      "border-primary-800 bg-primary-50 border-dashed":
                        snapshot.isDraggingOver,
                      "bg-gray-200 border-gray-500 border-dashed":
                        draggingCard.isCardDragging && !snapshot.isDraggingOver,
                      "border-transparent": !draggingCard.isCardDragging,
                    }
                  )}
                  ref={providedDrop.innerRef}
                  {...providedDrop.droppableProps}
                >
                  {listCard.map((cardProps, index) => (
                    <Draggable
                      key={cardProps.id}
                      index={index}
                      draggableId={cardProps.id.toString()}
                    >
                      {(provided) => (
                        <div
                          className={
                            cardProps.id.toString() !==
                              snapshot.draggingFromThisWith &&
                            draggingCard.isCardDragging &&
                            isColumnNotInDragging
                              ? "opacity-0"
                              : undefined
                          }
                          aria-hidden
                          onClick={_onCardClick(cardProps)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoCard {...cardProps} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <div hidden={isColumnNotInDragging}>
                    {providedDrop.placeholder}
                  </div>
                </div>
              </>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};
