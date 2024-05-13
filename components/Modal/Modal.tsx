"use client";

import { ReactElement } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as NextModal,
} from "@nextui-org/react";

interface IModal {
  header?: string | ReactElement;
  children: ReactElement | ReactElement[];
  footer?: ReactElement | ReactElement[];

  onHide: () => void;
}

export default function Modal({
  header,
  children,
  footer,
  onHide,
}: IModal): ReactElement {
  return (
    <NextModal isOpen onClose={onHide}>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </NextModal>
  );
}
