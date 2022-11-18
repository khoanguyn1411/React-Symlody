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
import { IDepartment } from "@/features/types";
import { useModal } from "@/hooks";
import { EPagePath } from "@/routes";
import { generateArrayFromEnum } from "@/utils/services/generate-service";

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

const getContentTab = (key: ETodoTabKey, isLoading: boolean): ContentTab => {
  switch (key) {
    case ETodoTabKey.Kanban:
      return {
        content: <TodoBoard isLoading={isLoading} />,
      };
    case ETodoTabKey.Board:
      return {
        content: <TodoTable isLoading={isLoading} />,
      };
    default:
      return {
        content: <TodoBoard isLoading={isLoading} />,
      };
  }
};

export const TodoContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const departmentStore = useAppSelector((state) => state.department);
  const taskStore = useAppSelector((state) => state.task);
  const userCount = useAppSelector(userSelectors.selectTotal);
  const currentUser = useAppSelector((state) => state.auth.user);

  const { tab } = useParams();
  const propsModal = useModal({ isHotkeyOpen: true });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<ContentTab>(
    getContentTab(tab as ETodoTabKey, isLoading)
  );

  const getDepartmentId = (
    departmentText: string
  ): IDepartment["id"] | null => {
    const department = departmentStore.departments.find(
      (department) => department.name === departmentText
    );
    return department ? department.id : null;
  };

  const [filterDepartment, setFilterDepartment] = useState<string>(() => {
    if (departmentStore.departments.length === 0) {
      return "";
    }
    if (taskStore.listQueryTask.department_id) {
      return departmentStore.departments.find(
        (department) => department.id === taskStore.listQueryTask.department_id
      ).name;
    }
    return currentUser.department.name;
  });

  const isNoData = false;
  const isInvalidUrl =
    !generateArrayFromEnum(ETodoTabKey).includes(tab as ETodoTabKey) &&
    tab != null;

  const handleOpenCreateTodoModal = () => {
    propsModal.toggle.setShow();
  };

  const handleSetFilter = (item: TItemListSelect) => {
    const departmentID = getDepartmentId(item.value);
    dispatch(setListQueryTask({ department_id: departmentID }));
  };

  useEffect(() => {
    setContent(getContentTab(tab as ETodoTabKey, isLoading));
  }, [isLoading, navigate, tab]);

  useLayoutEffect(() => {
    const hasUser = userCount > 0;
    const hasDepartment = departmentStore.departments.length > 0;
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
          <TodoMemberView isLoading={isLoading} />
        </div>
        <Container.HeaderRight>
          {!isLoading && (
            <Select
              className="w-36"
              placeHolder="Chọn phòng ban"
              list={departmentStore.departments.map((department) => ({
                value: department.name,
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
