"use client";

import { ReactNode } from "react";
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
  header?: string | ReactNode;
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
}: IModal) {
  return (
    <ModalRoot state={{
      isOpen: true,
      setOpen: (open) => { if (!open) onHide(); },
      open: () => {},
      close: onHide,
      toggle: onHide,
    }}>
      <ModalBackdrop>
        <ModalContainer size={size}>
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
