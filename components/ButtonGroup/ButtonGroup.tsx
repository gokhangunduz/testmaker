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
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm">{label}</span>}
      <ButtonGroupNext>{children}</ButtonGroupNext>
    </div>
  );
}
