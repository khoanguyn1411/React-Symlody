import React, { memo } from "react";

import {
  Button,
  ButtonCreate,
  Container,
  NoData,
  Search,
  Sort,
} from "@/components";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { TodoBoard } from "./todo-components";

const _TodoContainer: React.FC = () => {
  const isNoData = false;
  if (isNoData)
    return (
      <>
        <NoData
          imageSrc={TODO_NO_DATA_CONFIG.imageSrc}
          title={TODO_NO_DATA_CONFIG.title}
          buttonTitle={TODO_NO_DATA_CONFIG.buttonTitle}
          content={TODO_NO_DATA_CONFIG.content}
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
            setInputValue={function (inputValue: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Sort fields={[]} />
          <Button prefix={<i className="mr-2 fas fa-filter" />} style="none">
            Bộ lọc
          </Button>
          <ButtonCreate>Tạo công việc</ButtonCreate>
        </Container.HeaderRight>
      </Container.Header>
      <TodoBoard />
    </>
  );
};

export const TodoContainer = memo(_TodoContainer);
