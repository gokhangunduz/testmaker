"use client";

import { ReactElement } from "react";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";
import InputContainer from "../InputContainer/InputContainer";

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
    <InputContainer label={label}>
      <ColorPicker value={color} onChange={onChange} />
    </InputContainer>
  );
}
