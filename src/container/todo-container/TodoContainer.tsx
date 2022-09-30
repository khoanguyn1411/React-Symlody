import React from "react";

import {
  Button,
  ButtonCreate,
  Container,
  NoData,
  Search,
  Sort,
} from "@/components";
import { useModal } from "@/hooks";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { TodoBoard } from "./todo-components";
import { ModalCreateTodo } from "./todo-modals";

export const TodoContainer: React.FC = () => {
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
      <Container.Header>
        <Container.Title>QUẢN LÝ CÔNG VIỆC</Container.Title>
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
      </Container.Header>
      <TodoBoard />
      <ModalCreateTodo {...propsModal} />
    </>
  );
};
