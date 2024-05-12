import { ReactElement } from "react";

interface IInputContainer {
  label: string;
  children: ReactElement | ReactElement[];
}

export default function InputContainer({
  label,
  children,
}: IInputContainer): ReactElement {
  return (
    <div className="flex items-center w-full justify-between">
      <label className="text-zinc-600">{label}:</label>
      {children}
    </div>
  );
}
