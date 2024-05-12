"use client";

import { ChangeEvent, ReactElement } from "react";
import { Input as NextInput } from "@nextui-org/react";

interface IInputText {
  label: string;
  tooltip?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  formikProps?: any;
}

export default function InputText({
  label,
  tooltip,
  value,
  onChange,
  formikProps,
}: IInputText): ReactElement {
  return (
    <NextInput
      color="default"
      label={label}
      value={value}
      onChange={onChange}
      {...formikProps}
    />
  );
}
