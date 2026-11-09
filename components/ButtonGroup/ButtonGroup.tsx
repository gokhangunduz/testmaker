import { ReactNode, ReactElement } from "react";
import { ButtonGroup as ButtonGroupNext } from "@heroui/react";

interface IButtonGroup {
  children: ReactNode;
  label?: string;
  ariaLabel?: string;
}

export default function ButtonGroup({
  children,
  label,
  ariaLabel,
}: IButtonGroup): ReactElement {
  return (
    <div
      role="group"
      aria-label={ariaLabel ?? label}
      className="flex w-full flex-col gap-1.5"
    >
      {label && <span className="text-sm text-muted">{label}</span>}
      <ButtonGroupNext fullWidth role="presentation">{children}</ButtonGroupNext>
    </div>
  );
}
