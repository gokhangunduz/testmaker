"use client";

import { ReactElement } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Modal as NextModal,
} from "@nextui-org/react";

interface IModal {
  header?: string | ReactElement;
  children: ReactElement | ReactElement[];
  footer?: ReactElement | ReactElement[];
  size?: ModalProps["size"];
  onHide: () => void;
}

export default function Modal({
  header,
  children,
  footer,
  size,
  onHide,
}: IModal): ReactElement {
  return (
    <NextModal isOpen size={size} onClose={onHide}>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </NextModal>
  );
}
