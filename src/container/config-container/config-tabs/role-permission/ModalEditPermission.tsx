import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import {
  Avatar,
  FormItem,
  Modal,
  SelectControl,
  SelectMultiple,
} from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { APP_ERROR_MESSAGE } from "@/constants";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";
import { FormService } from "@/utils";

import { MANAGE_OPTIONS, PERMISSION_OPTIONS } from "./constants";
import { IConfigManagerForm } from "./types";

type TProps = {
  isShowing: boolean;
  toggle: TToggleModal;
  data: IConfigInfo;
  onUpdateUserRole: (userId: number, groups: number[]) => Promise<boolean>;
};

const schema: yup.SchemaOf<IConfigManagerForm> = yup.object().shape({
  userId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  groupIds: yup.array().of(yup.number()),
  // .min(1, APP_ERROR_MESSAGE.REQUIRED)
  // .required(APP_ERROR_MESSAGE.REQUIRED),
});

export const ModalEditPermission: React.FC<TProps> = ({
  isShowing,
  toggle,
  data,
  onUpdateUserRole,
}) => {
  const userList = useAppSelector(userSelectors.selectAll);

  const propsForm = useForm<IConfigManagerForm>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, dirtyFields, errors },
    reset,
    getValues,
  } = propsForm;

  const user = userList.find((u) => u.id === getValues("userId"));

  useEffect(() => {
    if (data) {
      reset({
        userId: data.id,
        type: data.groups.map((g) => g.id).includes(2) ? "LEAD" : "MANAGER",
        groupIds:
          getValues("type") === "LEAD"
            ? data.groups.map((g) => g.id).filter((g) => g === 2)
            : data.groups.map((g) => g.id).filter((g) => g !== 2),
      });
    }
  }, [data, getValues, reset]);

  const handleUpdate = async (body: IConfigManagerForm) => {
    try {
      if (body.type === "LEAD") {
        //config LEAD
        await onUpdateUserRole(body.userId, [2]);
      } else {
        //config MANAGER
        await onUpdateUserRole(body.userId, body.groupIds);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      toggle.setHidden();
    }
  };

  return (
    <Modal
      handleEvent={{
        title: "Cập nhật",
        event: handleSubmit(handleUpdate),
        isLoading: isSubmitting,
        isDisable: !FormService.isDirtyFields(dirtyFields),
      }}
      title={"Phân quyền"}
      isShowing={isShowing}
      toggle={toggle}
      heightContainer={320}
    >
      <FormItem label="Chức vụ" isRequired>
        <Controller
          control={control}
          name="type"
          defaultValue={"MANAGER"}
          render={({ field: { value, onChange } }) => (
            <SelectControl
              name="type"
              placeholder={"Chức vụ"}
              selected={value}
              options={PERMISSION_OPTIONS}
              onValueChange={onChange}
            />
          )}
        />
      </FormItem>

      {getValues("type") === "MANAGER" && (
        <FormItem label="Tính năng" isRequired>
          <Controller
            control={control}
            name="groupIds"
            defaultValue={[]}
            render={({ field: { value, onChange } }) => (
              <SelectMultiple
                list={MANAGE_OPTIONS}
                value={value
                  .map(String)
                  .filter((v) => v !== Number(7).toString())}
                style="modal"
                onChange={onChange}
              />
            )}
          />
        </FormItem>
      )}

      <FormItem label="Thành viên" isRequired error={errors.userId?.message}>
        <div className="flex items-center h-10 px-3 bg-gray-100 space-x-2 rounded-md">
          <Avatar src={user?.avatar} fullName={user?.last_name} />
          <span>{`${user?.first_name} ${user?.last_name}`}</span>
        </div>
      </FormItem>
    </Modal>
  );
};
