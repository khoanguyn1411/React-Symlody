import React from "react";

import {
  ButtonCreate,
  Container,
  DeleteAndEditField,
  Table,
} from "@/components";
import { useModal } from "@/hooks";

import { TABLE_EVENT_DATA } from "./constant";
import { Status } from "./event-components";
import { ModalCreateEvent } from "./event-modals";

export const EventContainer: React.FC = () => {
  const propsModalCreateEvent = useModal({ isHotkeyOpen: true });
  return (
    <>
      <Container.Header>
        <Container.Title>QUẢN LÝ SỰ KIỆN</Container.Title>
        <Container.HeaderRight>
          <ButtonCreate onClick={propsModalCreateEvent.toggle.setShow}>
            Tạo sự kiện
          </ButtonCreate>
        </Container.HeaderRight>
      </Container.Header>
      <Container.Body>
        <Table.Container>
          <Table.Head>
            <Table.CellHead>Sự kiện</Table.CellHead>
            <Table.CellHead>Thời gian</Table.CellHead>
            <Table.CellHead>Trạng thái</Table.CellHead>
            <Table.CellHeadAction />
          </Table.Head>
          <Table.Body>
            {TABLE_EVENT_DATA.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.eventName}</Table.Cell>
                <Table.Cell>{item.time}</Table.Cell>
                <Table.Cell>
                  <Status>{item.status}</Status>
                </Table.Cell>
                <Table.CellAction>
                  <DeleteAndEditField
                    title="Xóa tài sản?"
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
        <Container.Pagination
          onRowQuantityChange={(activeRows) => console.log(activeRows)}
          onPaginationChange={(activePage) => console.log(activePage)}
        />
      </Container.Body>
      <ModalCreateEvent {...propsModalCreateEvent} />
    </>
  );
};
