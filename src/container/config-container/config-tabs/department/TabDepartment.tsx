import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  DeleteAndEditField,
  FormItem,
  Input,
  Modal,
  Table,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getDepartmentAsync } from "@/features/reducers";
import { useModal } from "@/hooks";

import { schema } from "./schema";
import { IFormDepartment } from "./types";

export const TabConfigDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const departmentState = useAppSelector((state) => state.department);

  useEffect(() => {
    dispatch(getDepartmentAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="5rem" textAlign="center">
            STT
          </Table.CellHead>
          <Table.CellHead>Ban</Table.CellHead>
          <Table.CellHead width="10rem" textAlign="right">
            Tổng thành viên
          </Table.CellHead>
          <Table.CellHead width="8rem" textAlign="right">
            Ngày tạo
          </Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>
        <Table.Body>
          {departmentState.departments.map((item, index) => (
            <Table.Row key={`${item.id}-${index}`}>
              <Table.Cell width="5rem" textAlign="center">
                {index + 1}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600" />
                  <p>{item.name}</p>
                </div>
              </Table.Cell>
              <Table.Cell width="10rem" textAlign="right">
                10
              </Table.Cell>
              <Table.Cell width="8rem" textAlign="right">
                10
              </Table.Cell>
              <Table.CellAction>
                <DeleteAndEditField
                  title={"Xóa phòng ban?"}
                  handleEvent={{
                    edit: function (): void {
                      throw new Error("Function not implemented.");
                    },
                    delete: function (): void {
                      throw new Error("Function not implemented.");
                    },
                  }}
                />
              </Table.CellAction>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Container>
    </div>
  );
};

export const ActionConfigDepartment: React.FC = () => {
  const propsForm = useForm<IFormDepartment>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,

    formState: { isSubmitting, errors },
  } = propsForm;

  const { toggle, isShowing } = useModal();
  const handleToggleModal = () => {
    toggle.setToggle();
  };

  const handleCreateDepartment = () => {
    //TODO: Handle create department.
  };

  return (
    <>
      <Button
        prefix={<i className="mr-2 fas fa-plus-circle" />}
        onClick={handleToggleModal}
      >
        Tạo mới
      </Button>
      <Modal
        handleEvent={{
          title: "Cập nhật",
          event: handleSubmit(handleCreateDepartment),
          isLoading: isSubmitting,
          isDisable: false,
        }}
        size="lg"
        title={"Tạo phòng ban"}
        isShowing={isShowing}
        toggle={toggle}
      >
        <FormItem label="Tên ban" isRequired error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
            defaultValue={""}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Tên ban"
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Tên viết tắt"
          isRequired
          error={errors.abbreviation_name?.message}
        >
          <Controller
            control={control}
            name="abbreviation_name"
            defaultValue={""}
            render={({ field: { value, onChange } }) => (
              <Input
                style="modal"
                value={value}
                onChange={onChange}
                placeholder="Tên viết tắt"
              />
            )}
          />
        </FormItem>
      </Modal>
    </>
  );
};
