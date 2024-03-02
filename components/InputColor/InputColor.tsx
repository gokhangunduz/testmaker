"use client";

import { ReactElement } from "react";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";

interface IInputColor {
  label: string;
  color: string;
  onChange: (e: ColorPickerChangeEvent) => void;
}

export default function InputColor({
  label,
  color,
  onChange,
}: IInputColor): ReactElement {
  return (
    <div className="flex items-center w-full justify-between">
      <label className="text-zinc-600">{label}:</label>
      <ColorPicker value={color} onChange={onChange} />
    </div>
  );
}
