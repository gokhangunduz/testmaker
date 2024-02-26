import useApp from "@/hooks/useApp";
import { IQuestionScale } from "@/interfaces/app.hook.interface";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

interface IQuestionScaleInput {
  index: number;
  scale: IQuestionScale;
}

export default function QuestionScaleInput({
  index,
  scale,
}: IQuestionScaleInput) {
  const { handleChangeScale } = useApp();

  return (
    <InputNumber
      value={scale}
      onValueChange={(e: InputNumberValueChangeEvent) =>
        handleChangeScale(index, e.value as IQuestionScale)
      }
      showButtons
      buttonLayout="horizontal"
      step={0.1}
      max={1}
      decrementButtonClassName="p-button-danger"
      incrementButtonClassName="p-button-success"
      incrementButtonIcon="pi pi-plus"
      decrementButtonIcon="pi pi-minus"
    />
  );
}
