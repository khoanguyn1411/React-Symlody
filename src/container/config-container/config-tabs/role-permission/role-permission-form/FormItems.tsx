import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { FormItem, Select, SelectUser, TItemListSelect } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  configSelectors,
  getUsersAsync,
  userSelectors,
} from "@/features/reducers";
import { User } from "@/features/types";
import { FormService } from "@/utils/funcs/form-service";

import {
  EPermissionOptions,
  MANAGE_OPTIONS,
  PERMISSION_LIST,
  PERMISSION_OPTIONS,
  ROLE_PERMISSION_TO_NOTE,
} from "../constants";
import { RolePermissionForm } from "../types";

type TProps = {
  formProps: UseFormReturn<RolePermissionForm>;
  mode: "edit" | "add";
};

export const FormItems: React.FC<TProps> = ({ formProps, mode }) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = formProps;
  const [type, setType] = useState<string>("");
  const userList = useAppSelector(userSelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);
  const managerList = useAppSelector(configSelectors.selectAll);
  const dispatch = useAppDispatch();

  const initializeAvailableUserSelectedList = () => {
    const managerListAsUser: User[] = managerList.map((manager) => ({
      ...manager,
      departmentId: currentUser.department.id,
    }));

    const managerListAsUserIds = managerListAsUser.map((manager) => manager.id);

    return userList.filter((user) => !managerListAsUserIds.includes(user.id));
  };

  const handleSetType = (item: TItemListSelect) => {
    setType(item.value);
  };
  const isManager = type === EPermissionOptions.Manager;

  useEffect(() => {
    setType(getValues().type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues().type]);

  useEffect(() => {
    dispatch(getUsersAsync({ target: null }));
    mode === "edit" && setValue("userId", getValues().userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mode === "add" && (
        <FormItem label="Thành viên" isRequired error={errors.userId?.message}>
          <Controller
            control={control}
            name="userId"
            render={({ field: { value, onChange } }) => (
              <SelectUser
                placeholder="Chọn thành viên"
                selectedUserId={value}
                initialUserList={initializeAvailableUserSelectedList()}
                setSelectedUserId={onChange}
              />
            )}
          />
        </FormItem>
      )}
      <FormItem label="Chức vụ" isRequired error={errors.type?.message}>
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              placeHolder="Chọn chức vụ"
              style="modal"
              value={value}
              onChange={onChange}
              onChangeSideEffect={handleSetType}
              list={PERMISSION_OPTIONS.filter((options) =>
                mode === "add"
                  ? options.value !== EPermissionOptions.Member
                  : true
              )}
            />
          )}
        />
      </FormItem>

      {isManager && (
        <FormItem
          label="Tính năng"
          isRequired
          error={FormService.assertErrorField(errors.roleManager)?.message}
        >
          <Controller
            control={control}
            name="roleManager"
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  isMultiple
                  isShowArrow
                  placeHolder="Chọn tính năng"
                  list={MANAGE_OPTIONS}
                  value={value}
                  style="modal"
                  onChange={onChange}
                />
              );
            }}
          />
        </FormItem>
      )}
      <ul>
        {PERMISSION_LIST.map((permission) => (
          <li className="ml-5 text-gray-500 list-disc" key={permission}>
            <span className="font-semibold">{permission}:</span>{" "}
            {ROLE_PERMISSION_TO_NOTE[permission]}.
          </li>
        ))}
      </ul>
    </>
  );
};
