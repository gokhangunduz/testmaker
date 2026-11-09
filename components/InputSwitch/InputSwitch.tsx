"use client";

import { ReactElement } from "react";
import { Label, Switch } from "@heroui/react";

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
    <Switch
      isSelected={checked}
      onChange={onChange}
      className="w-full justify-between"
    >
      <Switch.Content>
        <Label>{label}</Label>
      </Switch.Content>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  );
}
