"use client";

import { ReactElement } from "react";
import { Button as ButtonPR } from "primereact/button";

interface IButton {
  label: string;
  onClick?: () => void;
  severity?: "secondary" | "success" | "info" | "warning" | "help" | "danger";
  outlined?: boolean;
  icon?: string;
}

export default function Button({
  label,
  onClick,
  severity,
  outlined,
  icon,
}: Readonly<IButton>): ReactElement {
  return (
    <ButtonPR
      label={label}
      onClick={onClick}
      severity={severity}
      outlined={outlined}
      icon={icon}
    />
  );
}
