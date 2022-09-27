import React from "react";

import { TODO_DATA } from "../constant";
import { TodoColumn } from "./TodoColumn";

export const TodoBoard: React.FC = () => {
  return (
    <div className="h-full pb-5 mt-5 overflow-auto px-default grid gap-5 grid-cols-4 h-[calc(100vh-8.8rem)]">
      {TODO_DATA.columns.map((column) => (
        <TodoColumn key={column.id} columnData={column} />
      ))}
    </div>
  );
};
