import { ReactElement } from "react";
import { ButtonGroup as ButtonGroupNext } from "@nextui-org/react";

interface IButtonGroup {
  children: ReactElement | ReactElement[];
  label?: string;
}

export default function ButtonGroup({
  children,
  label,
}: IButtonGroup): ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm">{label}</label>
      <ButtonGroupNext>{children}</ButtonGroupNext>
    </div>
  );
}
