import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { ConfigApi } from "@/api";
import {
  FormItem,
  Modal,
  SelectControl,
  SelectMultiple,
  SelectUser,
} from "@/components";
import { TToggleModal } from "@/components/elements/modal/types";
import { APP_ERROR_MESSAGE } from "@/constants";
import { IConfigInfo, IConfigManager } from "@/features/types";
import { FormService } from "@/utils";

import { MANAGE_OPTIONS, PERMISSION_OPTIONS } from "./constants";
import { IConfigManagerForm } from "./types";

type TProps = {
  isShowing: boolean;
  toggle: TToggleModal;
  data: IConfigInfo;
  configData: IConfigManager;
};

const schema: yup.SchemaOf<IConfigManagerForm> = yup.object().shape({
  userId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  groupIds: yup
    .array()
    .of(yup.number())
    .min(1, APP_ERROR_MESSAGE.REQUIRED)
    .required(APP_ERROR_MESSAGE.REQUIRED),
});

export const ModalEditPermission: React.FC<TProps> = ({
  isShowing,
  toggle,
  data,
}) => {
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

  useEffect(() => {
    if (data) {
      reset({
        userId: data.id,
        type: data.groups.map((g) => g.name).includes("lead")
          ? "LEAD"
          : "MANAGER",
        groupIds: data.groups.map((g) => g.id),
      });
    }
  }, [data, reset]);

  const handleUpdate = async (body: IConfigManagerForm) => {
    if (body.type === "LEAD") {
      //config LEAD
      const result = await ConfigApi.updateConfigRoleUser({
        user_id: body.userId,
        groups: [2],
      });
      if (result.kind !== "ok") {
        toast.error("Phân quyền thành viên không thành công");
        return;
      }
      toast.success("Phân quyền thành viên thành công");
    } else {
      //config MANAGER
      const result = await ConfigApi.updateConfigRoleUser({
        user_id: body.userId,
        groups: body.groupIds,
      });
      if (result.kind !== "ok") {
        toast.error("Phân quyền thành viên không thành công");
        return;
      }
      toast.success("Phân quyền thành viên thành công");
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
        <Controller
          control={control}
          name="userId"
          render={({ field: { value, onChange } }) => (
            <SelectUser
              placeholder="Thành viên"
              inChargerId={value}
              setInChargerId={onChange}
            />
          )}
        />
      </FormItem>
    </Modal>
  );
};
