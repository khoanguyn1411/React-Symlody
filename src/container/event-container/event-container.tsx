import React, { useState } from "react";

import {
  ButtonCreate,
  Container,
  DeleteAndEditField,
  NoData,
  Search,
  Select,
  Table,
} from "@/components";
import { useDebounce, useModal } from "@/hooks";

import {
  EVENT_NO_DATA_CONFIG,
  EVENT_STATUS_LIST_OPTIONS,
  TABLE_EVENT_DATA,
} from "./constant";
import { Status } from "./event-components";
import { ModalCreateEvent } from "./event-modals";

export const EventContainer: React.FC = () => {
  const propsModalCreateEvent = useModal({ isHotkeyOpen: true });
  const propsSearch = useDebounce();
  const [filterStatus, setFilterStatus] = useState<string>(
    EVENT_STATUS_LIST_OPTIONS[0].value
  );

  const isShowNoData = false;
  if (isShowNoData) {
    return (
      <>
        <NoData
          imageSrc={EVENT_NO_DATA_CONFIG.imageSrc}
          title={EVENT_NO_DATA_CONFIG.title}
          buttonTitle={EVENT_NO_DATA_CONFIG.buttonTitle}
          content={EVENT_NO_DATA_CONFIG.content}
          onCreateNew={propsModalCreateEvent.toggle.setShow}
        />
        <ModalCreateEvent {...propsModalCreateEvent} />
      </>
    );
  }
  return (
    <>
      <Container.Header>
        <Container.Title>QUẢN LÝ SỰ KIỆN</Container.Title>
        <Container.HeaderRight>
          <Search placeholder="Họp CLB, training,..." {...propsSearch} />
          <Select
            list={EVENT_STATUS_LIST_OPTIONS}
            value={filterStatus}
            className="w-40"
            onChange={setFilterStatus}
          />
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
              <Table.Row key={index} index={index}>
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
        <Container.Pagination />
      </Container.Body>
      <ModalCreateEvent {...propsModalCreateEvent} />
    </>
  );
};
