import classNames from "classnames";
import { useLayoutEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { SortService } from "@/utils";

import { TODO_STATUS_MAP_FROM_ID, TTodoCard, TTodoColumn } from "../type";
import { TodoCard } from "./TodoCard";
import { TCardHiddenStatus } from "./type";

type TProps = {
  columnData: TTodoColumn;
  cardHiddenStatus: TCardHiddenStatus;
};

export const TodoColumn: React.FC<TProps> = ({
  columnData,
  cardHiddenStatus,
}) => {
  const [listCard, setListCard] = useState<TTodoCard[]>([]);

  useLayoutEffect(() => {
    const sortedCardList = SortService.mapOrder<TTodoCard>(
      columnData.cards,
      columnData.cardOrder,
      "id"
    );
    setListCard(sortedCardList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnData]);

  const isColumnDraggingFrom =
    columnData.id === cardHiddenStatus.columnId ||
    !cardHiddenStatus.isCardDragging;

  return (
    <div className="flex-1 h-full bg-gray-100 rounded-lg min-w-[200px]">
      <div className="sticky top-0 z-[2] bg-gray-50">
        <h1 className="px-3 py-4 font-medium bg-gray-100 rounded-t-lg">
          {columnData.title}
        </h1>
        <div
          className={classNames({
            hidden: isColumnDraggingFrom,

            "flex items-center justify-center absolute w-full top-20 px-4":
              !isColumnDraggingFrom,
          })}
        >
          <h1 className="p-2">
            Từ{" "}
            <span className="font-medium bg-primary-100 p-0.5 text-primary-800">
              {TODO_STATUS_MAP_FROM_ID[cardHiddenStatus.columnId]}
            </span>{" "}
            sang{" "}
            <span className="font-medium bg-secondary-100 p-0.5 text-secondary-800">
              {columnData.title}
            </span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col px-3 pb-3 h-[calc(100%-3.8rem)]">
        <Droppable droppableId={columnData.id}>
          {(providedDrop, snapshot) => {
            return (
              <div
                className={classNames(
                  "transition-colors duration-150 h-full border-2 rounded-md",
                  {
                    "border-gray-500 bg-green-100 border-dashed":
                      snapshot.isDraggingOver,
                    "bg-gray-200 border-gray-500  border-dashed":
                      cardHiddenStatus.isCardDragging &&
                      !snapshot.isDraggingOver,
                    "border-transparent": !cardHiddenStatus.isCardDragging,
                  }
                )}
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
              >
                {listCard.map((cardProps, index) => (
                  <Draggable
                    key={cardProps.id}
                    index={index}
                    draggableId={cardProps.id}
                  >
                    {(provided) => (
                      <div
                        className={
                          cardProps.id !== snapshot.draggingFromThisWith &&
                          cardHiddenStatus.isCardDragging
                            ? "opacity-0"
                            : undefined
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoCard {...cardProps} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {providedDrop.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};
