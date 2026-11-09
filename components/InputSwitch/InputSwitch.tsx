"use client";

import { ReactElement } from "react";
import { Switch } from "@heroui/react";

interface IInputSwitch {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function InputSwitch({
  label,
  checked,
  onChange,
}: IInputSwitch): ReactElement {
  return (
    <div className="flex items-center w-full justify-between">
      <span className="text-zinc-600">{label}:</span>
      <Switch aria-label={label} isSelected={checked} onChange={onChange} />
    </div>
  );
}
