import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { TTodoColumn } from "../../type";
import { TodoCard } from "../TodoCard";

type TProps = {
  columnData: TTodoColumn;
};

export const TodoColumn: React.FC<TProps> = ({ columnData }) => {
  return (
    <div className="flex-1 h-full bg-gray-100 rounded-lg min-w-[200px]">
      <div className="sticky top-0 z-[2] bg-gray-50">
        <h1 className="px-3 py-4 font-medium bg-gray-100 rounded-t-lg">
          {columnData.title}
        </h1>
      </div>

      <div className="flex flex-col px-3 pb-3 h-[calc(100%-3.8rem)]">
        <Droppable droppableId={columnData.id}>
          {(providedDrop, snapshot) => (
            <div
              className={classNames("h-full", {
                "border-gray-500 transition-colors duration-150 rounded-md bg-gray-200 border-dashed border-2":
                  snapshot.isDraggingOver,
              })}
              ref={providedDrop.innerRef}
              {...providedDrop.droppableProps}
            >
              {columnData.cards.map((cardProps, index) => (
                <Draggable
                  key={cardProps.id}
                  index={index}
                  draggableId={cardProps.id}
                >
                  {(provided) => (
                    <div
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
          )}
        </Droppable>
      </div>
    </div>
  );
};
