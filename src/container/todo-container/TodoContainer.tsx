import React, { ReactNode, useState } from "react";

import {
  Button,
  ButtonCreate,
  Container,
  NoData,
  Search,
  Sort,
  TabHost,
  TTab,
} from "@/components";
import { useModal } from "@/hooks";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { TodoBoard } from "./todo-components";
import { ModalCreateTodo } from "./todo-modals";
import { ETodoTab, ETodoTabReadableString } from "./type";

type ContentTab = {
  content: ReactNode;
  rightSide?: ReactNode;
};

const getContentTab = (key: ETodoTab): ContentTab => {
  switch (key) {
    case ETodoTab.Kanban:
      return {
        content: <TodoBoard />,
      };
    case ETodoTab.Board:
      return {
        content: <div>Demo</div>,
      };
    default:
      return {
        content: <TodoBoard />,
      };
  }
};

export const TodoContainer: React.FC = () => {
  const [content, setContent] = useState<ContentTab>(
    getContentTab(ETodoTab.Kanban)
  );
  const handleChangeTab = (tab: TTab) => {
    setContent(getContentTab(tab.key as ETodoTab));
  };
  const propsModal = useModal({ isHotkeyOpen: true });

  const handleOpenCreateTodoModal = () => {
    propsModal.toggle.setShow();
  };

  const isNoData = false;
  if (isNoData)
    return (
      <>
        <NoData
          data={TODO_NO_DATA_CONFIG}
          onCreateNew={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </>
    );
  return (
    <>
      <Container.HeaderForTabHost>
        <TabHost
          isHeaderTabHost
          listTabs={[
            {
              key: ETodoTab.Kanban,
              title: ETodoTabReadableString.Kanban,
            },
            {
              key: ETodoTab.Board,
              title: ETodoTabReadableString.Board,
            },
          ]}
          onChangeTab={handleChangeTab}
        />
        <Container.HeaderRight>
          <Search
            inputValue={""}
            setInputValue={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Sort fields={[]} />
          <Button prefix={<i className="mr-2 fas fa-filter" />} style="none">
            Bộ lọc
          </Button>
          <ButtonCreate onClick={handleOpenCreateTodoModal}>
            Tạo công việc
          </ButtonCreate>
        </Container.HeaderRight>
      </Container.HeaderForTabHost>
      {content.content}
      <ModalCreateTodo {...propsModal} />
    </>
  );
};
