"use client";

import { ReactElement } from "react";
import { InputSwitch as InputSwitchPR } from "primereact/inputswitch";

interface IInputSwitch {
  label: string;
  checked: boolean;
  onChange: (e: { value: boolean }) => void;
}

export default function InputSwitch({
  label,
  checked,
  onChange,
}: IInputSwitch): ReactElement {
  return (
    <div className="flex items-center justify-between">
      <label className="text-zinc-600">{label}:</label>
      <InputSwitchPR checked={checked} onChange={(e) => onChange(e)} />
    </div>
  );
}
