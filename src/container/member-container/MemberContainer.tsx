import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  ButtonCreate,
  Container,
  NoData,
  Search,
  Select,
  Table,
} from "@/components";
import { Option } from "@/components/elements/select/type";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  deleteMemberAsync,
  getMembersAsync,
  memberSelectors,
  setMemberFilterParams,
  updateMemberAsync,
} from "@/features/reducers";
import { Member, Roles, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { useDebounce, useModal } from "@/hooks";

import {
  MEMBER_FILTER_OPTIONS,
  MEMBER_FILTER_VALUE,
  MEMBER_MESSAGE,
  MEMBER_NO_DATA_CONFIG,
} from "./constant";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { MemberPagination } from "./member-pagination";
import { useMemberPagination } from "./member-pagination/useMemberPagination";
import { MemberTableContent } from "./member-table-content";

const getFilterValue = (value: string) => {
  return MEMBER_FILTER_OPTIONS.find((item) => item.value === value).value;
};

export const MemberContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const currentUser = useAppSelector((state) => state.auth.user);
  const memberList = useAppSelector(memberSelectors.selectAll);

  const propsModalCreateMember = useModal({ isHotkeyOpen: true });
  const propsModalEditMember = useModal<Member>();
  const propsSearch = useDebounce(memberStore.filterParamsMember.search);
  const { filterBySearch } = useMemberPagination();

  const isMemberManager = currentUser.isRole([Roles.Lead, Roles.MemberManager]);

  const hasPermission = withPermission([RolesID.MemberManager, RolesID.Lead]);

  const [filter, setFilter] = useState<string>(() => {
    switch (memberStore.filterParamsMember.isArchived) {
      case true:
        return getFilterValue(MEMBER_FILTER_VALUE.isArchived);
      case false:
        return getFilterValue(MEMBER_FILTER_VALUE.active);
      case null:
        return getFilterValue(MEMBER_FILTER_VALUE.all);
    }
  });

  const handleSetFilter = (item: Option) => {
    switch (item.value) {
      case MEMBER_FILTER_VALUE.all:
        dispatch(setMemberFilterParams({ isArchived: null }));
        break;
      case MEMBER_FILTER_VALUE.isArchived:
        dispatch(setMemberFilterParams({ isArchived: true }));
        break;
      case MEMBER_FILTER_VALUE.active:
        dispatch(setMemberFilterParams({ isArchived: false }));
        break;
    }
  };
  const handleDelete = hasPermission(async (item: Member) => {
    const result = await dispatch(deleteMemberAsync(item.id));
    if (result.payload) {
      toast.success(MEMBER_MESSAGE.achieve.success);
      return;
    }
    toast.error(MEMBER_MESSAGE.achieve.error);
  });

  const handleRestore = hasPermission(async (item: Member) => {
    const result = await dispatch(
      updateMemberAsync({
        payload: {
          ...item,
          authAccount: {
            ...item.authAccount,
            email: undefined,
          },
          isArchived: false,
        },
        id: item.id,
        isRestore: true,
      })
    );
    if (updateMemberAsync.rejected.match(result)) {
      toast.error(MEMBER_MESSAGE.update.error);
      return;
    }
    toast.success(MEMBER_MESSAGE.update.success);
  });

  const handleEdit = (item: Member) => {
    propsModalEditMember.setData(item);
    propsModalEditMember.toggle.setShow();
  };

  useEffect(() => {
    dispatch(getMembersAsync(memberStore.filterParamsMember));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStore.filterParamsMember.isArchived]);

  useEffect(() => {
    filterBySearch(propsSearch.debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsSearch.debounceValue, memberList]);

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
            <Table.CellHead width="12rem">Ban</Table.CellHead>
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
