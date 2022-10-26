import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";

import {
  ButtonCreate,
  Container,
  NoData,
  Select,
  TabHost,
  TTab,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getDepartmentAsync,
  getUsersAsync,
  setActiveTab,
  userSelectors,
} from "@/features/reducers";
import { useModal } from "@/hooks";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { TodoBoard } from "./todo-kanban";
import { TodoMemberView } from "./todo-member-view";
import { ModalCreateTodo } from "./todo-modals";
import { TodoTable } from "./todo-table";
import { ETodoTabKey, ETodoTabReadableString } from "./type";

type ContentTab = {
  content: ReactNode;
  rightSide?: ReactNode;
};

const getContentTab = (key: ETodoTabKey): ContentTab => {
  switch (key) {
    case ETodoTabKey.Kanban:
      return {
        content: <TodoBoard />,
      };
    case ETodoTabKey.Board:
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
  const userList = useAppSelector(userSelectors.selectAll);
  const commonStore = useAppSelector((state) => state.common);

  const [filterDepartment, setFilterDepartment] = useState<string>(
    departmentStore.departments[0] ? departmentStore.departments[0].name : ""
  );

  useEffect(() => {
    if (userList.length > 0) {
      return;
    }
    dispatch(getUsersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    getContentTab(commonStore.activeTab.todo)
  );
  const handleChangeTab = (tab: TTab) => {
    setContent(getContentTab(tab.key as ETodoTabKey));
    dispatch(setActiveTab({ todo: tab.key as ETodoTabKey }));
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
            defaultActive={commonStore.activeTab.todo}
            isHeaderTabHost
            listTabs={[
              {
                key: ETodoTabKey.Kanban,
                title: ETodoTabReadableString.Kanban,
              },
              {
                key: ETodoTabKey.Board,
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
