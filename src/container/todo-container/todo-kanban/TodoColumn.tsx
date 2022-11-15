import classNames from "classnames";
import { useLayoutEffect, useMemo, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { ITask } from "@/features/types";
import { FormatService, SortService } from "@/utils";

import { TODO_DATA } from "../constant";
import { TODO_STATUS_MAP_FROM_ID, TTodoColumn } from "../type";
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
  const [listCard, setListCard] = useState<ITask[]>(columnData.cards);

  useLayoutEffect(() => {
    const sortedCardList = SortService.mapOrder<ITask>(
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

  const _onCardClick = (cardInfo: ITask) => () => {
    onClickCard(cardInfo);
  };

  return (
    <div className="bg-gray-100 rounded-lg h-[calc(100%_-_10px)] min-w-[200px]">
      <div className="sticky top-0 z-[2] bg-gray-50">
        <h1 className="px-3 py-4 font-medium bg-gray-100 rounded-t-lg">
          {columnData.title}{" "}
          {columnData.cards.length > 0 &&
            `${columnData.cards.length} công việc`}
        </h1>
        <div
          hidden={isColumnDraggingFrom}
          className={classNames({
            "flex items-center justify-center absolute w-full top-20 px-4":
              !isColumnDraggingFrom,
          })}
        >
          <div className="flex flex-wrap items-start w-full p-2">
            <span
              className={classNames("font-medium px-2 mb-2 py-1 rounded-lg", {
                "bg-green-300 text-green-800": shouldHaveColor("green"),
                "bg-primary-100 text-primary-800": shouldHaveColor("blue"),
              })}
            >
              {TODO_STATUS_MAP_FROM_ID[draggingCard.columnId]}
            </span>
            <span className="mx-2 mt-1">
              <i className="fas fa-arrow-right" />
            </span>
            <span
              className={classNames("font-medium px-2 py-1 rounded-lg", {
                "bg-green-300 text-green-800": columnData.color === "green",
                "bg-primary-100 text-primary-800": columnData.color === "blue",
              })}
            >
              {columnData.title}
            </span>
          </div>
        </div>
      </div>

      <div
        className={classNames("flex flex-col px-3 pb-3 h-[calc(100%-3.8rem)]", {
          "overflow-y-hidden":
            draggingCard.columnId !== columnData.id &&
            draggingCard.isCardDragging,
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
                      "bg-gray-200 border-gray-500  border-dashed":
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
                      draggableId={FormatService.toString(cardProps.id)}
                    >
                      {(provided) => (
                        <div
                          className={
                            FormatService.toString(cardProps.id) !==
                              snapshot.draggingFromThisWith &&
                            draggingCard.isCardDragging &&
                            columnData.id !== draggingCard.columnId
                              ? "hidden"
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
                  <div hidden={columnData.id !== draggingCard.columnId}>
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
