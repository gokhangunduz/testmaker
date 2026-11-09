"use client";

import { ReactElement, ReactNode } from "react";
import { Button as NextButton, Spinner } from "@heroui/react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

interface IButton {
  label: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
  loading?: boolean;
  variant?: ButtonVariant;
  isIconOnly?: boolean;
}

export default function Button({
  label,
  ariaLabel,
  onClick,
  loading,
  variant = "primary",
  isIconOnly,
}: Readonly<IButton>): ReactElement {
  return (
    <NextButton
      aria-label={ariaLabel}
      onPress={onClick}
      variant={variant}
      isIconOnly={isIconOnly}
      isDisabled={loading}
    >
      {loading ? <Spinner size="sm" /> : label}
    </NextButton>
  );
}
