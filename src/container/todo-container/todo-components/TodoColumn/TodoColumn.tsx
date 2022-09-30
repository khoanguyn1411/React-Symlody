import { useLayoutEffect, useState } from "react";
import { Container, Draggable, DropResult } from "react-smooth-dnd";

import { SortService } from "@/utils";

import { TTodoCard, TTodoColumn } from "../../type";
import { TodoCard } from "../TodoCard";
import styles from "./TodoColumn.module.css";

type TProps = {
  columnData: TTodoColumn;
  onCardDrop: (dropResult: DropResult, columnData: TTodoColumn) => void;
};

export const TodoColumn: React.FC<TProps> = ({ columnData, onCardDrop }) => {
  const [listCard, setListCard] = useState<TTodoCard[]>([]);
  const getChildPayload = (index: number) => {
    return listCard[index];
  };
  const handleCardDrop = (dropResult: DropResult) => {
    onCardDrop(dropResult, columnData);
  };
  useLayoutEffect(() => {
    const sortedCardList = SortService.mapOrder<TTodoCard>(
      columnData.cards,
      columnData.cardOrder,
      "id"
    );
    setListCard(sortedCardList);
  }, [columnData]);

  return (
    <div className="relative">
      <div className="sticky flex-1 h-full bg-gray-100 rounded-lg min-w-[200px]">
        <div className="sticky top-0 z-10 bg-gray-50">
          <h1 className="px-3 py-4 font-medium bg-gray-100 rounded-t-lg">
            {columnData.title}
          </h1>
        </div>

        <div className="flex flex-col px-3 pb-3">
          <Container
            style={{ minHeight: 130 }}
            groupName={"symlody-cols"}
            onDrop={handleCardDrop}
            dragBeginDelay={50}
            getChildPayload={getChildPayload}
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: styles["drop-preview"],
            }}
            animationDuration={200}
          >
            {listCard.map((cardProps) => (
              <Draggable key={cardProps.id}>
                <TodoCard {...cardProps} />
              </Draggable>
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
};
