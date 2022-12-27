import React from "react";
import { useParams } from "react-router-dom";

import { MAP_PATH_TO_PAGE_KEY } from "./mapper";
import { TodoTabs } from "./todo-lazy-tabs";

interface Props {
  isLoading: boolean;
}

export const TodoTabContents: React.FC<Props> = ({ isLoading }) => {
  const { tab } = useParams();
  const tabKey = MAP_PATH_TO_PAGE_KEY[tab];
  switch (tabKey) {
    case "todo.kanban":
      return <TodoTabs.TodoBoard isLoading={isLoading} />;
    case "todo.table":
      return <TodoTabs.TodoTable isLoading={isLoading} />;
    default:
      return <TodoTabs.TodoBoard isLoading={isLoading} />;
  }
};
