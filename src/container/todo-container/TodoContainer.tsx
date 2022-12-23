import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ButtonCreate,
  Container,
  NoData,
  NotificationImg,
  Select,
  TabHost,
} from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  departmentSelectors,
  getDepartmentAsync,
  getUsersAsync,
  userSelectors,
} from "@/features/reducers";
import { setTaskFilterParams } from "@/features/reducers/task-reducer";
import { Department, Roles } from "@/features/types";
import { useModal } from "@/hooks";
import { PageKey, routePaths } from "@/routes";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { TodoBoard } from "./todo-kanban";
import { TodoMemberView } from "./todo-member-view";
import { ModalCreateTodo } from "./todo-modals";
import { TodoTable } from "./todo-table";
import { ETodoTabKey } from "./type";

type ContentTab = {
  content: ReactNode;
  rightSide?: ReactNode;
};

const initializeTabContent = (key: PageKey, isLoading: boolean): ContentTab => {
  switch (key) {
    case "todo.kanban":
      return {
        content: <TodoBoard isLoading={isLoading} />,
      };
    case "todo.table":
      return {
        content: <TodoTable isLoading={isLoading} />,
      };
    default:
      return {
        content: <TodoBoard isLoading={isLoading} />,
      };
  }
};

const MAP_PATH_TO_PAGE_KEY: Record<string, PageKey> = {
  [routePaths.todo.children.kanban.path]: "todo.kanban",
  [routePaths.todo.children.table.path]: "todo.table",
};

export const TodoContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskStore = useAppSelector((state) => state.task);
  const userCount = useAppSelector(userSelectors.selectTotal);
  const currentUser = useAppSelector((state) => state.auth.user);
  const departmentList = useAppSelector(departmentSelectors.selectAll);
  const departmentCount = useAppSelector(departmentSelectors.selectTotal);

  const { tab } = useParams();
  const propsModal = useModal({ isHotkeyOpen: true });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<ContentTab>(
    initializeTabContent(MAP_PATH_TO_PAGE_KEY[tab], isLoading)
  );

  const getDepartmentId = (departmentText: string): Department["id"] | null => {
    const department = departmentList.find(
      (department) => department.name === departmentText
    );
    return department ? department.id : currentUser.department.id;
  };

  const getInitialDepartmentText = () => {
    if (taskStore.filterParamsTask.departmentId) {
      const department = departmentList.find(
        (department) =>
          department.id === taskStore.filterParamsTask.departmentId
      );
      if (department) {
        return department.name;
      }
    }
    return currentUser.department.name;
  };

  const [filterDepartment, setFilterDepartment] = useState<string>();

  const isNoData = false;
  const isInvalidUrl = MAP_PATH_TO_PAGE_KEY[tab] == null && tab != null;
  const isShowSelect = currentUser.isRole([Roles.Lead]);

  const handleOpenCreateTodoModal = () => {
    propsModal.toggle.setShow();
  };

  const handleSetFilter = (item: TOptionProps) => {
    const departmentID = getDepartmentId(item.value);
    dispatch(
      setTaskFilterParams({
        departmentId: departmentID,
        selectedMemberList: [],
      })
    );
  };

  useEffect(() => {
    setContent(initializeTabContent(MAP_PATH_TO_PAGE_KEY[tab], isLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, navigate, tab]);

  useLayoutEffect(() => {
    setFilterDepartment(getInitialDepartmentText());
    const { departmentId } = taskStore.filterParamsTask;
    dispatch(
      setTaskFilterParams({
        departmentId: departmentId ?? currentUser.department.id,
      })
    );

    const hasUser = userCount > 0;
    const hasDepartment = departmentCount > 0;
    const hasBoth = hasUser && hasDepartment;
    if (hasBoth) {
      setIsLoading(false);
      return;
    }
    if (hasUser && !hasDepartment) {
      dispatch(getDepartmentAsync()).finally(() => setIsLoading(false));
      return;
    }
    if (!hasUser && hasDepartment) {
      dispatch(getUsersAsync()).finally(() => setIsLoading(false));
      return;
    }
    Promise.all([
      dispatch(getDepartmentAsync()),
      dispatch(getUsersAsync()),
    ]).finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                title: routePaths.todo.children.kanban.title,
                to: routePaths.todo.children.kanban.url,
              },
              {
                key: ETodoTabKey.Table,
                title: routePaths.todo.children.table.title,
                to: routePaths.todo.children.table.url,
              },
            ]}
          />
          <TodoMemberView isLoading={isLoading} />
        </div>
        <Container.HeaderRight>
          {!isLoading && isShowSelect && (
            <Select
              classNameDisplay="w-36"
              placeHolder="Chọn phòng ban"
              list={departmentList.map((department) => ({
                value: department.name,
                label: department.name,
              }))}
              onChangeSideEffect={handleSetFilter}
              value={filterDepartment}
              onChange={setFilterDepartment}
            />
          )}
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
