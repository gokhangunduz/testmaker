"use client";

import { ReactElement, ReactNode } from "react";
import { Button as NextButton, Spinner, Tooltip } from "@heroui/react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

interface IButton {
  label?: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
  tooltip?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  pressed?: boolean;
  autoFocus?: boolean;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  isIconOnly?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  label,
  icon,
  ariaLabel,
  tooltip,
  onClick,
  loading,
  disabled,
  pressed,
  autoFocus,
  variant = "primary",
  size,
  isIconOnly,
  fullWidth,
  className,
}: Readonly<IButton>): ReactElement {
  const button = (
    <NextButton
      aria-label={ariaLabel ?? tooltip}
      aria-pressed={pressed}
      autoFocus={autoFocus}
      onPress={onClick}
      variant={variant}
      size={size}
      isIconOnly={isIconOnly}
      isDisabled={loading || disabled}
      fullWidth={fullWidth}
      className={className}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </NextButton>
  );

  if (!tooltip) return button;

  return (
    <Tooltip delay={400}>
      <Tooltip.Trigger tabIndex={-1} role="presentation">
        {button}
      </Tooltip.Trigger>
      <Tooltip.Content>{tooltip}</Tooltip.Content>
    </Tooltip>
  );
}
