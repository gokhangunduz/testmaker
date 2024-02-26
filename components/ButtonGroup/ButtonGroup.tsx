import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { ReactElement } from "react";

interface IButtonGroup {
  value?: {
    label: string;
    value: string | boolean | number;
  };
  onChange?: (e: SelectButtonChangeEvent) => void;
  options: {
    label: string;
    value: string | boolean | number;
  }[];
}

export default function ButtonGroup({
  value,
  onChange,
  options,
}: IButtonGroup): ReactElement {
  return (
    <SelectButton
      value={value?.value}
      onChange={onChange}
      optionLabel="label"
      optionValue="value"
      options={options}
    />
  );
}
