import React, { Suspense, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
import { routePaths } from "@/routes";

import { TODO_NO_DATA_CONFIG } from "./constant";
import { MAP_PATH_TO_PAGE_KEY } from "./mapper";
import { TodoMemberView } from "./todo-member-view";
import { ModalCreateTodo } from "./todo-modals";
import { TodoTabContents } from "./TodoTabContents";

export const TodoContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskStore = useAppSelector((state) => state.task);
  const userCount = useAppSelector(userSelectors.selectTotal);
  const currentUser = useAppSelector((state) => state.auth.user);
  const departmentList = useAppSelector(departmentSelectors.selectAll);
  const departmentCount = useAppSelector(departmentSelectors.selectTotal);

  const { tab } = useParams();
  const propsModal = useModal({ isHotkeyOpen: true });

  const [isLoading, setIsLoading] = useState(true);

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
      <NoData
        data={TODO_NO_DATA_CONFIG}
        onCreateNew={() => propsModal.toggle.setShow()}
      />
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
                key: routePaths.todo.children.kanban.path,
                title: routePaths.todo.children.kanban.title,
                to: routePaths.todo.children.kanban.url,
              },
              {
                key: routePaths.todo.children.table.path,
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
      <Suspense fallback={<h1 className="p-default">Đang tải...</h1>}>
        <TodoTabContents isLoading={isLoading} />
      </Suspense>
      <ModalCreateTodo {...propsModal} />
    </>
  );
};
