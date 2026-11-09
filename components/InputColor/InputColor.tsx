"use client";

import { ReactElement, useId } from "react";

interface IInputColor {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function InputColor({
  label,
  color,
  onChange,
}: IInputColor): ReactElement {
  const id = useId();

  return (
    <div className="flex items-center w-full justify-between">
      <label htmlFor={id} className="text-zinc-600">
        {label}:
      </label>
      <input
        id={id}
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 cursor-pointer rounded border border-zinc-300 bg-white p-0.5"
      />
    </div>
  );
}
