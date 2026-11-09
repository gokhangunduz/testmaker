"use client";

import { ReactElement, ReactNode } from "react";
import {
  ModalRoot,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";

interface IModal {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "full" | "cover";
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
    <ModalRoot>
      <ModalBackdrop
        isOpen
        onOpenChange={(open) => {
          if (!open) onHide();
        }}
      >
        <ModalContainer size={size} scroll="inside">
          <ModalDialog>
            {header && <ModalHeader>{header}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </ModalRoot>
  );
}
