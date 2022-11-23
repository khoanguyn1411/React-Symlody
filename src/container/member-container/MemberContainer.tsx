import React, { useEffect, useState } from "react";
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
import { ERoles, ERolesID, IMember } from "@/features/types";
import { withPermission } from "@/hoc";
import { useDebounce, useEffectSkipFirstRender, useModal } from "@/hooks";

import {
  MEMBER_FILTER_OPTIONS,
  MEMBER_FILTER_VALUE,
  MEMBER_MESSAGE,
  MEMBER_NO_DATA_CONFIG,
} from "./constant";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { MemberPagination } from "./member-pagination";
import { MemberTableContent } from "./member-table-content";

const getFilterValue = (key: string) => {
  return MEMBER_FILTER_OPTIONS.find((item) => item.key === key).value;
};
export const MemberContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const memberList = useAppSelector(memberSelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);

  const propsModalCreateMember = useModal({ isHotkeyOpen: true });
  const propsModalEditMember = useModal<IMember>();
  const propsSearch = useDebounce(memberStore.listQueryMemberFE.search);

  const isMemberManager = currentUser.isRole([
    ERoles.Lead,
    ERoles.MemberManager,
  ]);

  const hasPermission = withPermission([ERolesID.MemberManager, ERolesID.Lead]);

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

  const handleSetFilter = (item: TItemListSelect) => {
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
  };
  const handleDelete = hasPermission(async (item: IMember) => {
    const result = await dispatch(deleteMemberAsync(item.id));
    if (result.payload) {
      toast.success(MEMBER_MESSAGE.achieve.success);
      return;
    }
    toast.error(MEMBER_MESSAGE.achieve.error);
  });

  const handleRestore = hasPermission(async (item: IMember) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...authAccountWithoutEmail } = item.auth_account;
    const result = await dispatch(
      updateMemberAsync({
        payload: {
          ...item,
          avatar: undefined,
          auth_account: authAccountWithoutEmail,
          is_archived: false,
        },
        id: item.id,
        isRestore: true,
      })
    );
    if (result.meta.requestStatus === "rejected") {
      toast.error(MEMBER_MESSAGE.update.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.update.success);
  });

  const handleEdit = (item: IMember) => {
    propsModalEditMember.setData(item);
    propsModalEditMember.toggle.setShow();
  };

  useEffect(() => {
    dispatch(getMembersAsync(memberStore.listQueryMember));
  }, [dispatch, memberStore.listQueryMember]);

  // TO_UPDATE: When BE release pagination...
  useEffectSkipFirstRender(() => {
    dispatch(
      getPaginationMember({
        memberList,
        page: 1,
        search: propsSearch.debounceValue,
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
          data={MEMBER_NO_DATA_CONFIG}
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
            className="w-48"
            list={MEMBER_FILTER_OPTIONS}
            value={filter}
            onChangeSideEffect={handleSetFilter}
            onChange={setFilter}
          />

          {isMemberManager && (
            <ButtonCreate onClick={propsModalCreateMember.toggle.setShow}>
              Tạo mới
            </ButtonCreate>
          )}
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
          <MemberTableContent
            onEdit={handleEdit}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        </Table.Container>
        <MemberPagination />
      </Container.Body>
      {isMemberManager && <ModalCreateMember {...propsModalCreateMember} />}
      <ModalEditMember {...propsModalEditMember} />
    </>
  );
};
