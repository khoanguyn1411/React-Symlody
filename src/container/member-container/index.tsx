import { Switch } from "@material-tailwind/react";
import React, { useState } from "react";

import { Button, Dropdown, Select } from "@/components";

export const MemberContainer: React.FC = () => {
  const handleCreateMember = () => {
    /// Create member here
  };

  const [selectedValue, setSelectedValue] = useState<string>(null);

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <h1>Quản lý thành viên</h1>
        <div className="flex items-center">
          <div className="mr-5">
            <Switch></Switch>
          </div>
          <h1 className="mr-4">Đã lưu trữ</h1>
          <Button
            className="px-3 py-2 text-default bg-primary-800"
            onClick={handleCreateMember}
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
                <td className="w-2/5 py-2 font-semibold text-left pl-18">
                  Họ và tên
                </td>
                <td className="w-1/5 py-2 font-semibold text-left">Ban</td>
                <td className="w-1/5 py-2 font-semibold text-left">
                  Ngày sinh
                </td>
                <td className="w-1/5 py-2 font-semibold text-left">Vị trí</td>
              </tr>

              <tr className="text-left border-t border-gray-200">
                <td className="w-2/5 py-2 font-normal px-default">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 rounded-full bg-primary-800"></div>
                    <div>
                      <h1 className="font-semibold">Anh Khoa</h1>
                      <h1 className="text-sm">anhkhoa@gmail.com</h1>
                    </div>
                  </div>
                </td>
                <td className="w-1/5 py-2 font-normal">Sự kiện</td>
                <td className="w-1/5 py-2 font-normal">11/01/1999</td>
                <td className="w-1/5 py-2 font-normal">Leader</td>
              </tr>

              <tr className="text-left border-t border-gray-200">
                <td className="w-2/5 py-2 font-normal px-default">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 rounded-full bg-primary-800"></div>
                    <div>
                      <h1 className="font-semibold">Anh Khoa</h1>
                      <h1 className="text-sm">anhkhoa@gmail.com</h1>
                    </div>
                  </div>
                </td>
                <td className="w-1/5 py-2 font-normal">Sự kiện</td>
                <td className="w-1/5 py-2 font-normal">11/01/1999</td>
                <td className="w-1/5 py-2 font-normal">Leader</td>
              </tr>

              <tr className="text-left border-t border-gray-200">
                <td className="w-2/5 py-2 font-normal px-default">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 rounded-full bg-primary-800"></div>
                    <div>
                      <h1 className="font-semibold">Anh Khoa</h1>
                      <h1 className="text-sm">anhkhoa@gmail.com</h1>
                    </div>
                  </div>
                </td>
                <td className="w-1/5 py-2 font-normal">Sự kiện</td>
                <td className="w-1/5 py-2 font-normal">11/01/1999</td>
                <td className="w-1/5 py-2 font-normal">Leader</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-5">
        <Dropdown
          data={["asfasf", "SDfdsjfhsu", "sdfsdf"]}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
          placeHolder="Chọn ngày"
          widthClass="w-60"
        ></Dropdown>

        {/* <Select label="Test" data={["asfasf", "SDfdsjfhsu", "sdfsdf"]} /> */}
      </div>
    </div>
  );
};
