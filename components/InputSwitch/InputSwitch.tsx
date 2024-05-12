"use client";

import { ReactElement } from "react";
import { Switch as NextSwitch } from "@nextui-org/switch";
import InputContainer from "../InputContainer/InputContainer";

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
    <InputContainer label={label}>
      <NextSwitch
        isSelected={checked}
        onChange={(e) => onChange({ value: e.target.checked })}
      />
    </InputContainer>
  );
}
