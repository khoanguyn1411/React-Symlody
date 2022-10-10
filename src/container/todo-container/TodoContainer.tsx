import React, { ReactNode, useLayoutEffect, useState } from "react";

import {
  ButtonCreate,
  Container,
  NoData,
  Select,
  TabHost,
  TTab,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getDepartmentAsync } from "@/features/reducers";
import { useModal } from "@/hooks";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { TodoBoard } from "./todo-kanban";
import { TodoMemberView } from "./todo-member-view";
import { ModalCreateTodo } from "./todo-modals";
import { TodoTable } from "./todo-table";
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
        content: <TodoTable />,
      };
    default:
      return {
        content: <TodoBoard />,
      };
  }
};

export const TodoContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const departmentStore = useAppSelector((state) => state.department);
  const [filterDepartment, setFilterDepartment] = useState<string>(
    departmentStore.departments[0] ? departmentStore.departments[0].name : ""
  );

  useLayoutEffect(() => {
    if (departmentStore.departments && departmentStore.departments.length > 0) {
      return;
    }
    dispatch(getDepartmentAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (filterDepartment) {
      return;
    }
    setFilterDepartment(departmentStore.departments[0]?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentStore.departments]);

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
        <div className="flex items-center">
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
          <TodoMemberView />
        </div>
        <Container.HeaderRight>
          <Select
            className="w-52"
            placeHolder="Chọn phòng ban"
            list={departmentStore.departments.map((department) => ({
              value: department.name,
            }))}
            value={filterDepartment}
            onChange={setFilterDepartment}
          />
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
