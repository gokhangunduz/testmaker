import { ChangeEvent, ReactElement } from "react";
import { InputText as InputTextPR } from "primereact/inputtext";

interface IInputText {
  label: string;
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
  return (
    <span className="p-float-label">
      <InputTextPR
        className="h-10 w-full"
        id={label}
        value={value}
        onChange={onChange}
        {...formikProps}
      />
      <label htmlFor={label}>{label}</label>
    </span>
  );
}
