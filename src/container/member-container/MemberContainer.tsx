import React, { memo, useCallback, useEffect, useState } from "react";
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
  getPaginationMember,
  memberSelectors,
  setListQueryMember,
  updateMemberAsync,
} from "@/features/reducers";
import { IMember } from "@/features/types";
import { useDebounce, useEffectSkipFirstRender, useModal } from "@/hooks";

import {
  MEMBER_FILTER_OPTIONS,
  MEMBER_FILTER_VALUE,
  MEMBER_MESSAGE,
  MEMBER_NO_DATA_CONFIG,
} from "./constant";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { MemberPagination } from "./member-pagination";
import { TableMemberContent } from "./member-table-content";

const getFilterValue = (key: string) => {
  return MEMBER_FILTER_OPTIONS.find((item) => item.key === key).value;
};
const _MemberContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const memberStore = useAppSelector((state) => state.member);
  const memberList = useAppSelector(memberSelectors.selectAll);

  const propsModalCreateMember = useModal({ isHotkeyOpen: true });
  const propsModalEditMember = useModal<IMember>();
  const propsSearch = useDebounce(memberStore.listQueryMemberFE.search);

  const [filter, setFilter] = useState<string>(() => {
    switch (memberStore.listQueryMember.is_archived) {
      case true:
        return getFilterValue(MEMBER_FILTER_VALUE.isArchived);
      case false:
        return getFilterValue(MEMBER_FILTER_VALUE.active);
      case undefined:
        return getFilterValue(MEMBER_FILTER_VALUE.all);
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
    [dispatch, memberStore.listQueryMember]
  );
  const handleDelete = useCallback(
    async (item: IMember) => {
      const result = await dispatch(deleteMemberAsync(item.id));
      if (result.payload) {
        toast.success(MEMBER_MESSAGE.delete.success);
        return;
      }
      toast.success(MEMBER_MESSAGE.delete.error);
    },
    [dispatch]
  );
  const handleRestore = useCallback(
    async (item: IMember) => {
      const result = await dispatch(
        updateMemberAsync({
          payload: { ...item, is_archived: false },
          id: item.id,
          isRestore: true,
        })
      );
      if (!result.payload.result) {
        toast.error(MEMBER_MESSAGE.update.error);
        return;
      }
      toast.success(MEMBER_MESSAGE.update.success);
    },
    [dispatch]
  );
  const handleEdit = useCallback(
    (item: IMember) => {
      propsModalEditMember.setData(item);
      propsModalEditMember.toggle.setShow();
    },
    [propsModalEditMember]
  );

  useEffect(() => {
    dispatch(getMembersAsync(memberStore.listQueryMember));
  }, [dispatch, memberStore.listQueryMember]);

  // TO_UPDATE: When BE release pagination.
  // Using useEffect but not useEffectSkipFirstRender in order to get the currentList pagination from memberList.
  useEffectSkipFirstRender(() => {
    dispatch(
      getPaginationMember({
        memberList,
        search: propsSearch.debounceValue,
        page: 1,
      })
    );
  }, [propsSearch.debounceValue]);

  useEffect(() => {
    dispatch(
      getPaginationMember({
        memberList,
      })
    );
  }, [dispatch, memberList]);

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
          <TableMemberContent
            onEdit={handleEdit}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        </Table.Container>
        <MemberPagination />
      </Container.Body>
      <ModalCreateMember {...propsModalCreateMember} />
      <ModalEditMember {...propsModalEditMember} />
    </>
  );
};

export const MemberContainer = memo(_MemberContainer);
