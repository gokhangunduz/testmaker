"use client";

import { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  ModalRoot,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseTrigger,
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
  const { t } = useTranslation();

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
            <ModalCloseTrigger aria-label={t("close")} className="size-10" />
            {header && <ModalHeader className="pr-12">{header}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </ModalRoot>
  );
}
