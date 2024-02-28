import useApp from "@/hooks/useApp";
import { IQuestionScale } from "@/interfaces/pdf.question.interface";
import { Button } from "primereact/button";

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
    <div>
      <Button icon="pi pi-minus" className="p-button-secondary" />
      <span>{scale}</span>
      <Button icon="pi pi-plus" className="p-button-secondary ml-2" />
    </div>
  );
}
