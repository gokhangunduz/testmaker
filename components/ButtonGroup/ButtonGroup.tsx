import { ReactNode, ReactElement } from "react";
import { ButtonGroup as ButtonGroupNext } from "@heroui/react";

interface IButtonGroup {
  children: ReactNode;
  label?: string;
}

export default function ButtonGroup({
  children,
  label,
}: IButtonGroup): ReactElement {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && <span className="text-sm text-muted">{label}</span>}
      <ButtonGroupNext fullWidth>{children}</ButtonGroupNext>
    </div>
  );
}
