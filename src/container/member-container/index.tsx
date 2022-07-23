import React from "react";

import { Button } from "@/components";
import { useModal } from "@/hooks";

import { ModalCreateMember } from "./member-modal";

export const MemberContainer: React.FC = () => {
  const { isShowing, setShow, setHidden } = useModal();

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
      <ModalCreateMember
        setShow={setShow}
        setHidden={setHidden}
        isShowing={isShowing}
      />
    </div>
  );
};
