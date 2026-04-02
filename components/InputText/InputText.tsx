"use client";

import { ChangeEvent, ReactElement } from "react";
import { TextField, Label, Input } from "@heroui/react";

interface IInputText {
  label: string;
  tooltip?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  formikProps?: any;
}

export default function InputText({
  label,
  value,
  onChange,
  formikProps,
}: IInputText): ReactElement {
  const currentValue = value ?? formikProps?.value ?? "";

  return (
    <TextField
      value={currentValue}
      onChange={(val) => {
        const e = { target: { value: val } } as ChangeEvent<HTMLInputElement>;
        onChange?.(e);
        formikProps?.onChange?.(e);
      }}
    >
      <Label>{label}</Label>
      <Input />
    </TextField>
  );
}
