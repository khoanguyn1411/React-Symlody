import React, { useState } from "react";
import { flushSync } from "react-dom";
import { DropResult } from "react-smooth-dnd";

import { TODO_DATA } from "../constant";
import { applyDrag } from "../function";
import { TTodoColumn } from "../type";
import { TodoColumn } from "./TodoColumn";

export const TodoBoard: React.FC = () => {
  const [columnList, setColumnList] = useState<TTodoColumn[]>(
    TODO_DATA.columns
  );
  const handleCardDrop = (dropResult: DropResult, columnData: TTodoColumn) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const sortedCardList = applyDrag(columnData.cards, dropResult);
      const editedColumn: TTodoColumn = {
        ...columnData,
        cards: sortedCardList,
        cardOrder: sortedCardList.map((item) => item.id),
      };
      flushSync(() => {
        setColumnList((prev) =>
          prev.map((item) => {
            if (item.id === editedColumn.id) {
              console.log(editedColumn);
              return editedColumn;
            }
            return item;
          })
        );
      });
    }
  };
  return (
    <div className="h-full pb-5 mt-5 overflow-auto px-default grid gap-5 grid-cols-4-1fr h-[calc(100vh-8.8rem)]">
      {columnList.map((column) => (
        <TodoColumn
          onCardDrop={handleCardDrop}
          key={column.id}
          columnData={column}
        />
      ))}
    </div>
  );
};
