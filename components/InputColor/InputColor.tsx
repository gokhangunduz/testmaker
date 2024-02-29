import { ReactElement } from "react";
import { ColorPicker } from "primereact/colorpicker";

interface IInputColor {
  label: string;
  color: string;
  onChange: (e: any) => void;
}

export default function InputColor({
  label,
  color,
  onChange,
}: IInputColor): ReactElement {
  return (
    <div className="flex items-center w-full justify-between">
      <label>{label}:</label>
      <ColorPicker value={color} onChange={onChange} />
    </div>
  );
}
