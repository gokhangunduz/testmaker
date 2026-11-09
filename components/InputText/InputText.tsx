"use client";

import { ReactElement } from "react";
import { TextField, Label, Input } from "@heroui/react";

interface IInputText {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function InputText({
  label,
  value,
  onChange,
}: IInputText): ReactElement {
  return (
    <TextField value={value} onChange={onChange}>
      <Label>{label}</Label>
      <Input />
    </TextField>
  );
}
