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
  departmentSelectors,
  getDepartmentAsync,
  getUsersAsync,
  userSelectors,
} from "@/features/reducers";
import { setFilterParamsTask } from "@/features/reducers/task-reducer";
import { Department, Roles } from "@/features/types";
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
    case ETodoTabKey.Table:
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
  const taskStore = useAppSelector((state) => state.task);
  const userCount = useAppSelector(userSelectors.selectTotal);
  const currentUser = useAppSelector((state) => state.auth.user);
  const departmentList = useAppSelector(departmentSelectors.selectAll);
  const departmentCount = useAppSelector(departmentSelectors.selectTotal);

  const { tab } = useParams();
  const _tab = tab as ETodoTabKey;
  const propsModal = useModal({ isHotkeyOpen: true });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<ContentTab>(
    getContentTab(_tab, isLoading)
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
  const isInvalidUrl =
    !generateArrayFromEnum(ETodoTabKey).includes(_tab) && tab != null;
  const isShowSelect = currentUser.isRole([Roles.Lead]);

  const handleOpenCreateTodoModal = () => {
    propsModal.toggle.setShow();
  };

  const handleSetFilter = (item: TItemListSelect) => {
    const departmentID = getDepartmentId(item.value);
    dispatch(
      setFilterParamsTask({
        departmentId: departmentID,
        selectedMemberList: [],
      })
    );
  };

  useEffect(() => {
    setContent(getContentTab(_tab, isLoading));
  }, [isLoading, navigate, _tab]);

  useLayoutEffect(() => {
    setFilterDepartment(getInitialDepartmentText());
    const { departmentId } = taskStore.filterParamsTask;
    dispatch(
      setFilterParamsTask({
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
                title: ETodoTabReadableString.Kanban,
                to: getTabUrl(ETodoTabKey.Kanban),
              },
              {
                key: ETodoTabKey.Table,
                title: ETodoTabReadableString.Table,
                to: getTabUrl(ETodoTabKey.Table),
              },
            ]}
          />
          <TodoMemberView isLoading={isLoading} />
        </div>
        <Container.HeaderRight>
          {!isLoading && isShowSelect && (
            <Select
              className="w-36"
              placeHolder="Chọn phòng ban"
              list={departmentList.map((department) => ({
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
