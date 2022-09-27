import { useEffect, useState } from "react";

import { SortService } from "@/utils";

import { TTodoCard, TTodoColumn } from "../type";
import { TodoCard } from "./TodoCard";

// const _Container =
//   Container as unknown as GlobalTypes.FCPropsWithChildren<ContainerOptions>;

type TProps = {
  columnData: TTodoColumn;
};

export const TodoColumn: React.FC<TProps> = ({ columnData }) => {
  const [listCard, setListCard] = useState<TTodoCard[]>([]);

  useEffect(() => {
    const sortedCardList = SortService.mapOrder<TTodoCard>(
      columnData.cards,
      columnData.cardOrder,
      "id"
    );
    setListCard(sortedCardList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 h-full bg-gray-100  rounded-lg min-w-[200px]">
      <div className="sticky top-0 z-10 bg-gray-50">
        <h1 className="px-3 py-4 font-medium bg-gray-100 rounded-t-lg">
          {columnData.title}
        </h1>
      </div>

      <div className="flex flex-col px-3 pb-3 space-y-3">
        {listCard.map((cardProps) => (
          <TodoCard key={cardProps.id} {...cardProps} />
        ))}
      </div>
    </div>
  );
};
