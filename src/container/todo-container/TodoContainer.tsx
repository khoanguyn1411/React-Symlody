import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ButtonCreate,
  Container,
  NoData,
  NotificationImg,
  Select,
  TabHost,
  TItemListSelect,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getDepartmentAsync,
  getUsersAsync,
  userSelectors,
} from "@/features/reducers";
import { setListQueryTask } from "@/features/reducers/task-reducer";
import { useModal } from "@/hooks";
import { EPagePath } from "@/routes";

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

const getTabUrl = (url: string): string => {
  const BASE_URL = EPagePath.Todo;
  return `${BASE_URL}/${url}`;
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

  const { tab } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<ContentTab>(
    getContentTab(tab as ETodoTabKey)
  );

  const propsModal = useModal({ isHotkeyOpen: true });

  const handleOpenCreateTodoModal = () => {
    propsModal.toggle.setShow();
  };

  const [filterDepartment, setFilterDepartment] = useState<string>(
    departmentStore.departments[0] ? departmentStore.departments[0].name : ""
  );

  const handleSetFilter = (item: TItemListSelect) => {
    const departmentID = departmentStore.departments.find(
      (department) => department.name === item.value
    ).id;
    dispatch(setListQueryTask({ department_id: departmentID }));
  };
  const isNoData = false;
  const isInvalidUrl =
    !Object.values(ETodoTabKey).includes(tab as ETodoTabKey) && tab != null;

  useEffect(() => {
    setContent(getContentTab(tab as ETodoTabKey));
  }, [navigate, tab]);

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

  if (isInvalidUrl) {
    return (
      <NotificationImg
        title="Trang bạn đang truy cập không tồn tại"
        description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
      />
    );
  }

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
        <div className="flex items-center gap-4">
          <TabHost
            defaultActive={tab}
            tabChangeDependOnChangeOf={tab}
            isUrlInteraction
            isHeaderTabHost
            listTabs={[
              {
                key: ETodoTabKey.Kanban,
                title: ETodoTabReadableString.Kanban,
                to: getTabUrl(ETodoTabKey.Kanban),
              },
              {
                key: ETodoTabKey.Board,
                title: ETodoTabReadableString.Board,
                to: getTabUrl(ETodoTabKey.Board),
              },
            ]}
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
            onChangeSideEffect={handleSetFilter}
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
