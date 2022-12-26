import React from "react";

import { ButtonCreate } from "@/components";
import { useModal } from "@/hooks";

import { ModalAddPermission } from "../role-permission-modals/ModalAddPermission";

export const ActionConfigRolePermission: React.FC = () => {
  const propsModals = useModal();
  const handleOpenModal = () => {
    propsModals.toggle.setShow();
  };
  return (
    <>
      <ButtonCreate onClick={handleOpenModal}>Phân quyền</ButtonCreate>
      <ModalAddPermission {...propsModals} />
    </>
  );
};
