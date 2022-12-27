import { lazyImport } from "@/utils/funcs/lazy-import";

const { TodoBoard } = lazyImport(
  () => import("./todo-kanban/TodoBoard"),
  "TodoBoard"
);

const { TodoTable } = lazyImport(
  () => import("./todo-table/TodoTable"),
  "TodoTable"
);

export const TodoTabs = {
  TodoBoard,
  TodoTable,
};
