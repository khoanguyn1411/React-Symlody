import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, FormItem, Input, Modal } from "@/components";
import { useModal } from "@/hooks";

import { schema } from "./schema";
import { TFormMemberInfo } from "./type";

export const MemberContainer: React.FC = () => {
  const { isShowing, setShow, setHidden } = useModal();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormMemberInfo>({ resolver: yupResolver(schema) });

  const handleCreateMember = () => {
    console.log("Seomthing");
  };

  const list = [
    {
      no: 1,
      name: "Khoa",
      email: "1031@gmail.com",
      ban: "Su kien",
      date: "14/11/2001",
      position: "Leader",
    },
    {
      no: 1,
      name: "Khoa",
      ban: "Su kien",
      email: "1031@gmail.com",
      date: "14/11/2001",
      position: "Leader",
    },
    {
      no: 1,
      name: "Khoa",
      ban: "Su kien",
      email: "1031@gmail.com",
      date: "14/11/2001",
      position: "Leader",
    },
    {
      no: 1,
      name: "Khoa",
      ban: "Su kien",
      email: "1031@gmail.com",
      date: "14/11/2001",
      position: "Leader",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <h1>Quản lý thành viên</h1>
        <div className="flex items-center">
          <Button
            className="px-3 py-2 text-default bg-primary-800 hover:bg-primary-800"
            onClick={setShow}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="p-default">
        <div className="mt-3 bg-white border border-gray-200 rounded-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 font-semibold text-center w-14">STT</td>
                <td className="py-2 pr-6 font-semibold text-left">Họ và tên</td>
                <td className="py-2 font-semibold text-left">Ban</td>
                <td className="py-2 pr-6 font-semibold text-left">Ngày sinh</td>
                <td className="py-2 font-semibold text-left pr-default">
                  Vị trí
                </td>
              </tr>
              {list.map((item, index) => (
                <tr className="text-left border-t border-gray-200" key={index}>
                  <td className="py-2 font-normal text-center w-14">
                    {item.no}
                  </td>
                  <td className="w-auto py-2 pr-6 font-normal">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-full bg-primary-800"></div>
                      <div>
                        <h1 className="font-semibold">{item.name}</h1>
                        <h1 className="text-sm">{item.email}</h1>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 pr-6 font-normal w-1/10">{item.ban}</td>
                  <td className="py-2 pr-6 font-normal w-1/10">{item.date}</td>
                  <td className="py-2 font-normal w-1/10 pr-default">
                    {item.position}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-5">
        <Dropdown
          menus={[{ key: "THANG 1" }, { key: "Thang 2" }]}
          onClickMenu={(key: string) => {
            console.log(key);
          }}
          widthContainer="w-56"
        >
          <div>Chon ngay</div>
        </Dropdown>
      </div>

      <div>
        <Modal
          toggle={{ setShow, setHidden }}
          title="Tạo thành viên"
          size="lg"
          isOpen={isShowing}
          handleEvent={{
            title: "Thêm thành viên",
            event: handleSubmit(handleCreateMember),
          }}
        >
          <FormItem
            label="Họ và tên"
            isRequired
            error={errors.fullName?.message}
          >
            <Controller
              control={control}
              name="fullName"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Họ và tên"
                />
              )}
            />
          </FormItem>

          <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Giới tính"
                />
              )}
            />
          </FormItem>

          <FormItem
            label="Ngày sinh"
            isRequired
            error={errors.birthday?.message}
          >
            <Controller
              control={control}
              name="birthday"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Ngày sinh"
                />
              )}
            />
          </FormItem>

          <FormItem label="Ban" isRequired error={errors.department?.message}>
            <Controller
              control={control}
              name="department"
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} placeholder="Ban" />
              )}
            />
          </FormItem>

          <FormItem label="Vị trí" isRequired error={errors.role?.message}>
            <Controller
              control={control}
              name="role"
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} placeholder="Vị trí" />
              )}
            />
          </FormItem>

          <FormItem label="Lớp" isRequired error={errors.class?.message}>
            <Controller
              control={control}
              name="class"
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} placeholder="Lớp" />
              )}
            />
          </FormItem>

          <FormItem label="MSSV" isRequired error={errors.id?.message}>
            <Controller
              control={control}
              name="id"
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} placeholder="MSSV" />
              )}
            />
          </FormItem>

          <FormItem label="Email" isRequired error={errors.email?.message}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} placeholder="Email" />
              )}
            />
          </FormItem>

          <FormItem
            label="Số điện thoại"
            isRequired
            error={errors.phone?.message}
          >
            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Số điện thoại"
                />
              )}
            />
          </FormItem>

          <FormItem label="Địa chỉ" isRequired error={errors.address?.message}>
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Địa chỉ"
                />
              )}
            />
          </FormItem>

          <FormItem label="Quê quán" isRequired error={errors.home?.message}>
            <Controller
              control={control}
              name="home"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Quê quán"
                />
              )}
            />
          </FormItem>
        </Modal>
      </div>
    </div>
  );
};
