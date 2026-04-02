"use client";

import { ReactElement } from "react";
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
  label: string;
  onClick?: () => void;
  loading?: boolean;
  variant?: ButtonVariant;
  isIconOnly?: boolean;
}

export default function Button({
  label,
  onClick,
  loading,
  variant = "primary",
  isIconOnly,
}: Readonly<IButton>): ReactElement {
  return (
    <NextButton
      onClick={onClick}
      variant={variant}
      isIconOnly={isIconOnly}
      isDisabled={loading}
    >
      {loading ? <Spinner size="sm" /> : label}
    </NextButton>
  );
}
