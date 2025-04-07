"use client";

import { useModalStore } from "@/stores/modal";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalContainer } from "./ModalContainer";

export function Modal() {
  const { open, config } = useModalStore();

  if (!open || !config) return null;

  const { title, component } = config;

  return (
    <ModalContainer>
      <ModalHeader>{title}</ModalHeader>
      {component && <ModalContent>{component}</ModalContent>}
    </ModalContainer>
  );
}
