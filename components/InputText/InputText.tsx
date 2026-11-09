"use client";

import { ReactElement } from "react";
import { TextField, Label, Input } from "@heroui/react";

interface IInputText {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function InputText({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: IInputText): ReactElement {
  return (
    <TextField value={value} onChange={onChange}>
      <Label>{label}</Label>
      <Input placeholder={placeholder} maxLength={maxLength} />
    </TextField>
  );
}
