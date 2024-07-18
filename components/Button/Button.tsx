"use client";

import { ReactElement } from "react";
import { Button as NextButton, ButtonProps } from "@nextui-org/button";

interface IButton {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  color?: ButtonProps["color"];
  isIconOnly?: boolean;
}

export default function Button({
  label,
  onClick,
  loading,
  color = "primary",
  isIconOnly,
}: Readonly<IButton>): ReactElement {
  return (
    <NextButton
      onClick={onClick}
      color={color}
      isLoading={loading}
      isIconOnly={isIconOnly}
    >
      {label}
    </NextButton>
  );
}
