import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  ButtonCreate,
  Container,
  NoData,
  Search,
  Select,
  Table,
  TItemListSelect,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  deleteMemberAsync,
  getMembersAsync,
  memberSelectors,
  setListQueryMember,
} from "@/features/reducers";
import { IMember, ROLE_MAP_TO_DTO } from "@/features/types";
import { useModal, useSearch } from "@/hooks";

import {
  MEMBER_FILTER_OPTIONS,
  MEMBER_FILTER_VALUE,
  MEMBER_MESSAGE,
  MEMBER_NO_DATA_CONFIG,
} from "./constant";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { TableMemberContent } from "./member-table-content";

const getValue = (key: string) => {
  return MEMBER_FILTER_OPTIONS.find((item) => item.key === key).value;
};
export const MemberContainer: React.FC = () => {
  console.log(ROLE_MAP_TO_DTO);
  const propsModalCreateMember = useModal({ isHotkeyOpen: true });
  const propsModalEditMember = useModal<IMember>();
  const propsSearch = useSearch();

  const memberStore = useAppSelector((state) => state.member);
  const memberCount = useAppSelector(memberSelectors.selectTotal);

  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>(() => {
    switch (memberStore.listQueryMember.is_archived) {
      case true:
        return getValue(MEMBER_FILTER_VALUE.isArchived);
      case false:
        return getValue(MEMBER_FILTER_VALUE.active);
      case undefined:
        return getValue(MEMBER_FILTER_VALUE.all);
    }
  });

  const handleSetFilter = useCallback(
    (item: TItemListSelect) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { is_archived, ...rest } = memberStore.listQueryMember;
      switch (item.key) {
        case MEMBER_FILTER_VALUE.all:
          dispatch(setListQueryMember(rest));
          break;
        case MEMBER_FILTER_VALUE.isArchived:
          dispatch(setListQueryMember({ ...rest, is_archived: true }));
          break;
        case MEMBER_FILTER_VALUE.active:
          dispatch(setListQueryMember({ ...rest, is_archived: false }));
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  useEffect(() => {
    dispatch(getMembersAsync(memberStore.listQueryMember));
  }, [dispatch, memberStore.listQueryMember]);

  const handleEdit = (item: IMember) => {
    propsModalEditMember.setData(item);
    propsModalEditMember.toggle.setShow();
  };
  const handleDelete = async (item: IMember) => {
    const result = await dispatch(deleteMemberAsync(item.id));
    if (result.payload) {
      toast.success(MEMBER_MESSAGE.delete.success);
      return;
    }
    toast.success(MEMBER_MESSAGE.delete.error);
  };

  const showNoData = false;
  if (showNoData) {
    return (
      <>
        <NoData
          imageSrc={MEMBER_NO_DATA_CONFIG.imageSrc}
          buttonTitle={MEMBER_NO_DATA_CONFIG.buttonTitle}
          content={MEMBER_NO_DATA_CONFIG.content}
          title={MEMBER_NO_DATA_CONFIG.title}
          onCreateNew={propsModalCreateMember.toggle.setShow}
        />
        <ModalCreateMember {...propsModalCreateMember} />
      </>
    );
  }

  return (
    <>
      <Container.Header>
        <Container.Title>QUẢN LÝ THÀNH VIÊN</Container.Title>
        <Container.HeaderRight>
          <Search placeholder="Tìm kiếm ..." {...propsSearch} />

          <Select
            className="w-44"
            list={MEMBER_FILTER_OPTIONS}
            value={filter}
            onChangeSideEffect={handleSetFilter}
            onChange={setFilter}
          />
          <ButtonCreate onClick={propsModalCreateMember.toggle.setShow}>
            Tạo mới
          </ButtonCreate>
        </Container.HeaderRight>
      </Container.Header>
      <Container.Body>
        <Table.Container>
          <Table.Head>
            <Table.CellHead isFirst width="5rem" textAlign="center">
              STT
            </Table.CellHead>
            <Table.CellHead>Họ và tên</Table.CellHead>
            <Table.CellHead width="10rem">Ban</Table.CellHead>
            <Table.CellHead width="8rem">Ngày sinh</Table.CellHead>
            <Table.CellHead width="12rem">Vị trí</Table.CellHead>
            <Table.CellHeadAction />
          </Table.Head>
          <TableMemberContent onEdit={handleEdit} onDelete={handleDelete} />
        </Table.Container>

        {memberCount > 0 && (
          <Container.Pagination
            onRowQuantityChange={(activeRows) => console.log(activeRows)}
            onPaginationChange={(activePage) => console.log(activePage)}
          />
        )}
      </Container.Body>
      <ModalCreateMember {...propsModalCreateMember} />
      <ModalEditMember {...propsModalEditMember} />
    </>
  );
};
